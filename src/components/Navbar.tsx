import { Button } from "@/components/ui/button";
import { Scissors, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthDialog } from "./AuthDialog";
import { UserMenu } from "./UserMenu";
import { useAuth } from "@/contexts/AuthContext";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authRole, setAuthRole] = useState<'user' | 'salon_owner'>('user');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // If user is a salon owner, redirect to admin dashboard
    if (user && user.role === 'salon_owner') {
      navigate('/salon-admin');
    }
  }, [user, navigate]);

  const handleListSalon = () => {
    if (!user) {
      setAuthRole('salon_owner');
      setIsAuthOpen(true);
    } else if (user.role === 'salon_owner') {
      navigate('/salon-admin');
    } else {
      // If regular user tries to list salon, prompt them to register as salon owner
      setAuthRole('salon_owner');
      setIsAuthOpen(true);
    }
  };

  const handleSignUp = (role: 'user' | 'salon_owner' = 'user') => {
    setAuthRole(role);
    setIsAuthOpen(true);
  };

  // Don't show regular navigation items for salon owners
  if (user?.role === 'salon_owner') {
    return (
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/salon-admin" className="flex items-center space-x-2">
              <Scissors className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">BeautyCut</span>
            </Link>
            <UserMenu />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Scissors className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">BeautyCut</span>
          </Link>
          
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          <div className="hidden md:flex md:items-center md:space-x-2">
            <Button variant="ghost" asChild className="text-base">
              <Link to="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild className="text-base">
              <Link to="/salons">Find Salons</Link>
            </Button>
            <Button variant="ghost" asChild className="text-base">
              <Link to="/about">About</Link>
            </Button>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-2">
            <Button variant="outline" onClick={handleListSalon}>
              List Your Salon
            </Button>
            {user ? (
              <UserMenu />
            ) : (
              <Button onClick={() => handleSignUp('user')}>Sign Up</Button>
            )}
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 space-y-2">
            <Button variant="ghost" asChild className="w-full justify-start">
              <Link to="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild className="w-full justify-start">
              <Link to="/salons">Find Salons</Link>
            </Button>
            <Button variant="ghost" asChild className="w-full justify-start">
              <Link to="/about">About</Link>
            </Button>
            <Button variant="outline" onClick={handleListSalon} className="w-full justify-start">
              List Your Salon
            </Button>
            {user ? (
              <Button variant="ghost" onClick={() => navigate("/profile")} className="w-full justify-start">
                My Profile
              </Button>
            ) : (
              <Button onClick={() => handleSignUp('user')} className="w-full justify-start">
                Sign Up
              </Button>
            )}
          </div>
        )}
      </div>
      <AuthDialog 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        defaultRole={authRole}
        onSuccess={(role) => {
          if (role === 'salon_owner') {
            navigate('/list-salon');
          }
        }} 
      />
    </nav>
  );
};