import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { BookingCalendar } from "@/components/admin/BookingCalendar";
import { PromoCodeManager } from "@/components/admin/PromoCodeManager";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export default function SalonAdminDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [salonData, setSalonData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const fetchSalonData = async () => {
      try {
        console.log('Fetching salon data for owner:', user.id);
        const { data, error } = await supabase
          .from('salons')
          .select('*')
          .single();

        if (error) {
          console.error('Error fetching salon data:', error);
          toast({
            title: "Error",
            description: "Failed to load salon data. Please try again.",
            variant: "destructive",
          });
          return;
        }

        console.log('Salon data fetched:', data);
        setSalonData(data);
      } catch (error) {
        console.error('Error in fetchSalonData:', error);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSalonData();
  }, [user, navigate, toast]);

  const handleEditSalon = () => {
    navigate("/list-salon", { state: { salonData } });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (!salonData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">No Salon Found</h2>
          <Button onClick={() => navigate("/list-salon")}>Create Salon</Button>
        </div>
      </div>
    );
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