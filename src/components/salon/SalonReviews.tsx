import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";

export const SalonReviews = ({ salon }: { salon: any }) => {
  console.log("Rendering SalonReviews component");
  
  const mockReviews = [
    {
      user: "Alice Brown",
      rating: 5,
      date: "2024-02-15",
      comment: "Amazing service! The staff was very professional and friendly.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
    },
    {
      user: "Bob Wilson",
      rating: 4,
      date: "2024-02-10",
      comment: "Great experience overall. Will definitely come back.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
    },
    {
      user: "Carol Martinez",
      rating: 5,
      date: "2024-02-05",
      comment: "Best salon in the city! Love the ambiance and service.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    }
  ];

  return (
    <div className="space-y-4">
      {mockReviews.map((review, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={review.image} />
                <AvatarFallback>{review.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{review.user}</h3>
                  <div className="flex items-center">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{review.comment}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};