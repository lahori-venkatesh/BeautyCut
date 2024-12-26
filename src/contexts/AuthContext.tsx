import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, AuthContextType } from "@/types/auth";
import { createOrUpdateProfile } from "@/services/profileService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [lastSignupAttempt, setLastSignupAttempt] = useState<number>(0);
  const { toast } = useToast();

  useEffect(() => {
    const initSession = async () => {
      console.log("Initializing session...");
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        console.log("Session found:", session.user);
        setUser({
          id: session.user.id,
          name: session.user.user_metadata.name || '',
          email: session.user.email || '',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.email}`,
          role: session.user.user_metadata.role || 'user'
        });
      }
    };

    initSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log("Auth state changed:", _event, session?.user);
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata.name || '',
          email: session.user.email || '',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.email}`,
          role: session.user.user_metadata.role || 'user'
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string, role: 'user' | 'salon_owner') => {
    try {
      console.log("Attempting login for:", email, "with role:", role);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error);
        throw error;
      }

      if (data.user) {
        console.log("Login successful:", data.user);
        const userData = {
          id: data.user.id,
          name: data.user.user_metadata.name || '',
          email: data.user.email || '',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          role: role
        };

        // Update user metadata with role if it's different
        if (data.user.user_metadata.role !== role) {
          const { error: updateError } = await supabase.auth.updateUser({
            data: { role: role }
          });

          if (updateError) {
            console.error("Error updating user role:", updateError);
          }
        }

        setUser(userData);
        toast({
          title: "Login successful",
          description: `Welcome back, ${role === 'salon_owner' ? 'Salon Owner' : 'User'}!`,
        });
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string, role: 'user' | 'salon_owner') => {
    try {
      console.log("Attempting signup for:", email, "with role:", role);
      const now = Date.now();
      const timeSinceLastAttempt = now - lastSignupAttempt;
      if (timeSinceLastAttempt < 40000) {
        const remainingTime = Math.ceil((40000 - timeSinceLastAttempt) / 1000);
        toast({
          title: "Please wait",
          description: `You can try again in ${remainingTime} seconds`,
          variant: "destructive",
        });
        return;
      }

      setLastSignupAttempt(now);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
            role: role,
          },
        },
      });

      if (error) {
        console.error("Signup error:", error);
        throw error;
      }

      if (data.user) {
        console.log("Signup successful:", data.user);
        const userData = {
          id: data.user.id,
          name: name,
          email: email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          role: role
        };

        try {
          await createOrUpdateProfile(data.user.id, name, email);
          setUser(userData);
          
          toast({
            title: "Sign up successful",
            description: `Welcome to BeautyCut, ${role === 'salon_owner' ? 'Salon Owner' : 'User'}!`,
          });
        } catch (profileError: any) {
          console.error("Error creating profile:", profileError);
          toast({
            title: "Profile creation failed",
            description: profileError.message || "Failed to create profile. Please try logging in.",
            variant: "destructive",
          });
        }
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: "Sign up failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = async () => {
    console.log("Logging out...");
    await supabase.auth.signOut();
    setUser(null);
    toast({
      title: "Logged out",
      description: "Come back soon!",
    });
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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};