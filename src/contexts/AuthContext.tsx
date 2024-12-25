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
    // Initialize session
    const initSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
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
    } = supabase.auth.onAuthStateChange((_event, session) => {
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const userData = {
          id: data.user.id,
          name: data.user.user_metadata.name || '',
          email: data.user.email || '',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          role: role
        };

        await createOrUpdateProfile(data.user.id, userData.name, email);
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
    }
  };

  const signup = async (name: string, email: string, password: string, role: 'user' | 'salon_owner') => {
    try {
      // Check if enough time has passed since the last attempt
      const now = Date.now();
      const timeSinceLastAttempt = now - lastSignupAttempt;
      if (timeSinceLastAttempt < 40000) { // 40 seconds in milliseconds
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
        if (error.message.includes('rate_limit')) {
          toast({
            title: "Too many attempts",
            description: "Please wait 40 seconds before trying again",
            variant: "destructive",
          });
          return;
        }
        throw error;
      }

      if (data.user) {
        // Wait for the session to be established
        await new Promise(resolve => setTimeout(resolve, 1000));
        
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
    }
  };

  const logout = async () => {
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