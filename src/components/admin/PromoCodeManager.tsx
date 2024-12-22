import React from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";

export function PromoCodeManager() {
  console.log("Rendering PromoCodeManager component");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Promo Codes</CardTitle>
        <CardDescription>Manage your promotional offers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input placeholder="Enter promo code" />
            <Button>Add</Button>
          </div>
          <div className="rounded-md border">
            <div className="p-4">
              <p className="text-sm text-muted-foreground">No active promo codes</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}