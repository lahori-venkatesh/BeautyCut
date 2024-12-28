import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import ListSalon from "./pages/ListSalon";
import SignUp from "./pages/SignUp";
import Salons from "./pages/Salons";
import Profile from "./pages/Profile";
import MyBookings from "./pages/MyBookings";
import Favorites from "./pages/Favorites";
import SalonAdminDashboard from "./pages/SalonAdminDashboard";
import { useAuth } from "./contexts/AuthContext";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode, requiredRole?: 'user' | 'salon_owner' }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/salons" element={<Salons />} />
            <Route path="/about" element={<Index />} />
            <Route 
              path="/list-salon" 
              element={
                <ProtectedRoute requiredRole="salon_owner">
                  <ListSalon />
                </ProtectedRoute>
              } 
            />
            <Route path="/signup" element={<SignUp />} />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/bookings" 
              element={
                <ProtectedRoute>
                  <MyBookings />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/favorites" 
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/salon-admin" 
              element={
                <ProtectedRoute requiredRole="salon_owner">
                  <SalonAdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;