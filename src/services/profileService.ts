import { supabase } from "@/integrations/supabase/client";

export const createOrUpdateProfile = async (userId: string, name: string, email: string) => {
  console.log("Creating/updating profile for user:", { userId, name, email });
  
  try {
    const { data, error } = await supabase
      .from('profiles')
      .upsert(
        {
          id: userId,
          full_name: name,
          email: email,
        },
        {
          onConflict: 'id'
        }
      )
      .select('*')
      .single();

    if (error) {
      console.error("Error in createOrUpdateProfile:", error);
      throw error;
    }

    console.log("Profile created/updated successfully:", data);
    return data;
  } catch (error) {
    console.error("Error creating profile:", error);
    throw error;
  }
};