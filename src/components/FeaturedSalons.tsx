import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SalonCard } from "./SalonCard";
import { Skeleton } from "./ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface Salon {
  id: string;
  name: string;
  image_url: string;
  rating: number;
  location: string;
  services: string[];
  description: string;
  created_at: string;
  updated_at: string;
}

const fetchFeaturedSalons = async (): Promise<Salon[]> => {
  console.log("Fetching featured salons...");
  const { data, error } = await supabase
    .from("salons")
    .select("*")
    .order('created_at', { ascending: false })
    .limit(6);

  if (error) {
    console.error("Error fetching salons:", error);
    throw error;
  }

  if (!data) {
    console.log("No salons found");
    return [];
  }

  console.log("Fetched salons:", data);
  return data;
};

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="space-y-4">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    ))}
  </div>
);

export const FeaturedSalons = () => {
  const { data: salons, isLoading, error } = useQuery({
    queryKey: ["featured-salons"],
    queryFn: fetchFeaturedSalons,
    meta: {
      errorMessage: "Failed to load featured salons",
    },
  });

  console.log("FeaturedSalons component state:", { salons, isLoading, error });

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load featured salons. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!salons || salons.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Salons Found</AlertTitle>
        <AlertDescription>
          There are currently no featured salons available.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {salons.map((salon) => (
        <SalonCard
          key={salon.id}
          id={salon.id}
          name={salon.name}
          image={salon.image_url || "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80"}
          rating={salon.rating || 4.5}
          location={salon.location}
          services={salon.services || []}
        />
      ))}
    </div>
  );
};