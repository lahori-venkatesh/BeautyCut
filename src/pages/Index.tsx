import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { FeaturedSalons } from "@/components/FeaturedSalons";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => (
  <footer className="bg-gray-50 border-t">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">For Customers</h3>
          <ul className="space-y-2">
            <li><Link to="/salons" className="text-gray-600 hover:text-primary">Find Salons</Link></li>
            <li><Link to="/about" className="text-gray-600 hover:text-primary">How it Works</Link></li>
            <li><Link to="/support" className="text-gray-600 hover:text-primary">Customer Support</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">For Salon Owners</h3>
          <ul className="space-y-2">
            <li><Link to="/register" className="text-gray-600 hover:text-primary">List Your Salon</Link></li>
            <li><Link to="/business" className="text-gray-600 hover:text-primary">Business Dashboard</Link></li>
            <li><Link to="/resources" className="text-gray-600 hover:text-primary">Resources</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Company</h3>
          <ul className="space-y-2">
            <li><Link to="/about" className="text-gray-600 hover:text-primary">About Us</Link></li>
            <li><Link to="/careers" className="text-gray-600 hover:text-primary">Careers</Link></li>
            <li><Link to="/contact" className="text-gray-600 hover:text-primary">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><Link to="/privacy" className="text-gray-600 hover:text-primary">Privacy Policy</Link></li>
            <li><Link to="/terms" className="text-gray-600 hover:text-primary">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t mt-12 pt-8 text-center text-gray-600">
        <p>&copy; 2024 BeautyCut. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Salons in Hyderabad & Bangalore</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover top-rated salons in your city, from classic barbershops to luxury spa experiences
          </p>
        </div>
        <FeaturedSalons />
        <div className="text-center mt-12">
          <Button size="lg" onClick={() => navigate('/salons')}>
            View All Salons
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
