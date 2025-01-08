import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { BasicDetailsSection } from "@/components/salon/BasicDetailsSection";
import { ServicesSection } from "@/components/salon/ServicesSection";
import { StaffSection } from "@/components/salon/StaffSection";
import { GalleryUpload } from "@/components/salon/GalleryUpload";
import { AccessibilitySection } from "@/components/salon/AccessibilitySection";
import { BookingFeatures } from "@/components/salon/BookingFeatures";
import { PromotionsSection } from "@/components/salon/PromotionsSection";
import { SalonPolicies } from "@/components/salon/SalonPolicies";

// Form schema
const formSchema = z.object({
  salonName: z.string().min(2, "Salon name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
  operatingHours: z.string().optional(),
  services: z.array(
    z.object({
      name: z.string(),
      price: z.number(),
      duration: z.number(),
    })
  ),
  staffMembers: z.array(
    z.object({
      name: z.string(),
      role: z.string(),
      experience: z.string(),
    })
  ).optional(),
  salonImages: z.any().optional(),
  parkingImages: z.any().optional(),
  parkingInfo: z.string().optional(),
  accessibilityFeatures: z.string().optional(),
  paymentMethods: z.string().optional(),
  onlineBooking: z.boolean().optional(),
  cancellationPolicy: z.string().optional(),
  waitlistOptions: z.boolean().optional(),
  currentOffers: z.string().optional(),
  membershipPlans: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ListSalon() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      services: [],
      staffMembers: [],
      onlineBooking: false,
      waitlistOptions: false,
    },
  });

  console.log("Form values:", form.watch());

  const onSubmit = async (values: FormValues) => {
    try {
      console.log("Form submitted with values:", values);

      // Format the location string
      const location = `${values.address}, ${values.city}, ${values.state} ${values.zipCode}`;
      
      // Format services array to include full service objects
      const formattedServices = values.services.map(service => ({
        name: service.name,
        price: service.price,
        duration: service.duration
      }));

      console.log('Attempting to insert salon with location:', location);
      console.log('Formatted services:', formattedServices);
      
      // Insert salon data into Supabase
      const { data: salon, error } = await supabase
        .from('salons')
        .insert({
          name: values.salonName,
          description: values.cancellationPolicy || '',
          location: location,
          services: formattedServices,
          rating: 5.0, // Default rating for new salons
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating salon:', error);
        throw error;
      }

      console.log('Salon created successfully:', salon);

      toast({
        title: "Success!",
        description: "Your salon has been listed successfully.",
      });

      // Redirect to the salon's page
      navigate(`/salon/${salon.id}`);
    } catch (error) {
      console.error('Error in form submission:', error);
      toast({
        title: "Error",
        description: "There was an error listing your salon. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">List Your Salon</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8">
              <BasicDetailsSection form={form} />
              <ServicesSection form={form} />
              <StaffSection form={form} />
              <GalleryUpload form={form} />
              <AccessibilitySection form={form} />
              <BookingFeatures form={form} />
              <PromotionsSection form={form} />
              <SalonPolicies form={form} />
            </div>
            <Button type="submit" className="w-full">
              List Salon
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}