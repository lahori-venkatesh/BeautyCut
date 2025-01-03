import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SalonCard } from "@/components/SalonCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const { user } = useAuth();
  const navigate = useNavigate();
  console.log("Favorites page - Current user:", user);

  const { data: favorites, isLoading } = useQuery({
    queryKey: ['favorites', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('favorites')
        .select(`
          *,
          salon:salons(*)
        `)
        .eq('user_id', user?.id);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-8">
      <Button 
        variant="ghost" 
        className="mb-4" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>My Favorite Salons</CardTitle>
        </CardHeader>
        <CardContent>
          {favorites?.length === 0 ? (
            <p>No favorite salons yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites?.map((favorite) => (
                <SalonCard 
                  key={favorite.salon.id}
                  id={favorite.salon.id}
                  name={favorite.salon.name}
                  image={favorite.salon.image_url || '/placeholder.svg'}
                  rating={favorite.salon.rating || 0}
                  location={favorite.salon.location}
                  services={favorite.salon.services || []}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}