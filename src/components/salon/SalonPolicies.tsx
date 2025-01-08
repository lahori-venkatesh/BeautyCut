import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

interface SalonPoliciesProps {
  form: any;
}

export function SalonPolicies({ form }: SalonPoliciesProps) {
  console.log("Rendering SalonPolicies component");

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Salon Policies</h3>
      
      <FormField
        control={form.control}
        name="hygienePolicies"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Hygiene and Safety Policies</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe your salon's hygiene and safety measures..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="appointmentPolicies"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Appointment Policies</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe your appointment booking and cancellation policies..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}