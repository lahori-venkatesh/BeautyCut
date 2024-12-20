import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="relative bg-primary text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold mb-6 animate-fadeIn">
            Find Your Perfect Salon Experience
          </h1>
          <p className="text-xl mb-8 text-gray-200 animate-fadeIn">
            Discover top-rated salons, book appointments, and transform your look with ease.
          </p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-gray-100 animate-fadeIn"
            asChild
          >
            <Link to="/salons">Explore Salons</Link>
          </Button>
        </div>
      </div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10"></div>
    </div>
  );
};