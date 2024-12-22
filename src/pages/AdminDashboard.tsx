import React from "react";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { BookingCalendar } from "@/components/admin/BookingCalendar";
import { PromoCodeManager } from "@/components/admin/PromoCodeManager";

export default function AdminDashboard() {
  console.log("Rendering AdminDashboard page");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Salon Dashboard</h1>
      
      <div className="space-y-8">
        <DashboardStats />
        
        <div className="grid gap-4 md:grid-cols-4">
          <BookingCalendar />
          <PromoCodeManager />
        </div>
      </div>
    </div>
  );
}