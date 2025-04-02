import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type OrderItemProps = {
  orderItems: any;
};

const OrderItem = ({ orderItems }: OrderItemProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200";
      case "Processing":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case "Shipped":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <Card
      key={orderItems.id}
      className="overflow-hidden border-[#D4B08C] bg-[#FDF7F0]"
    >
      <CardContent className="p-0">
        <div className="p-4 md:p-6 bg-[#F8F2E9]">
          <h4 className="font-medium text-[#6B4226] mb-4">Order Items</h4>
          <div className="space-y-4">
            {orderItems.items.map((item: any) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-3 rounded-lg bg-white border border-[#E6D5C1]"
              >
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
                <div className="flex-grow">
                  <h5 className="font-medium text-[#6B4226]">{item.name}</h5>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1 text-sm text-[#8B5A2B]">
                    <p>Price: {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="hidden md:block">
                  <Badge className={`${getStatusColor(orderItems.status)}`}>
                    {orderItems.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="mt-6 p-4 rounded-lg bg-white border border-[#E6D5C1]">
            <h4 className="font-medium text-[#6B4226] mb-2">Order Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#8B5A2B]">Subtotal</span>
                <span className="text-[#6B4226]">{orderItems.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8B5A2B]">Shipping</span>
                <span className="text-[#6B4226]">Free</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E6D5C1]">
                <span className="font-medium text-[#6B4226]">Total</span>
                <span className="font-medium text-[#6B4226]">
                  {orderItems.total}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={"/track-order"}>
            <Button className="bg-[#8B5A2B] hover:bg-[#6B4226] text-white">
              Track Order
            </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
