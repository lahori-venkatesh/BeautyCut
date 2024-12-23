import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { BookingCalendar } from "@/components/admin/BookingCalendar";
import { useAuth } from "@/contexts/AuthContext";

export default function SalonAdminDashboard() {
  console.log("Rendering SalonAdminDashboard page");
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user || user.role !== 'salon_owner') {
    navigate('/');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="mr-4"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-3xl font-bold">Salon Dashboard</h1>
      </div>

      <div className="space-y-8">
        <DashboardStats />
        
        <div className="grid gap-4 md:grid-cols-4">
          <BookingCalendar />
        </div>
      </div>
    </div>
  );
}