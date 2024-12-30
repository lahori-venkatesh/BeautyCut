import { Link } from "react-router-dom";

export const Footer = () => {
  return (
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
};