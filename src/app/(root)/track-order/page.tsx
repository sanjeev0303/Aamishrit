"use client"
import Image from "next/image"
import Link from "next/link"
import { Package, Truck, CheckCircle, Clock, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function TrackOrderPage() {
  // Sample order data
  const order = {
    id: 1,
    orderNumber: "ORD-7829",
    date: "March 25, 2025",
    total: "$249.95",
    status: "Shipped",
    estimatedDelivery: "April 2, 2025",
    trackingNumber: "TRK-123456789",
    items: [
      {
        id: 101,
        name: "Artisanal Jaggery Block",
        price: "$89.99",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1741851373559-6879db14fd8a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 102,
        name: "Organic Jaggery Powder",
        price: "$59.99",
        quantity: 2,
        image: "https://images.unsplash.com/photo-1742206506252-7f7504f5de9a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 103,
        name: "Premium Jaggery Gift Box",
        price: "$39.98",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1742387436246-b432a6bfc623?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="h-5 w-5 text-emerald-600" />
      case "Processing":
        return <Clock className="h-5 w-5 text-amber-600" />
      case "Shipped":
        return <Truck className="h-5 w-5 text-blue-600" />
      default:
        return <Package className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
      case "Processing":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200"
      case "Shipped":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  // Track order steps
  const steps = [
    { id: 1, name: "Order Placed", date: "March 25, 2025", completed: true },
    { id: 2, name: "Processing", date: "March 26, 2025", completed: true },
    { id: 3, name: "Shipped", date: "March 28, 2025", completed: true },
    { id: 4, name: "Out for Delivery", date: "April 1, 2025", completed: false },
    { id: 5, name: "Delivered", date: "April 2, 2025", completed: false },
  ]

  return (
    <div className="min-h-screen bg-[#FDF7F0]">


      {/* Main Content */}
      <main className="container mx-auto px-4 mt-18 pt-2">
        <div className="mb-6 flex items-center">
          <Link href="/orders" className="flex items-center text-[#8B5A2B] hover:text-[#6B4226] mr-4">
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span>Back to Orders</span>
          </Link>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#6B4226]">Track Order</h2>
          <p className="text-[#8B5A2B] mt-2">
            Order #{order.orderNumber} • Placed on {order.date}
          </p>
        </div>

        {/* Order Status Card */}
        <Card className="mb-8 border-[#D4B08C] bg-[#FDF7F0]">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={`${getStatusColor(order.status)}`}>
                    <span className="flex items-center gap-1">
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </Badge>
                </div>
                <p className="text-[#8B5A2B]">
                  Estimated Delivery: <span className="font-medium text-[#6B4226]">{order.estimatedDelivery}</span>
                </p>
                <p className="text-[#8B5A2B]">
                  Tracking Number: <span className="font-medium text-[#6B4226]">{order.trackingNumber}</span>
                </p>
              </div>

            </div>

            {/* Progress Tracker */}
            <div className="mt-8 mb-4">
              <h3 className="font-medium text-[#6B4226] mb-6">Shipping Progress</h3>
              <div className="relative">
                {/* Progress Line */}
                <div
                  className="absolute top-5 left-5 h-full w-0.5 bg-[#D4B08C]"
                  style={{ height: `${(steps.length - 1) * 80}px` }}
                ></div>

                {/* Steps */}
                <div className="space-y-8">
                  {steps.map((step) => (
                    <div key={step.id} className="relative flex items-start">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          step.completed ? "bg-[#8B5A2B]" : "bg-[#D4B08C]"
                        } z-9`}
                      >
                        {step.completed ? (
                          <CheckCircle className="h-6 w-6 text-white" />
                        ) : (
                          <div className="h-3 w-3 rounded-full bg-white"></div>
                        )}
                      </div>
                      <div className="ml-4">
                        <h4 className={`font-medium ${step.completed ? "text-[#6B4226]" : "text-[#8B5A2B]"}`}>
                          {step.name}
                        </h4>
                        <p className="text-sm text-[#8B5A2B]">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <div className="mb-8">
          <h3 className="text-xl font-medium text-[#6B4226] mb-4">Order Items</h3>
          <div className="grid gap-4">
            {order.items.map((item) => (
              <Link href={`/product/${item.id}`} key={item.id}>
                <Card className="border-[#D4B08C] bg-[#FDF7F0] hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={120}
                        height={120}
                        className="rounded-md object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-[#6B4226] hover:underline">{item.name}</h4>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-2 text-sm text-[#8B5A2B]">
                          <p>Price: {item.price}</p>
                          <p>Quantity: {item.quantity}</p>
                        </div>
                        <Badge className={`mt-2 ${getStatusColor(order.status)}`}>{order.status}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <Card className="mb-8 border-[#D4B08C] bg-[#FDF7F0]">
          <CardContent className="p-6">
            <h3 className="font-medium text-[#6B4226] mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[#8B5A2B]">Subtotal</span>
                <span className="text-[#6B4226]">{order.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8B5A2B]">Shipping</span>
                <span className="text-[#6B4226]">Free</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E6D5C1]">
                <span className="font-medium text-[#6B4226]">Total</span>
                <span className="font-medium text-[#6B4226]">{order.total}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="border-[#D4B08C] bg-[#FDF7F0]">
          <CardContent className="p-6">
            <h3 className="font-medium text-[#6B4226] mb-4">Need Help?</h3>
            <p className="text-[#8B5A2B] mb-4">
              If you have any questions about your order, please contact our customer support.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-[#8B5A2B] hover:bg-[#6B4226] text-white">Contact Support</Button>
              <Button variant="outline" className="border-[#8B5A2B] text-[#8B5A2B] hover:bg-[#F0E6D9]">
                Return Policy
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-[#6B4226] text-[#FDF7F0] py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-serif font-bold mb-4">Jaggery Luxe</h3>
              <p className="text-[#E6D5C1]">Premium jaggery products for the discerning customer.</p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-[#E6D5C1] hover:text-white">
                    My Account
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#E6D5C1] hover:text-white">
                    Track Orders
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#E6D5C1] hover:text-white">
                    Help & Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Contact Us</h4>
              <address className="text-[#E6D5C1] not-italic">
                Email: support@jaggeryluxe.com
                <br />
                Phone: +1 (555) 123-4567
              </address>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-[#8B5A2B] text-center text-[#E6D5C1]">
            <p>&copy; {new Date().getFullYear()} Jaggery Luxe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
