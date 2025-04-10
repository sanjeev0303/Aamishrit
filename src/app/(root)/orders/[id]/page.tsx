"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Order } from "@/types";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [order] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState("")

  useEffect(() => {
   const fetchId = async () => {
    const { id } = await params;
    setId(id);
   }
   fetchId()
  }, [params])


  useEffect(() => {
    // In a real app, we would fetch the order from the API
    // For this demo, we'll create a mock order
    // const mockOrder: Order = {
    //   id: params.id,
    //   items: [
    //     {
    //       id: "prod_1",
    //       name: "Wireless Headphones",
    //       price: 2499,
    //       quantity: 1,
    //       images: ["/placeholder.svg?height=64&width=64"],
    //     },
    //     {
    //       id: "prod_2",
    //       name: "Smart Watch",
    //       price: 3999,
    //       quantity: 1,
    //       images: ["/placeholder.svg?height=64&width=64"],
    //     },
    //   ],
    //   shippingAddress: {
    //     id: "addr_1",
    //     fullName: "John Doe",
    //     mobileNumber: "9876543210",
    //     addressLine1: "123 Main Street",
    //     addressLine2: "Apartment 4B",
    //     landmark: "Near Central Park",
    //     city: "Mumbai",
    //     state: "Maharashtra",
    //     pinCode: "400001",
    //     country: "India",
    //     isDefault: true,
    //     userId: "user_123",
    //   },
    //   paymentInfo: {
    //     method: "cod",
    //   },
    //   subtotal: 6498,
    //   shipping: 0,
    //   tax: 454.86,
    //   total: 6952.86,
    //   status: "confirmed",
    //   createdAt: new Date().toISOString(),
    // }

    // Simulate API call
    setTimeout(() => {
      //   setOrder(mockOrder)
      setIsLoading(false);
    }, 1000);
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4 max-w-3xl mx-auto">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          {/* <p className="mb-6">We couldn't find the order you're looking for.</p> */}
          <Button onClick={() => router.push("/")}>Return to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold">Order Confirmed!</h1>
          <p className="text-gray-600 mt-2">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          <p className="font-medium mt-1">Order #{order.id}</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    {/* <Image src={item.images[] || "/placeholder.svg"} alt={item.name} fill className="object-cover" /> */}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <Link
                        href={`/product/${item.id}`}
                        className="font-medium hover:underline"
                      >
                        {item.name}
                      </Link>
                      <span className="font-medium">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      ₹{item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>
                    {order.shipping === 0
                      ? "Free"
                      : `₹${order.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>₹{order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold mt-2">
                  <span>Total</span>
                  <span>₹{order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                <p className="font-medium">{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.addressLine1}</p>
                {order.shippingAddress.addressLine2 && (
                  <p>{order.shippingAddress.addressLine2}</p>
                )}
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.pinCode}
                </p>
                <p>{order.shippingAddress.country}</p>
                <p className="mt-2">{order.shippingAddress.mobileNumber}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                {/* <p className="font-medium">
                  {order.paymentInfo.method === "cod"
                    ? "Cash On Delivery"
                    : order.paymentInfo.method === "credit-card"
                      ? "Credit Card"
                      : "PayPal"}
                </p> */}
                {/* {order.paymentInfo.method === "credit-card" && order.paymentInfo.cardNumber && (
                  <p className="mt-1">**** **** **** {order.paymentInfo.cardNumber.slice(-4)}</p>
                )} */}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
