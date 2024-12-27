import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User, AuthContextType } from "@/types/auth";
import { fetchUserProfile, signInWithPassword, signUp, signOut, mapProfileToUser } from "@/services/authService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error checking session:", error);
        return;
      }
      
      if (session?.user) {
        try {
          const profile = await fetchUserProfile(session.user.id);
          setUser(mapProfileToUser(profile, session.user.email || ''));
        } catch (err) {
          console.error("Error fetching user profile:", err);
        }
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event);
      
      if (session?.user) {
        try {
          const profile = await fetchUserProfile(session.user.id);
          setUser(mapProfileToUser(profile, session.user.email || ''));
        } catch (err) {
          console.error("Error fetching user profile:", err);
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string, role: 'user' | 'salon_owner') => {
    try {
      console.log("Attempting login for:", email);
      const { data, error } = await signInWithPassword(email, password);
      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          throw new Error("Invalid email or password. Please try again.");
        }
        throw error;
      }

      if (data.user) {
        const profile = await fetchUserProfile(data.user.id);

        if (profile.role !== role) {
          await signOut();
          throw new Error(`Invalid role. Please login as a ${role}.`);
        }

        setUser(mapProfileToUser(profile, data.user.email || ''));
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
      }
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.message.includes("Email not confirmed")) {
        toast({
          title: "Email Not Confirmed",
          description: "Please check your email inbox and confirm your email address before logging in.",
          variant: "destructive",
        });
      } else if (error.message.includes("User already registered")) {
        toast({
          title: "Account Exists",
          description: "This email is already registered. Please login instead.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
      }
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string, role: 'user' | 'salon_owner') => {
    try {
      console.log("Attempting signup for:", email, "with role:", role);
      
      // First check if user exists
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();

      if (existingUser) {
        toast({
          title: "Account Exists",
          description: "This email is already registered. Please login instead.",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await signUp(email, password, { name, role });
      if (error) throw error;

      if (data.user) {
        toast({
          title: "Sign Up Successful",
          description: "Please check your email inbox (including spam folder) for a confirmation link. You must confirm your email before logging in.",
          duration: 6000,
        });

        // Show a second toast with additional instructions
        setTimeout(() => {
          toast({
            title: "Next Steps",
            description: "1. Open your email\n2. Click the confirmation link\n3. Return here to log in",
            duration: 8000,
          });
        }, 1000);
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      if (error.message.includes("User already registered")) {
        toast({
          title: "Account Exists",
          description: "This email is already registered. Please login instead.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Sign Up Failed",
          description: error.message,
          variant: "destructive",
        });
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await signOut();
      if (error) throw error;
      
      setUser(null);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    } catch (error: any) {
      console.error("Logout error:", error);
      toast({
        title: "Logout Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};