import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

export function useProfileData() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [newName, setNewName] = useState("");

  console.log("useProfileData hook - Current user:", user);

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      console.log("Fetching profile for user ID:", user?.id);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .maybeSingle();
      
      if (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }

      console.log("Profile data received:", data);
      return data;
    },
    enabled: !!user?.id,
    meta: {
      onSuccess: (data: any) => {
        setNewName(data?.full_name || "");
      }
    }
  });

  const updateProfileMutation = useMutation({
    mutationFn: async ({ full_name }: { full_name: string }) => {
      console.log("Updating profile with name:", full_name);
      const { error } = await supabase
        .from('profiles')
        .update({ full_name })
        .eq('id', user?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
    }
  });

  const uploadAvatarMutation = useMutation({
    mutationFn: async (file: File) => {
      console.log("Uploading avatar file:", file.name);
      const fileExt = file.name.split('.').pop();
      const filePath = `${user?.id}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      console.log("Avatar uploaded, public URL:", publicUrl);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user?.id);

      if (updateError) throw updateError;

      return publicUrl;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
    }
  });

  return {
    profile,
    isLoading,
    newName,
    setNewName,
    updateProfileMutation,
    uploadAvatarMutation
  };
}