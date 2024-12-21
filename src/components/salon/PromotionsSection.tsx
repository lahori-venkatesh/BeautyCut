import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

export function PromotionsSection({ form }: { form: any }) {
  console.log("Rendering PromotionsSection component");

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Promotions and Discounts</h3>
      
      <FormField
        control={form.control}
        name="currentOffers"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Current Offers</FormLabel>
            <FormControl>
              <Textarea
                placeholder="List your ongoing discounts and special packages..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="membershipPlans"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Membership Plans</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe your membership plans and benefits..."
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