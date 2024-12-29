import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User, AuthContextType } from "@/types/auth";
import { fetchUserProfile, signInWithPassword, signUp, signOut, mapProfileToUser } from "@/services/authService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Initial session check
    const initializeAuth = async () => {
      try {
        console.log("Initializing auth...");
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session initialization error:", error);
          await handleSignOut();
          return;
        }

        if (session?.user) {
          await handleUserSession(session.user);
        } else {
          console.log("No active session found");
          setUser(null);
        }
      } catch (err) {
        console.error("Auth initialization failed:", err);
        await handleSignOut();
      } finally {
        setLoading(false);
      }
    };

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.id);
      
      if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
        console.log("User signed out or deleted");
        setUser(null);
        return;
      }

      if (session?.user) {
        await handleUserSession(session.user);
      }
    });

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleUserSession = async (authUser: any) => {
    try {
      console.log("Fetching profile for user:", authUser.id);
      const profile = await fetchUserProfile(authUser.id);
      
      if (!profile) {
        console.error("No profile found for user");
        await handleSignOut();
        return;
      }

      const mappedUser = mapProfileToUser(profile, authUser.email || '');
      console.log("Setting user state:", mappedUser);
      setUser(mappedUser);
    } catch (err) {
      console.error("Error handling user session:", err);
      await handleSignOut();
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      localStorage.removeItem('supabase.auth.token');
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  const login = async (email: string, password: string, role: 'user' | 'salon_owner') => {
    try {
      console.log("Attempting login for:", email, "with role:", role);
      const { data, error } = await signInWithPassword(email, password);
      
      if (error) {
        console.error("Login error:", error);
        throw new Error(error.message);
      }

      if (data.user) {
        const profile = await fetchUserProfile(data.user.id);
        console.log("Retrieved profile:", profile);
        
        if (!profile) {
          throw new Error("Profile not found. Please try signing up first.");
        }

        if (profile.role !== role) {
          await handleSignOut();
          throw new Error(`This account is not registered as a ${role.replace('_', ' ')}. Please login with the correct account type.`);
        }

        setUser(mapProfileToUser(profile, data.user.email || ''));
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string, role: 'user' | 'salon_owner') => {
    try {
      console.log("Attempting signup for:", email, "with role:", role);
      
      const { data, error } = await signUp(email, password, { name, role });
      if (error) throw error;

      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert([
            {
              id: data.user.id,
              full_name: name,
              email: email,
              role: role
            }
          ]);

        if (profileError) throw profileError;

        toast({
          title: "Sign Up Successful",
          description: "Please check your email to confirm your account before logging in.",
          duration: 6000,
        });
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: "Sign Up Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout: handleSignOut }}>
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