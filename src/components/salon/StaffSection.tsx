import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";

export function StaffSection({ form }: { form: any }) {
  console.log("Rendering StaffSection component");

  const addStaffMember = () => {
    const currentStaff = form.getValues("staff") || [];
    form.setValue("staff", [
      ...currentStaff,
      { name: "", role: "", expertise: [], image: null, rating: 5 }
    ]);
  };

  const removeStaffMember = (index: number) => {
    const currentStaff = form.getValues("staff") || [];
    form.setValue("staff", currentStaff.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Staff Members</h3>
        <Button type="button" onClick={addStaffMember} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Staff Member
        </Button>
      </div>

      {form.watch("staff")?.map((_, index) => (
        <div key={index} className="space-y-4 p-4 border rounded-lg">
          <div className="flex justify-end">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeStaffMember(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <FormField
            control={form.control}
            name={`staff.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Staff member name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`staff.${index}.role`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Senior Hairstylist" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`staff.${index}.image`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      field.onChange(file);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}
    </div>
  );
}