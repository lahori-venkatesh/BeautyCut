import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SalonCard } from "@/components/SalonCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

// Fetch featured salons function
const fetchFeaturedSalons = async () => {
  console.log("Fetching featured salons...");
  const { data, error } = await supabase
    .from('salons')
    .select('*')
    .limit(6);
  
  if (error) {
    console.error("Error fetching salons:", error);
    throw error;
  }
  
  console.log("Fetched salons:", data);
  return data;
};

// Loading skeleton component for salon cards
const SalonCardSkeleton = () => (
  <div className="border rounded-lg overflow-hidden">
    <Skeleton className="h-48 w-full" />
    <div className="p-4 space-y-3">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  </div>
);

export const FeaturedSalons = () => {
  const navigate = useNavigate();
  
  const { data: salons, isLoading, error } = useQuery({
    queryKey: ['featuredSalons'],
    queryFn: fetchFeaturedSalons,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // Keep in cache for 30 minutes (previously cacheTime)
  });

  console.log("Rendering FeaturedSalons with salons:", salons);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Featured Salons in Hyderabad & Bangalore</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover top-rated salons in your city, from classic barbershops to luxury spa experiences
        </p>
      </div>

      {error && (
        <div className="text-center text-red-600 mb-8">
          Failed to load salons. Please try again later.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          Array(6).fill(0).map((_, index) => (
            <SalonCardSkeleton key={index} />
          ))
        ) : salons && salons.length > 0 ? (
          salons.map((salon) => (
            <SalonCard 
              key={salon.id}
              id={salon.id}
              name={salon.name}
              image={salon.image_url || "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80"}
              rating={salon.rating}
              location={salon.location}
              services={salon.services || []}
              description={salon.description}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600">
            No salons available at the moment.
          </div>
        )}
      </div>

      <div className="text-center mt-12">
        <Button size="lg" onClick={() => navigate('/salons')}>
          View All Salons
        </Button>
      </div>
    </div>
  );
};