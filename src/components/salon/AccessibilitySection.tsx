import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

export function AccessibilitySection({ form }: { form: any }) {
  console.log("Rendering AccessibilitySection component");

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Accessibility and Convenience</h3>
      
      <FormField
        control={form.control}
        name="parkingInfo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Parking Information</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Details about parking availability or valet services..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="accessibilityFeatures"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Accessibility Features</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe wheelchair accessibility and other inclusivity features..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="paymentMethods"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Payment Methods</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g., Cash, Cards, UPI, Digital Wallets"
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