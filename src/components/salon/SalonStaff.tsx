import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

export const SalonStaff = ({ salon }: { salon: any }) => {
  console.log("Rendering SalonStaff component");
  
  const mockStaff = [
    {
      name: "John Smith",
      role: "Senior Hairstylist",
      expertise: ["Haircuts", "Coloring", "Styling"],
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
    },
    {
      name: "Sarah Johnson",
      role: "Makeup Artist",
      expertise: ["Bridal Makeup", "Party Makeup", "SFX"],
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    {
      name: "Mike Wilson",
      role: "Spa Specialist",
      expertise: ["Massage", "Facials", "Body Treatments"],
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    }
  ];

  return (
    <div className="space-y-4">
      {mockStaff.map((staff, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex items-start gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={staff.image} />
                <AvatarFallback>{staff.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between">
                  <CardTitle>{staff.name}</CardTitle>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm">{staff.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500">{staff.role}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {staff.expertise.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-secondary text-xs rounded-full text-primary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};