import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { GalleryUpload } from "@/components/salon/GalleryUpload";
import { BookingFeatures } from "@/components/salon/BookingFeatures";
import { PromotionsSection } from "@/components/salon/PromotionsSection";
import { AccessibilitySection } from "@/components/salon/AccessibilitySection";
import { ServicesSection } from "@/components/salon/ServicesSection";
import { StaffSection } from "@/components/salon/StaffSection";

const formSchema = z.object({
  // Basic Details
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

  // Services
  services: z.array(z.object({
    name: z.string(),
    description: z.string(),
    price: z.string(),
    duration: z.string(),
    experts: z.array(z.string())
  })),

  // Staff
  staff: z.array(z.object({
    name: z.string(),
    role: z.string(),
    expertise: z.array(z.string()),
    image: z.any().optional(),
    rating: z.number().min(0).max(5)
  })),

  // Gallery
  salonImages: z.any().array(),
  parkingImages: z.any().array(),

  // Booking Features
  onlineBooking: z.boolean(),
  cancellationPolicy: z.string(),
  waitlistOptions: z.boolean(),

  // Promotions
  currentOffers: z.string(),
  membershipPlans: z.string(),

  // Accessibility
  parkingInfo: z.string(),
  accessibilityFeatures: z.string(),
  paymentMethods: z.string(),

  // Safety Measures
  safetyMeasures: z.array(z.string()),
});

export default function ListSalon() {
  const { toast } = useToast();
  const navigate = useNavigate();
  
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted with values:", values);
    
    // Here you would typically send the data to your backend
    // For now, we'll just show a success message
    toast({
      title: "Salon Registration Successful",
      description: "Your salon has been listed successfully.",
    });
    
    // Navigate to the salons page where the new listing should appear
    navigate("/salons");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">List Your Salon</h1>
      <div className="max-w-4xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
              <h2 className="text-xl font-semibold mb-4">Basic Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="salonName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salon Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter salon name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter street address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter state" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter ZIP code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="operatingHours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Operating Hours</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Mon-Fri: 9AM-7PM" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <ServicesSection form={form} />
            <StaffSection form={form} />
            <GalleryUpload form={form} />
            <BookingFeatures form={form} />
            <PromotionsSection form={form} />
            <AccessibilitySection form={form} />

            <Button type="submit" className="w-full">Submit Salon Listing</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}