import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { GalleryUpload } from "@/components/salon/GalleryUpload";
import { BookingFeatures } from "@/components/salon/BookingFeatures";
import { PromotionsSection } from "@/components/salon/PromotionsSection";
import { AccessibilitySection } from "@/components/salon/AccessibilitySection";
import { ServicesSection } from "@/components/salon/ServicesSection";
import { StaffSection } from "@/components/salon/StaffSection";
import { BasicDetailsSection } from "@/components/salon/BasicDetailsSection";
import { useAuth } from "@/contexts/AuthContext";
import { SalonOwnerSignUp } from "@/components/SalonOwnerSignUp";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  salonName: z.string().min(2, { message: "Salon name must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  zipCode: z.string().min(5, { message: "Valid ZIP code is required" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  operatingHours: z.string().min(1, { message: "Operating hours are required" }),
  services: z.array(z.object({
    name: z.string().min(1, "Service name is required"),
    description: z.string().min(1, "Service description is required"),
    price: z.string().min(1, "Price is required"),
    duration: z.string().min(1, "Duration is required"),
    experts: z.array(z.string())
  })).min(1, "At least one service is required"),
  staff: z.array(z.object({
    name: z.string(),
    role: z.string(),
    expertise: z.array(z.string()),
    image: z.any().optional(),
    rating: z.number().min(0).max(5)
  })),
  salonImages: z.array(z.any()).min(1, "At least one salon image is required"),
  parkingImages: z.array(z.any()),
  parkingInfo: z.string().min(1, "Parking information is required"),
  accessibilityFeatures: z.string().min(1, "Accessibility features are required"),
  paymentMethods: z.string().min(1, "Payment methods are required"),
  cancellationPolicy: z.string().min(1, "Cancellation policy is required"),
  currentOffers: z.string().optional(),
  membershipPlans: z.string().optional(),
  onlineBooking: z.boolean().optional(),
  waitlistOptions: z.boolean().optional(),
  safetyMeasures: z.array(z.string()).optional(),
});

export default function ListSalon() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log("Current user:", user);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      salonName: "",
      description: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      email: "",
      operatingHours: "",
      services: [],
      staff: [],
      salonImages: [],
      parkingImages: [],
      onlineBooking: false,
      waitlistOptions: false,
      cancellationPolicy: "",
      currentOffers: "",
      membershipPlans: "",
      parkingInfo: "",
      accessibilityFeatures: "",
      paymentMethods: "",
      safetyMeasures: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted with values:", values);
    
    try {
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
      
      // Navigate to the salon admin dashboard
      navigate("/salon-admin");
    } catch (error) {
      console.error('Error submitting salon:', error);
      toast({
        title: "Error",
        description: "Failed to submit salon listing. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!user || user.role !== 'salon_owner') {
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
        <div className="max-w-md mx-auto">
          <SalonOwnerSignUp />
        </div>
      </div>
    );
  }

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