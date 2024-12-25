import { supabase } from "@/integrations/supabase/client";

export const createOrUpdateProfile = async (userId: string, name: string, email: string) => {
  console.log("Creating/updating profile for user:", userId);
  
  // Wait for session to be established
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (existingProfile) {
    console.log("Profile already exists, updating...");
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: name,
        email: email,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  } else {
    console.log("Creating new profile...");
    const { error } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        full_name: name,
        email: email,
        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      });

    if (error) {
      console.error("Error creating profile:", error);
      throw error;
    }
  }

  return true;
};