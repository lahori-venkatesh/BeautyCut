import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'salon_owner';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'user' | 'salon_owner') => Promise<void>;
  signup: (name: string, email: string, password: string, role: 'user' | 'salon_owner') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  // Initialize session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata.name || '',
          email: session.user.email || '',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.email}`,
          role: session.user.user_metadata.role || 'user'
        });
      }
    });

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

  const createOrUpdateProfile = async (userId: string, name: string, email: string) => {
    console.log("Creating/updating profile for user:", userId);
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        full_name: name,
        email: email,
        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      }, {
        onConflict: 'id'
      });

    if (error) {
      console.error("Error creating/updating profile:", error);
      throw error;
    }
  };

  const login = async (email: string, password: string, role: 'user' | 'salon_owner') => {
    try {
      console.log("Attempting login with email:", email, "and role:", role);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error details:", error);
        if (error.message === "Invalid login credentials") {
          toast({
            title: "Login failed",
            description: "Email or password is incorrect. Please try again.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Login failed",
            description: "An unexpected error occurred. Please try again.",
            variant: "destructive",
          });
        }
        throw error;
      }

      if (data.user) {
        console.log("Login successful, user data:", data.user);
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
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const signup = async (name: string, email: string, password: string, role: 'user' | 'salon_owner') => {
    try {
      console.log("Attempting signup with email:", email, "and role:", role);
      
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
        console.error("Signup error details:", error);
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      if (data.user) {
        console.log("Signup successful, user data:", data.user);
        const userData = {
          id: data.user.id,
          name: name,
          email: email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          role: role
        };

        await createOrUpdateProfile(data.user.id, name, email);
        setUser(userData);

        toast({
          title: "Sign up successful",
          description: `Welcome to BeautyCut, ${role === 'salon_owner' ? 'Salon Owner' : 'User'}!`,
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
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