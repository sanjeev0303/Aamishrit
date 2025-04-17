"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserOrders, getCurrentUser } from "@/Dummies/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package } from "lucide-react";
import EmptyState from "@/components/global/empty-state";
export default function OrdersPage() {
  const router = useRouter();

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  const { data: orders = [], isLoading: isLoadingOrders } = useQuery({
    queryKey: ["userOrders", user?.id],
    queryFn: () => (user ? getUserOrders(user.id) : Promise.resolve([])),
    enabled: !!user,
  });

  if (isLoadingUser || isLoadingOrders) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 w-1/4 rounded"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-40 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12">
        <EmptyState
          title="Sign in to view your orders"
          description="Please sign in to view your order history."
          icon="user"
          action={
            <Button onClick={() => router.push("/sign-in")}>Sign In</Button>
          }
        />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 lg:pt-20 w-full h-screen flex items-center justify-center">
        <EmptyState
          title="No orders found"
          description="You haven't placed any orders yet."
          icon="shopping-bag"
          action={
            <Button
              onClick={() => router.push("/")}
              className="bg-brown-400 text-brown-700 hover:bg-brown-300 hover:text-brown-800"
            >
              Start Shopping
            </Button>
          }
        />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 lg:pt-20">
      <h1 className="text-3xl font-bold mb-8 text-brown-heading">
        Your Orders
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id} className="overflow-hidden">
            <CardHeader className="bg-gray-50">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                  <p className="text-sm text-gray-500">
                    Placed on {order.date}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Badge
                    className={`${getStatusColor(order.status)} capitalize`}
                  >
                    {order.status}
                  </Badge>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/orders/${order.id}`}>View Order Details</Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-medium text-sm text-gray-500 mb-2">
                      Items
                    </h3>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-gray-400" />
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-gray-500 mb-2">
                      Shipping Address
                    </h3>
                    <p className="text-sm">
                      {order.shippingAddress.fullName},{" "}
                      {order.shippingAddress.addressLine1},{" "}
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state},{" "}
                      {order.shippingAddress.pinCode}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-gray-500 mb-2">
                      Order Summary
                    </h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>₹{order.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span>₹{order.shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax:</span>
                        <span>₹{order.tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Total:</span>
                        <span>₹{order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
