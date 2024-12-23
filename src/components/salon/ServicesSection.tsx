import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Plus, Trash2 } from "lucide-react";

export function ServicesSection({ form }: { form: any }) {
  console.log("Rendering ServicesSection component");

  const addService = () => {
    const currentServices = form.getValues("services") || [];
    form.setValue("services", [
      ...currentServices,
      { name: "", description: "", price: "", duration: "", experts: [] }
    ]);
  };

  const removeService = (index: number) => {
    const currentServices = form.getValues("services") || [];
    form.setValue("services", currentServices.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Services</h3>
        <Button type="button" onClick={addService} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      {form.watch("services")?.map((_, index) => (
        <div key={index} className="space-y-4 p-4 border rounded-lg">
          <div className="flex justify-end">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeService(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <FormField
            control={form.control}
            name={`services.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Haircut" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`services.${index}.description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe the service..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name={`services.${index}.price`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., ₹500" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`services.${index}.duration`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 45 mins" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
}