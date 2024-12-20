import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, Calendar, Star, Scissors } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative">
      <div className="bg-primary text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 animate-fadeIn">
              Your Perfect Salon Experience Starts Here
            </h1>
            <p className="text-xl mb-8 text-gray-200 animate-fadeIn">
              Discover, book, and experience the best beauty services in your area
            </p>
            <div className="flex justify-center gap-4 mb-16">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 animate-fadeIn"
                asChild
              >
                <Link to="/salons">Find Salons</Link>
              </Button>
              <Button
                size="lg"
                className="bg-transparent text-white border border-white animate-fadeIn"
                asChild
              >
                <Link to="/register">List Your Salon</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
              <Search className="h-10 w-10 mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">Easy Discovery</h3>
              <p className="text-gray-600 text-center">Find the perfect salon near you</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
              <Calendar className="h-10 w-10 mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">Online Booking</h3>
              <p className="text-gray-600 text-center">Book appointments 24/7</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
              <Star className="h-10 w-10 mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">Verified Reviews</h3>
              <p className="text-gray-600 text-center">Read authentic customer feedback</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
              <Scissors className="h-10 w-10 mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">Top Services</h3>
              <p className="text-gray-600 text-center">Experience quality treatments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};