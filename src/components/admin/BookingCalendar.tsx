import React from "react";
import { Calendar } from "../ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function BookingCalendar() {
  console.log("Rendering BookingCalendar component");
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Booking Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </CardContent>
    </Card>
  );
}