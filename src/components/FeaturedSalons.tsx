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

// Default salons to show while loading or if no data
const DEFAULT_SALONS: Salon[] = [
  {
    id: "1",
    name: "Style Studio",
    image_url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    location: "Banjara Hills, Hyderabad",
    services: ["Haircut", "Color", "Styling"],
    description: "Premium salon services",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "2",
    name: "Glamour Zone",
    image_url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    location: "Jubilee Hills, Hyderabad",
    services: ["Facial", "Massage", "Nails"],
    description: "Luxury beauty services",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "3",
    name: "Elite Cuts",
    image_url: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    location: "Indiranagar, Bangalore",
    services: ["Haircut", "Beard Trim", "Facial"],
    description: "Premium grooming services",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const fetchFeaturedSalons = async (): Promise<Salon[]> => {
  console.log("Fetching featured salons...");
  const { data, error } = await supabase
    .from("salons")
    .select("*")
    .order('created_at', { ascending: false })
    .limit(6);

  if (error) {
    console.error("Error fetching salons:", error);
    return DEFAULT_SALONS;
  }

  if (!data || data.length === 0) {
    console.log("No salons found, using default salons");
    return DEFAULT_SALONS;
  }

  console.log("Fetched salons:", data);
  return data;
};

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="space-y-4">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    ))}
  </div>
);

export const FeaturedSalons = () => {
  const { data: salons, isLoading } = useQuery({
    queryKey: ["featured-salons"],
    queryFn: fetchFeaturedSalons,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    gcTime: 1000 * 60 * 30, // Keep in cache for 30 minutes (previously cacheTime)
  });

  console.log("FeaturedSalons component state:", { salons, isLoading });

  if (isLoading) {
    return <LoadingSkeleton />;
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