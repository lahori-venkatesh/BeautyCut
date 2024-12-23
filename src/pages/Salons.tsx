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
  {
    id: "3",
    name: "Glamour Zone Mumbai",
    image: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    location: "Bandra West, Mumbai",
    services: ["Makeup", "Hair Styling", "Spa"],
    coordinates: { latitude: 19.0596, longitude: 72.8295 }
  },
  {
    id: "4",
    name: "Elite Cuts Delhi",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    location: "Connaught Place, Delhi",
    services: ["Haircut", "Beard Trim", "Facial"],
    coordinates: { latitude: 28.6329, longitude: 77.2195 }
  },
  {
    id: "5",
    name: "Luxe Beauty Chennai",
    image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    location: "T Nagar, Chennai",
    services: ["Bridal Makeup", "Hair Treatment", "Manicure"],
    coordinates: { latitude: 13.0827, longitude: 80.2707 }
  },
  {
    id: "6",
    name: "Royal Spa Pune",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    location: "Koregaon Park, Pune",
    services: ["Massage", "Body Treatments", "Facial"],
    coordinates: { latitude: 18.5204, longitude: 73.8567 }
  },
  {
    id: "7",
    name: "The Barber's Club",
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    location: "Whitefield, Bangalore",
    services: ["Men's Grooming", "Beard Styling", "Hair Color"],
    coordinates: { latitude: 12.9698, longitude: 77.7499 }
  },
  {
    id: "8",
    name: "Serenity Wellness",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    location: "Jubilee Hills, Hyderabad",
    services: ["Spa", "Wellness", "Yoga"],
    coordinates: { latitude: 17.4319, longitude: 78.4073 }
  },
  {
    id: "9",
    name: "Trendy Cuts Kolkata",
    image: "https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    location: "Park Street, Kolkata",
    services: ["Haircut", "Styling", "Makeup"],
    coordinates: { latitude: 22.5726, longitude: 88.3639 }
  }
];

const Salons = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [salons, setSalons] = useState<Salon[]>([]);
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Load salons from localStorage and combine with mock data
    const savedSalons = JSON.parse(localStorage.getItem('salons') || '[]');
    setSalons([...MOCK_SALONS, ...savedSalons]);
  }, []);

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
    let filteredSalons = [...salons];

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
