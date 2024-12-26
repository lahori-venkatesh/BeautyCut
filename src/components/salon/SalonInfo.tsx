import { MapPin, Phone, Mail, Car, Accessibility } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SalonInfo = ({ salon }: { salon: any }) => {
  console.log("Rendering SalonInfo component");
  
  // Additional sample images for the salon gallery
  const additionalImages = [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=800&q=80",
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <MapPin className="w-5 h-5 mt-1 text-primary" />
            <div>
              <h3 className="font-semibold">Location</h3>
              <p className="text-sm text-gray-600">{salon.location}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  salon.location
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                View on Google Maps
              </a>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Phone className="w-5 h-5 mt-1 text-primary" />
            <div>
              <h3 className="font-semibold">Contact</h3>
              <p className="text-sm text-gray-600">+91 98765 43210</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Mail className="w-5 h-5 mt-1 text-primary" />
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-sm text-gray-600">contact@{salon.name.toLowerCase().replace(/\s+/g, '')}.com</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <Car className="w-5 h-5 mt-1 text-primary" />
            <div>
              <h3 className="font-semibold">Parking</h3>
              <p className="text-sm text-gray-600">Available on premises</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Accessibility className="w-5 h-5 mt-1 text-primary" />
            <div>
              <h3 className="font-semibold">Accessibility</h3>
              <p className="text-sm text-gray-600">Wheelchair accessible</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Salon Photos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Main salon image */}
          <div className="col-span-full md:col-span-2 aspect-video">
            <img
              src={salon.image}
              alt={`${salon.name} main view`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          {/* Additional images */}
          {additionalImages.map((image, index) => (
            <div key={index} className="aspect-square">
              <img
                src={image}
                alt={`${salon.name} view ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};