import { Navbar } from "@/components/Navbar";
import { useState, useEffect } from "react";
import { SalonCard } from "@/components/SalonCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Salon {
  id: string;
  name: string;
  image: string;
  rating: number;
  location: string;
  services: string[];
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

// Mock data - In a real app, this would come from an API
const MOCK_SALONS: Salon[] = [
  {
    id: "1",
    name: "Style Studio Hyderabad",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    location: "Banjara Hills, Hyderabad",
    services: ["Haircut", "Color", "Styling"],
    coordinates: { latitude: 17.4256, longitude: 78.4539 }
  },
  {
    id: "2",
    name: "Bangalore Beauty Lounge",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    location: "Indiranagar, Bangalore",
    services: ["Facial", "Massage", "Nails"],
    coordinates: { latitude: 12.9716, longitude: 77.6441 }
  },
  // Add more mock salons as needed
];

const Salons = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [salons, setSalons] = useState<Salon[]>(MOCK_SALONS);
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Get user's location if they're logged in
    if (user) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position.coords);
          console.log("User location obtained:", position.coords);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location Access Failed",
            description: "Please enable location access for better salon recommendations",
            variant: "destructive",
          });
        }
      );
    }
  }, [user, toast]);

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Filter and sort salons
  useEffect(() => {
    let filteredSalons = [...MOCK_SALONS];

    // Apply search filter
    if (searchTerm) {
      filteredSalons = filteredSalons.filter(salon =>
        salon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        salon.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        salon.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply sorting
    filteredSalons.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "rating":
          return b.rating - a.rating;
        case "distance":
          if (userLocation && a.coordinates && b.coordinates) {
            const distanceA = calculateDistance(
              userLocation.latitude,
              userLocation.longitude,
              a.coordinates.latitude,
              a.coordinates.longitude
            );
            const distanceB = calculateDistance(
              userLocation.latitude,
              userLocation.longitude,
              b.coordinates.latitude,
              b.coordinates.longitude
            );
            return distanceA - distanceB;
          }
          return 0;
        default:
          return 0;
      }
    });

    setSalons(filteredSalons);
  }, [searchTerm, sortBy, userLocation]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Find Your Perfect Salon</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by salon name, location, or services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="rating">Sort by Rating</SelectItem>
                {userLocation && <SelectItem value="distance">Sort by Distance</SelectItem>}
              </SelectContent>
            </Select>
            {!user && (
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => {
                  toast({
                    title: "Sign Up Required",
                    description: "Please sign up to enable location-based sorting",
                  });
                }}
              >
                <MapPin className="h-4 w-4" />
                Enable Location
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {salons.map((salon) => (
            <SalonCard key={salon.id} {...salon} />
          ))}
        </div>

        {salons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No salons found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Salons;