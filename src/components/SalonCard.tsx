import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { SalonDetailsModal } from "./salon/SalonDetailsModal";

interface Service {
  name: string;
  price: number;
  duration: number;
}

interface SalonCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  location: string;
  services: string[];
  description?: string;
}

export const SalonCard = ({ id, name, image, rating, location, services, description }: SalonCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  // Parse services from JSON strings to objects
  const parsedServices = services?.map(service => {
    try {
      return JSON.parse(service) as Service;
    } catch (e) {
      console.error('Error parsing service:', service, e);
      return null;
    }
  }).filter(Boolean) || [];

  return (
    <>
      <Card 
        className="overflow-hidden hover:shadow-lg transition-shadow animate-fadeIn cursor-pointer"
        onClick={() => setShowDetails(true)}
      >
        <div className="aspect-video relative overflow-hidden">
          <img
            src={image || '/placeholder.svg'}
            alt={name}
            className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg">{name}</h3>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm">{rating || 'New'}</span>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            <p>{location}</p>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex flex-wrap gap-2">
            {parsedServices.slice(0, 3).map((service, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-secondary text-xs rounded-full text-primary"
              >
                {service.name} - ₹{service.price}
              </span>
            ))}
            {parsedServices.length > 3 && (
              <span className="px-2 py-1 bg-secondary text-xs rounded-full text-primary">
                +{parsedServices.length - 3} more
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      <SalonDetailsModal
        salon={{ 
          id, 
          name, 
          image, 
          rating, 
          location, 
          services: parsedServices,
          description 
        }}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </>
  );
};