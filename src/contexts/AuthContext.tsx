import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  // In a real app, this would be replaced with actual API calls
  const login = async (email: string, password: string) => {
    try {
      // Simulate API call
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: email,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
      };
      setUser(mockUser);
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      // Simulate API call
      const mockUser = {
        id: '1',
        name: name,
        email: email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
      };
      setUser(mockUser);
      toast({
        title: "Sign up successful",
        description: "Welcome to BeautyCut!",
      });
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const logout = () => {
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