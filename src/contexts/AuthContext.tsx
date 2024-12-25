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
      const { data: { user: authUser }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (authUser) {
        const userData = {
          id: authUser.id,
          name: authUser.user_metadata.name || '',
          email: authUser.email || '',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          role: role
        };

        await createOrUpdateProfile(authUser.id, userData.name, email);
        setUser(userData);

        toast({
          title: "Login successful",
          description: `Welcome back, ${role === 'salon_owner' ? 'Salon Owner' : 'User'}!`,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    }
  };

  const signup = async (name: string, email: string, password: string, role: 'user' | 'salon_owner') => {
    try {
      const { data: { user: authUser }, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
            role: role,
          },
        },
      });

      if (error) throw error;

      if (authUser) {
        const userData = {
          id: authUser.id,
          name: name,
          email: email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          role: role
        };

        await createOrUpdateProfile(authUser.id, name, email);
        setUser(userData);

        toast({
          title: "Sign up successful",
          description: `Welcome to BeautyCut, ${role === 'salon_owner' ? 'Salon Owner' : 'User'}!`,
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Sign up failed",
        description: "Please try again",
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