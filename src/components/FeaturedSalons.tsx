import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SalonCard } from "@/components/SalonCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Fetch featured salons function with better error handling
const fetchFeaturedSalons = async () => {
  console.log("Fetching featured salons...");
  try {
    const { data, error } = await supabase
      .from('salons')
      .select('*')
      .limit(6);
    
    if (error) {
      console.error("Error fetching salons:", error);
      throw error;
    }
    
    console.log("Successfully fetched salons:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch salons:", error);
    throw error;
  }
};

// Loading skeleton component for salon cards
const SalonCardSkeleton = () => (
  <div className="border rounded-lg overflow-hidden animate-pulse">
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
  const { toast } = useToast();
  
  const { data: salons, isLoading, error } = useQuery({
    queryKey: ['featuredSalons'],
    queryFn: fetchFeaturedSalons,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // Keep in cache for 30 minutes
    retry: 2,
    onError: (error) => {
      console.error("Query error:", error);
      toast({
        title: "Error loading salons",
        description: "Please try again later",
        variant: "destructive",
      });
    },
  });

  console.log("Rendering FeaturedSalons with state:", { isLoading, error, salonsCount: salons?.length });

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Featured Salons</h2>
        <div className="text-red-600 mb-8">
          Failed to load salons. Please try again later.
        </div>
        <Button onClick={() => window.location.reload()}>
          Retry Loading
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Featured Salons in Hyderabad & Bangalore</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover top-rated salons in your city, from classic barbershops to luxury spa experiences
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array(6).fill(0).map((_, index) => (
            <SalonCardSkeleton key={index} />
          ))}
        </div>
      ) : salons && salons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {salons.map((salon) => (
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
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No salons available at the moment.</p>
          <Button onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
        </div>
      )}

      <div className="text-center mt-12">
        <Button 
          size="lg" 
          onClick={() => navigate('/salons')}
          className="min-w-[200px]"
        >
          View All Salons
        </Button>
      </div>
    </div>
  );
};