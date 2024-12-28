import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types/auth";

export const fetchUserProfile = async (userId: string) => {
  console.log("Fetching profile for user ID:", userId);
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }

  console.log("Profile data received:", profile);
  return profile;
};

export const signInWithPassword = async (email: string, password: string) => {
  console.log("Attempting login for:", email);
  return supabase.auth.signInWithPassword({ email, password });
};

export const signUp = async (email: string, password: string, userData: { name: string, role: string }) => {
  console.log("Attempting signup for:", email, "with role:", userData.role);
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: userData.name,
        role: userData.role
      }
    }
  });
};

export const signOut = async () => {
  return supabase.auth.signOut();
};

export const mapProfileToUser = (profile: any, email: string): User => ({
  id: profile.id,
  name: profile.full_name || '',
  email: email,
  role: profile.role || 'user',
  avatar: profile.avatar_url
});