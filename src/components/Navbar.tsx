import { Button } from "@/components/ui/button";
import { Scissors } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Scissors className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-primary">BeautyCut</span>
        </Link>
        <div className="flex-1 flex items-center justify-center space-x-6">
          <Button variant="ghost" asChild>
            <Link to="/salons">Find Salons</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/about">About</Link>
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" asChild>
            <Link to="/register">List Your Salon</Link>
          </Button>
          <Button asChild>
            <Link to="/register">Sign Up</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};