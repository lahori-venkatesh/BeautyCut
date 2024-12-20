import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { SalonCard } from "@/components/SalonCard";

const FEATURED_SALONS = [
  {
    name: "Elegance Hair Studio",
    image: "/placeholder.svg",
    rating: 4.8,
    location: "Downtown, NYC",
    services: ["Haircut", "Color", "Styling"],
  },
  {
    name: "Pure Beauty Spa",
    image: "/placeholder.svg",
    rating: 4.9,
    location: "Brooklyn, NYC",
    services: ["Facial", "Massage", "Nails"],
  },
  {
    name: "Modern Cuts",
    image: "/placeholder.svg",
    rating: 4.7,
    location: "Queens, NYC",
    services: ["Haircut", "Beard Trim", "Styling"],
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Salons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_SALONS.map((salon) => (
            <SalonCard key={salon.name} {...salon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;