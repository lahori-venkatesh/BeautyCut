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
}

const DEFAULT_SALONS: Salon[] = [
  {
    id: "1",
    name: "Style Studio",
    image_url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    location: "Banjara Hills, Hyderabad",
    services: ["Haircut", "Color", "Styling"],
    description: "Premium salon services"
  },
  {
    id: "2",
    name: "Glamour Zone",
    image_url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    location: "Indiranagar, Bangalore",
    services: ["Facial", "Massage", "Nails"],
    description: "Luxury beauty treatments"
  },
  {
    id: "3",
    name: "The Barber's Club",
    image_url: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    location: "Whitefield, Bangalore",
    services: ["Men's Grooming", "Beard Styling", "Hair Color"],
    description: "Premium men's grooming"
  }
];

const fetchFeaturedSalons = async (): Promise<Salon[]> => {
  console.log("Fetching featured salons...");
  const { data, error } = await supabase
    .from("salons")
    .select("*")
    .limit(6);

  if (error) {
    console.error("Error fetching salons:", error);
    return DEFAULT_SALONS;
  }

  if (!data || data.length === 0) {
    console.log("No salons found in database, using default salons");
    return DEFAULT_SALONS;
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