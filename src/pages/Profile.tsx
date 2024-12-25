import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");

  console.log("Profile page - Current user:", user);

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
    onSuccess: (data) => {
      setNewName(data.full_name || "");
    }
  });

  const updateProfileMutation = useMutation({
    mutationFn: async ({ full_name }: { full_name: string }) => {
      const { error } = await supabase
        .from('profiles')
        .update({ full_name })
        .eq('id', user?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
      console.error("Error updating profile:", error);
    },
  });

  const uploadAvatarMutation = useMutation({
    mutationFn: async (file: File) => {
      const fileExt = file.name.split('.').pop();
      const filePath = `${user?.id}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user?.id);

      if (updateError) throw updateError;

      return publicUrl;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
      toast({
        title: "Avatar updated",
        description: "Your avatar has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to upload avatar. Please try again.",
        variant: "destructive",
      });
      console.error("Error uploading avatar:", error);
    },
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadAvatarMutation.mutate(file);
    }
  };

  const handleNameUpdate = () => {
    if (newName.trim()) {
      updateProfileMutation.mutate({ full_name: newName.trim() });
    }
  };

  if (isLoading) return <div>Loading...</div>;

  const initials = profile?.full_name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || user?.name?.[0]?.toUpperCase() || "U";

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile?.avatar_url || user?.avatar} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <Label htmlFor="avatar-upload">
                <div className="absolute bottom-0 right-0 rounded-full bg-primary p-2 cursor-pointer hover:bg-primary/90">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                    <line x1="16" x2="22" y1="5" y2="5" />
                    <line x1="19" x2="19" y1="2" y2="8" />
                  </svg>
                </div>
              </Label>
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>
            
            <div className="w-full max-w-sm space-y-4">
              <div>
                <Label>Name</Label>
                {isEditing ? (
                  <div className="flex space-x-2">
                    <Input
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Enter your name"
                    />
                    <Button onClick={handleNameUpdate}>Save</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <p className="text-lg">{profile?.full_name || user?.name}</p>
                    <Button variant="ghost" onClick={() => setIsEditing(true)}>
                      Edit
                    </Button>
                  </div>
                )}
              </div>
              
              <div>
                <Label>Email</Label>
                <p className="text-lg">{profile?.email || user?.email}</p>
              </div>
              
              {profile?.phone_number && (
                <div>
                  <Label>Phone</Label>
                  <p className="text-lg">{profile.phone_number}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}