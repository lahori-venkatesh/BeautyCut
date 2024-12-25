import { supabase } from "@/integrations/supabase/client";

export const createOrUpdateProfile = async (userId: string, name: string, email: string) => {
  console.log("Creating/updating profile for user:", userId);
  
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session?.access_token) {
    throw new Error("No active session found");
  }

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

  return true;
};