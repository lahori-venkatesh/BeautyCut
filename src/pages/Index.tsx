import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { SalonCard } from "@/components/SalonCard";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

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

const Index = () => {
  const navigate = useNavigate();
  
  // Use React Query for efficient data fetching and caching
  const { data: salons, isLoading, error } = useQuery({
    queryKey: ['featuredSalons'],
    queryFn: fetchFeaturedSalons,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // Keep in cache for 30 minutes (previously cacheTime)
  });

  console.log("Rendering Index with salons:", salons);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
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
            // Show skeletons while loading
            Array(6).fill(0).map((_, index) => (
              <SalonCardSkeleton key={index} />
            ))
          ) : salons && salons.length > 0 ? (
            // Show actual salon cards
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
      
      <footer className="bg-gray-50 border-t">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">For Customers</h3>
          <ul className="space-y-2">
            <li><Link to="/salons" className="text-gray-600 hover:text-primary">Find Salons</Link></li>
            <li><Link to="/about" className="text-gray-600 hover:text-primary">How it Works</Link></li>
            <li><Link to="/support" className="text-gray-600 hover:text-primary">Customer Support</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">For Salon Owners</h3>
          <ul className="space-y-2">
            <li><Link to="/register" className="text-gray-600 hover:text-primary">List Your Salon</Link></li>
            <li><Link to="/business" className="text-gray-600 hover:text-primary">Business Dashboard</Link></li>
            <li><Link to="/resources" className="text-gray-600 hover:text-primary">Resources</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Company</h3>
          <ul className="space-y-2">
            <li><Link to="/about" className="text-gray-600 hover:text-primary">About Us</Link></li>
            <li><Link to="/careers" className="text-gray-600 hover:text-primary">Careers</Link></li>
            <li><Link to="/contact" className="text-gray-600 hover:text-primary">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><Link to="/privacy" className="text-gray-600 hover:text-primary">Privacy Policy</Link></li>
            <li><Link to="/terms" className="text-gray-600 hover:text-primary">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t mt-12 pt-8 text-center text-gray-600">
        <p>&copy; 2024 BeautyCut. All rights reserved.</p>
      </div>
    </div>
      </footer>
    </div>
  );
};

export default Index;
