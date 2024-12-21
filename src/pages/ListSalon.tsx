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
  serviceCategories: z.string().min(1, { message: "At least one service category is required" }),
  serviceList: z.string().min(1, { message: "Service list is required" }),
  priceRange: z.string().min(1, { message: "Price range is required" }),
  customPackages: z.string().optional(),

  // Staff
  staffProfiles: z.string().optional(),
  certifications: z.string().optional(),
  specialtyServices: z.string().optional(),

  // New fields
  salonImages: z.any().optional(),
  parkingImages: z.any().optional(),
  onlineBooking: z.boolean().default(false),
  cancellationPolicy: z.string().min(1, { message: "Cancellation policy is required" }),
  waitlistOptions: z.boolean().default(false),
  currentOffers: z.string().optional(),
  membershipPlans: z.string().optional(),
  parkingInfo: z.string().optional(),
  accessibilityFeatures: z.string().optional(),
  paymentMethods: z.string().min(1, { message: "Payment methods are required" }),
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
      serviceCategories: "",
      serviceList: "",
      priceRange: "",
      customPackages: "",
      staffProfiles: "",
      certifications: "",
      specialtyServices: "",
      salonImages: undefined,
      parkingImages: undefined,
      onlineBooking: false,
      waitlistOptions: false,
      cancellationPolicy: "",
      currentOffers: "",
      membershipPlans: "",
      parkingInfo: "",
      accessibilityFeatures: "",
      paymentMethods: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted with values:", values);
    toast({
      title: "Salon Registration Successful",
      description: "We'll review your application and get back to you soon.",
    });
    navigate("/");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">List Your Salon</h1>
      <div className="max-w-4xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Details Section */}
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

            {/* New Sections */}
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
