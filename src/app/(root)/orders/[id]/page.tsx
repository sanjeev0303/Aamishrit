"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, Truck, Package, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Order } from "@/Dummies/dummy-types"

export default function OrderConfirmationPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, we would fetch the order from the API
    // For this demo, we'll create a mock order
    const mockOrder: Order = {
      id: params.id,
      date: new Date().toISOString().split("T")[0],
      status: "processing",
      items: [
        {
          id: "1",
          name: "Organic Herbal Tea",
          price: 12.99,
          quantity: 2,
          images: ["/placeholder.svg?height=64&width=64"],
        },
        {
          id: "3",
          name: "Organic Palm Jaggery",
          price: 9.99,
          quantity: 1,
          images: ["/placeholder.svg?height=64&width=64"],
        },
      ],
      subtotal: 35.97,
      shipping: 5.0,
      tax: 4.1,
      total: 45.07,
      shippingAddress: {
        id: "addr1",
        fullName: "John Doe",
        addressLine1: "123 Main Street",
        addressLine2: "Apt 4B",
        landmark: "Near Central Park",
        city: "Mumbai",
        state: "Maharashtra",
        pinCode: "400001",
        country: "India",
        mobileNumber: "9876543210",
        isDefault: true,
      },
      payment: {
        method: "cod",
        date: new Date().toISOString().split("T")[0],
      },
      estimatedShipping: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      timeline: {
        confirmed: new Date().toISOString(),
        processing: new Date().toISOString(),
      },
    }

    // Simulate API call
    setTimeout(() => {
      setOrder(mockOrder)
      setIsLoading(false)
    }, 1000)
  }, [params.id])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4 max-w-3xl mx-auto">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="mb-6">We couldn't find the order you're looking for.</p>
          <Button onClick={() => router.push("/")}>Return to Home</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 lg:py-24 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-brown-heading">Order Confirmed!</h1>
          <p className="text-gray-600 mt-2">Thank you for your purchase. Your order has been confirmed.</p>
          <p className="font-medium mt-1">Order #{order.id}</p>
        </div>

        {/* Order Status */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Estimated Delivery</p>
                  <p className="text-sm text-gray-600">{order.estimatedDelivery}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium capitalize">{order.status}</p>
                <p className="text-sm text-gray-600">Last Updated: {new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>
              <div className="space-y-8 relative">
                <div className="flex">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-500 flex items-center justify-center z-5">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Order Confirmed</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(order.timeline?.confirmed || "").toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-500 flex items-center justify-center z-5">
                    <Package className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Processing</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(order.timeline?.processing || "").toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center z-5">
                    <Truck className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-500">Shipped</h3>
                    <p className="text-sm text-gray-500">Estimated: {order.estimatedShipping}</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center z-5">
                    <CheckCircle2 className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-500">Delivered</h3>
                    <p className="text-sm text-gray-500">Estimated: {order.estimatedDelivery}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.images[0] || "/placeholder.svg?height=64&width=64"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <Link href={`/product/${item.id}`} className="font-medium hover:underline text-brown-heading">
                        {item.name}
                      </Link>
                      <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
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
                  <span>{order.shipping === 0 ? "Free" : `₹${order.shipping.toFixed(2)}`}</span>
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
                {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pinCode}
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
                <p className="font-medium">
                  {order.payment.method === "cod"
                    ? "Cash On Delivery"
                    : order.payment.method === "upi"
                      ? "UPI"
                      : "PhonePe"}
                </p>
                <p className="mt-1">Payment Date: {order.payment.date}</p>
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
  )
}
