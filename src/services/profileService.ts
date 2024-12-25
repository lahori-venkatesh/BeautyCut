import { supabase } from "@/integrations/supabase/client";

export const createOrUpdateProfile = async (userId: string, name: string, email: string) => {
  console.log("Creating/updating profile for user:", { userId, name, email });
  
  try {
    // First check if profile exists
    const { data: existingProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (fetchError) {
      console.error("Error fetching profile:", fetchError);
      throw fetchError;
    }

    if (existingProfile) {
      console.log("Profile exists, updating...", existingProfile);
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name: name,
          email: email,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (updateError) {
        console.error("Error updating profile:", updateError);
        throw updateError;
      }
    } else {
      console.log("Creating new profile...");
      const { error: insertError } = await supabase
        .from('profiles')
        .insert([{
          id: userId,
          full_name: name,
          email: email,
          avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        }]);

      if (insertError) {
        console.error("Error creating profile:", insertError);
        throw insertError;
      }
    }

    console.log("Profile operation completed successfully");
    return true;
  } catch (error) {
    console.error("Error in createOrUpdateProfile:", error);
    throw error;
  }
};