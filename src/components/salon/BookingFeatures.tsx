import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";

export function BookingFeatures({ form }: { form: any }) {
  console.log("Rendering BookingFeatures component");

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Booking Features</h3>
      
      <FormField
        control={form.control}
        name="onlineBooking"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Enable Online Booking</FormLabel>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="cancellationPolicy"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cancellation Policy</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe your cancellation and rescheduling policy..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="waitlistOptions"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Enable Waitlist</FormLabel>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}