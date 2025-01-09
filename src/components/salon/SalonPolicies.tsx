import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Calendar, Shield, Car } from "lucide-react";

export const SalonPolicies = ({ salon }: { salon: any }) => {
  console.log("Rendering SalonPolicies component");
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            <CardTitle>Payment Options</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            <li>Cash</li>
            <li>Credit/Debit Cards</li>
            <li>UPI Payments</li>
            <li>Digital Wallets</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <CardTitle>Cancellation Policy</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Free cancellation up to 2 hours before appointment.
            Late cancellations may incur a 50% charge.
            No-shows will be charged full amount.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <CardTitle>Safety Measures</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            <li>Regular sanitization of equipment</li>
            <li>Staff wearing protective gear</li>
            <li>Temperature checks for staff and customers</li>
            <li>Social distancing measures</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-primary" />
            <CardTitle>Parking & Accessibility</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            <li>Free parking available</li>
            <li>Wheelchair accessible</li>
            <li>Elevator access</li>
            <li>Restroom accessibility</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};