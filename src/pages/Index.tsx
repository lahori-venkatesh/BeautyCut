import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturedSalons } from "@/components/FeaturedSalons";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <FeaturedSalons />
      <Footer />
    </div>
  );
};

export default Index;