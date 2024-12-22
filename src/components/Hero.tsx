import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Search, Calendar, Star, Scissors } from "lucide-react";

export const Hero = () => {
  const navigate = useNavigate();

  const handleListSalon = () => {
    navigate('/list-salon');
  };

  return (
    <div className="relative">
      <div className="bg-primary text-white py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 animate-fadeIn">
              Your Perfect Salon Experience Starts Here
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200 animate-fadeIn">
              Discover, book, and experience the best beauty services in your area
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-8 md:mb-16">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 animate-fadeIn w-full md:w-auto"
                onClick={() => navigate('/salons')}
              >
                Find Salons
              </Button>
              <Button
                size="lg"
                className="bg-transparent text-white border border-white animate-fadeIn w-full md:w-auto"
                onClick={handleListSalon}
              >
                List Your Salon
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
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