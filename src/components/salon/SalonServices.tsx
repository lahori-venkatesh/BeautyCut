import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const SalonServices = ({ salon }: { salon: any }) => {
  console.log("Rendering SalonServices component");
  
  const serviceCategories = {
    grooming: {
      title: "Grooming Services",
      services: [
        {
          name: "Basic Hair Cut",
          description: "Professional haircut with expert styling",
          price: "₹300",
          duration: "30 mins",
          experts: ["John", "Mike"]
        },
        {
          name: "Shaving/Trimming",
          description: "Clean shave or beard trimming and styling",
          price: "₹200",
          duration: "20 mins",
          experts: ["David", "Mike"]
        },
        {
          name: "Head Wash",
          description: "Relaxing head wash with premium products",
          price: "₹150",
          duration: "15 mins",
          experts: ["Sarah", "Lisa"]
        },
        {
          name: "Hair Straightening",
          description: "Professional hair straightening treatment",
          price: "₹2500",
          duration: "120 mins",
          experts: ["Emma", "Sarah"]
        }
      ]
    },
    beauty: {
      title: "Beauty Services",
      services: [
        {
          name: "Facial",
          description: "Deep cleansing facial with massage",
          price: "₹1500",
          duration: "60 mins",
          experts: ["Lisa", "Emma"]
        },
        {
          name: "Threading",
          description: "Eyebrow and face threading",
          price: "₹100",
          duration: "15 mins",
          experts: ["Sarah", "Lisa"]
        }
      ]
    },
    colors: {
      title: "Hair Colors & Treatments",
      services: [
        {
          name: "Global Hair Color",
          description: "Full head color with premium products",
          price: "₹2000",
          duration: "120 mins",
          experts: ["Emma", "Sarah"]
        },
        {
          name: "Highlights",
          description: "Partial or full head highlights",
          price: "₹3000",
          duration: "150 mins",
          experts: ["Emma", "Mike"]
        }
      ]
    },
    spa: {
      title: "Spa Services",
      services: [
        {
          name: "Full Body Massage",
          description: "Relaxing full body massage",
          price: "₹2000",
          duration: "60 mins",
          experts: ["Lisa", "Sarah"]
        },
        {
          name: "Body Scrub",
          description: "Exfoliating body scrub treatment",
          price: "₹1500",
          duration: "45 mins",
          experts: ["Lisa", "Emma"]
        }
      ]
    },
    nails: {
      title: "Pedicure & Manicure",
      services: [
        {
          name: "Classic Manicure",
          description: "Basic nail care and polish",
          price: "₹500",
          duration: "30 mins",
          experts: ["Lisa", "Sarah"]
        },
        {
          name: "Deluxe Pedicure",
          description: "Luxury foot care treatment",
          price: "₹800",
          duration: "45 mins",
          experts: ["Lisa", "Emma"]
        }
      ]
    }
  };

  return (
    <div className="space-y-8">
      {Object.entries(serviceCategories).map(([category, { title, services }]) => (
        <div key={category} className="space-y-4">
          <h2 className="text-2xl font-bold text-primary">{title}</h2>
          <div className="grid gap-4">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">{service.price}</p>
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
        </div>
      ))}
    </div>
  );
};