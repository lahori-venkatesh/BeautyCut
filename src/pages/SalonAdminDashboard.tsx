import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { BookingCalendar } from "@/components/admin/BookingCalendar";
import { PromoCodeManager } from "@/components/admin/PromoCodeManager";

export default function SalonAdminDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [salonData, setSalonData] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    // Load salon data for the current owner
    const allSalons = JSON.parse(localStorage.getItem('salons') || '[]');
    const ownerSalon = allSalons.find((salon: any) => salon.ownerId === user.id);
    setSalonData(ownerSalon);
  }, [user, navigate]);

  const handleEditSalon = () => {
    navigate("/list-salon", { state: { salonData } });
  };

  if (!salonData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Salon Admin Dashboard</h1>
        <Button onClick={handleEditSalon}>Edit Salon Details</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DashboardStats />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Upcoming Bookings</h2>
          <BookingCalendar />
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Promotions</h2>
          <PromoCodeManager />
        </div>
      </div>
    </div>
  );
}