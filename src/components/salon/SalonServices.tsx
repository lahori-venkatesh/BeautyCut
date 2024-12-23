import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const SalonServices = ({ salon }: { salon: any }) => {
  console.log("Rendering SalonServices component");
  
  const mockServices = [
    {
      name: "Haircut",
      description: "Professional haircut with wash and styling",
      price: "₹500",
      duration: "45 mins",
      experts: ["John", "Sarah"]
    },
    {
      name: "Hair Color",
      description: "Full head color with premium products",
      price: "₹2000",
      duration: "120 mins",
      experts: ["Mike", "Emma"]
    },
    {
      name: "Facial",
      description: "Deep cleansing facial with massage",
      price: "₹1500",
      duration: "60 mins",
      experts: ["Lisa", "David"]
    }
  ];

  return (
    <div className="space-y-4">
      {mockServices.map((service, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{service.name}</CardTitle>
                <p className="text-sm text-gray-500 mt-1">{service.description}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{service.price}</p>
                <p className="text-sm text-gray-500">{service.duration}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {service.experts.map((expert, i) => (
                <Badge key={i} variant="secondary">
                  {expert}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};