import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useState } from "react";
import { SalonDetailsModal } from "./salon/SalonDetailsModal";

interface SalonCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  location: string;
  services: string[];
}

export const SalonCard = ({ id, name, image, rating, location, services }: SalonCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <Card 
        className="overflow-hidden hover:shadow-lg transition-shadow animate-fadeIn cursor-pointer"
        onClick={() => setShowDetails(true)}
      >
        <div className="aspect-video relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg">{name}</h3>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm">{rating}</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">{location}</p>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex flex-wrap gap-2">
            {services.map((service) => (
              <span
                key={service}
                className="px-2 py-1 bg-secondary text-xs rounded-full text-primary"
              >
                {service}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      <SalonDetailsModal
        salon={{ id, name, image, rating, location, services }}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </>
  );
};