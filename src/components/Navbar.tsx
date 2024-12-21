import { Button } from "@/components/ui/button";
import { Scissors, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();

  const handleSignUp = () => {
    toast({
      title: "Sign Up",
      description: "Sign up functionality coming soon!",
    });
  };

  const handleListSalon = () => {
    toast({
      title: "List Your Salon",
      description: "Salon listing functionality coming soon!",
    });
  };

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Scissors className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">BeautyCut</span>
          </Link>
          
          {/* Mobile menu button */}
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

          {/* Desktop Navigation */}
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

          {/* Desktop Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            <Button variant="outline" onClick={handleListSalon}>
              List Your Salon
            </Button>
            <Button onClick={handleSignUp}>
              Sign Up
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
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
            <Button onClick={handleSignUp} className="w-full justify-start">
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};