import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { BasicDetailsSection } from "@/components/salon/BasicDetailsSection";
import { ServicesSection } from "@/components/salon/ServicesSection";
import { StaffSection } from "@/components/salon/StaffSection";
import { GalleryUpload } from "@/components/salon/GalleryUpload";
import { BookingFeatures } from "@/components/salon/BookingFeatures";
import { PromotionsSection } from "@/components/salon/PromotionsSection";
import { AccessibilitySection } from "@/components/salon/AccessibilitySection";

const formSchema = z.object({
  salonName: z.string().min(2, { message: "Salon name must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  state: z.string().min(2, { message: "State must be at least 2 characters." }),
  zipCode: z.string().min(5, { message: "ZIP code must be at least 5 characters." }),
  services: z.array(z.object({
    name: z.string(),
    price: z.number(),
    duration: z.number()
  })).min(1, { message: "At least one service is required." }),
});

export default function ListSalon() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      console.log("No user found, redirecting to login");
      navigate('/');
      return;
    }
    
    if (user.role !== 'salon_owner') {
      console.log("User is not a salon owner, redirecting to home");
      navigate('/');
      return;
    }
  }, [user, navigate]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      salonName: "",
      description: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      services: [
        {
          name: "Haircut",
          price: 30,
          duration: 30
        }
      ]
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to create a salon.",
          variant: "destructive",
        });
        return;
      }

      console.log("Submitting salon data:", values);
      
      // Format the location string
      const location = `${values.address}, ${values.city}, ${values.state} ${values.zipCode}`;
      
      // Format services array to match Supabase schema (only service names)
      const formattedServices = values.services.map(service => service.name);

      console.log('Formatted services:', formattedServices);
      console.log('Attempting to insert salon with location:', location);
      
      // Insert salon data into Supabase
      const { data: salon, error } = await supabase
        .from('salons')
        .insert({
          name: values.salonName,
          description: values.description,
          location: location,
          services: formattedServices,
          rating: 5.0, // Default rating for new salons
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating salon:', error);
        toast({
          title: "Error",
          description: "Failed to create salon. Please try again.",
          variant: "destructive",
        });
        return;
      }

      console.log('Salon created successfully:', salon);
      
      toast({
        title: "Success",
        description: "Your salon has been listed successfully.",
      });
      
      // Redirect to salon admin dashboard
      navigate('/salon-admin');
    } catch (error) {
      console.error('Error in form submission:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="mr-4"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-3xl font-bold">List Your Salon</h1>
      </div>
      <div className="max-w-4xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <BasicDetailsSection form={form} />
            <ServicesSection form={form} />
            <StaffSection form={form} />
            <GalleryUpload form={form} />
            <BookingFeatures form={form} />
            <PromotionsSection form={form} />
            <AccessibilitySection form={form} />
            <Button 
              type="submit" 
              className="w-full"
              onClick={() => console.log("Submit button clicked")}
            >
              Submit Salon Listing
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
