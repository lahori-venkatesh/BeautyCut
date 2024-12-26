import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export const SalonServices = ({ salon }: { salon: any }) => {
  console.log("Rendering SalonServices component with salon:", salon);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedService, setSelectedService] = useState<any>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  
  const handleBooking = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to book an appointment",
        variant: "destructive",
      });
      return;
    }

    if (!selectedDate || !selectedService) {
      toast({
        title: "Incomplete Booking",
        description: "Please select both a date and time slot",
        variant: "destructive",
      });
      return;
    }

    // Validate salon.id is present and is a valid UUID
    if (!salon?.id || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(salon.id)) {
      console.error("Invalid salon ID:", salon?.id);
      toast({
        title: "Booking Error",
        description: "Invalid salon information. Please try again later.",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log("Attempting to create booking with data:", {
        user_id: user.id,
        salon_id: salon.id,
        service: selectedService.name,
        booking_date: selectedDate.toISOString(),
      });

      const { data, error } = await supabase.from('bookings').insert({
        user_id: user.id,
        salon_id: salon.id,
        service: selectedService.name,
        booking_date: selectedDate.toISOString(),
      }).select();

      if (error) {
        console.error('Booking error:', error);
        throw error;
      }

      console.log("Booking created successfully:", data);

      toast({
        title: "Booking Successful",
        description: `Your appointment for ${selectedService.name} has been booked for ${format(selectedDate, 'PPP')}`,
      });
    } catch (error: any) {
      console.error('Booking error:', error);
      toast({
        title: "Booking Failed",
        description: "There was an error booking your appointment. Please try again.",
        variant: "destructive",
      });
    }
  };

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
    <div className="container mx-auto px-4 py-6 space-y-12">
      {Object.entries(serviceCategories).map(([category, { title, services }]) => (
        <div key={category} className="space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <h2 className="text-2xl font-semibold text-primary">{title}</h2>
            <Separator className="w-24" />
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Card 
                    className="border-2 border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:border-primary/20"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <CardTitle className="text-lg font-medium">{service.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-primary">{service.price}</p>
                          <p className="text-xs text-muted-foreground">{service.duration}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {service.experts.map((expert, i) => (
                          <Badge 
                            key={i} 
                            variant="secondary"
                            className="text-xs font-normal"
                          >
                            {expert}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Book {service.name}</DialogTitle>
                    <DialogDescription>
                      Select a date for your appointment
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date);
                        setSelectedService(service);
                      }}
                      className="rounded-md border"
                      disabled={(date) => date < new Date()}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleBooking}>
                      Book Appointment
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};