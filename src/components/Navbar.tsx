import { Button } from "@/components/ui/button";
import { Scissors } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Scissors className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-primary">BeautyCut</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/salons">Find Salons</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/about">About</Link>
          </Button>
          <Button asChild>
            <Link to="/register">Register Salon</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};