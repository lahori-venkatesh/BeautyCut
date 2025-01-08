import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SalonInfo } from "./SalonInfo";
import { SalonServices } from "./SalonServices";
import { SalonStaff } from "./SalonStaff";
import { SalonReviews } from "./SalonReviews";
import { SalonPolicies } from "./SalonPolicies";
import { useForm } from "react-hook-form";

interface SalonDetailsModalProps {
  salon: any;
  isOpen: boolean;
  onClose: () => void;
}

export const SalonDetailsModal = ({ salon, isOpen, onClose }: SalonDetailsModalProps) => {
  console.log("Rendering SalonDetailsModal for salon:", salon?.name);
  
  const form = useForm({
    defaultValues: {
      hygienePolicies: "",
      appointmentPolicies: ""
    }
  });
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{salon?.name}</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info">
            <SalonInfo salon={salon} />
          </TabsContent>
          
          <TabsContent value="services">
            <SalonServices salon={salon} />
          </TabsContent>
          
          <TabsContent value="staff">
            <SalonStaff salon={salon} />
          </TabsContent>
          
          <TabsContent value="reviews">
            <SalonReviews salon={salon} />
          </TabsContent>
          
          <TabsContent value="policies">
            <SalonPolicies form={form} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};