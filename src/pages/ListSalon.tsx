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
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  zipCode: z.string().min(5, { message: "Valid ZIP code is required" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  website: z.string().url().optional(),
  socialMedia: z.string().optional(),
  operatingHours: z.string().min(1, { message: "Operating hours are required" }),
  googleMapsLink: z.string().url().optional(),
  services: z.array(z.object({
    name: z.string(),
    description: z.string(),
    price: z.string(),
    duration: z.string(),
    experts: z.array(z.string())
  })),
  staff: z.array(z.object({
    name: z.string(),
    role: z.string(),
    expertise: z.array(z.string()),
    image: z.any().optional(),
    rating: z.number().min(0).max(5)
  })),
  salonImages: z.any().array(),
  parkingImages: z.any().array(),
  onlineBooking: z.boolean(),
  cancellationPolicy: z.string(),
  waitlistOptions: z.boolean(),
  currentOffers: z.string(),
  membershipPlans: z.string(),
  parkingInfo: z.string(),
  accessibilityFeatures: z.string(),
  paymentMethods: z.string(),
  safetyMeasures: z.array(z.string()),
});

export default function ListSalon() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      salonName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      email: "",
      website: "",
      socialMedia: "",
      operatingHours: "",
      googleMapsLink: "",
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
      // Insert salon data into Supabase
      const { data: salon, error } = await supabase
        .from('salons')
        .insert([
          {
            name: values.salonName,
            description: values.description || '',
            location: `${values.address}, ${values.city}, ${values.state}`,
            image_url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80", // Default image
            rating: 5.0,
            services: values.services?.map(s => s.name) || [],
          }
        ])
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Salon Registration Successful",
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
