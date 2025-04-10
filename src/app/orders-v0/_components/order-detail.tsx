"use client"
import { ArrowLeft, Calendar, CheckCircle, Clock, CreditCard, MapPin, Package, Truck, XCircle } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function OrderDetail({ id }: { id: string }) {
//   const {
//     data: order,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["order", id],
//     queryFn: () => getOrderById(id),
//   })

//   if (isLoading) {
//     return (
//       <div className="container mx-auto px-4 py-12">
//         <div className="animate-pulse space-y-8">
//           <div className="h-8 w-48 bg-gray-200 rounded"></div>
//           <div className="h-24 bg-gray-200 rounded"></div>
//           <div className="h-64 bg-gray-200 rounded"></div>
//           <div className="h-48 bg-gray-200 rounded"></div>
//         </div>
//       </div>
//     )
//   }

//   if (error || !order) {
//     return (
//       <div className="container mx-auto px-4 py-12">
//         <div className="text-center py-12">
//           <h2 className="text-2xl font-bold text-red-600 mb-4">Order Not Found</h2>
//           <p className="text-gray-700 mb-6">
//             We couldn't find the order you're looking for. It may have been removed or the ID is incorrect.
//           </p>
//           <Button asChild>
//             <Link href="/orders">Return to Orders</Link>
//           </Button>
//         </div>
//       </div>
//     )
//   }

const order = {
    id,
    date: "2023-10-01",
    status: "shipped",
    trackingNumber: "123456789",
    estimatedShipping: "2023-10-05",
    estimatedDelivery: "2023-10-10",

}

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Clock className="h-6 w-6 text-yellow-500" />
      case "shipped":
        return <Truck className="h-6 w-6 text-blue-500" />
      case "delivered":
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case "cancelled":
        return <XCircle className="h-6 w-6 text-red-500" />
      default:
        return <Package className="h-6 w-6 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "processing":
        return "Your order is being processed"
      case "shipped":
        return "Your order has been shipped"
      case "delivered":
        return "Your order has been delivered"
      case "cancelled":
        return "Your order has been cancelled"
      default:
        return "Order status unknown"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processing":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Processing
          </Badge>
        )
      case "shipped":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Shipped
          </Badge>
        )
      case "delivered":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Delivered
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Link href="/orders" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Order #{order.id}</h1>
          <p className="text-gray-500">Placed on {order.date}</p>
        </div>
        {getStatusBadge(order.status)}
      </div>

      {/* Order Status */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            {getStatusIcon(order.status)}
            <div>
              <h2 className="font-semibold text-lg">{getStatusText(order.status)}</h2>
              {order.status === "shipped" && order.trackingNumber && (
                <p className="text-gray-600">
                  Tracking Number: <span className="font-medium">{order.trackingNumber}</span>
                </p>
              )}
              {order.status === "processing" && (
                <p className="text-gray-600">Estimated shipping date: {order.estimatedShipping}</p>
              )}
              {order.status === "shipped" && (
                <p className="text-gray-600">Estimated delivery date: {order.estimatedDelivery}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Progress */}
      {order.status !== "cancelled" && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Progress</h2>
          <div className="relative">
            <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            <div className="space-y-8">
              <div className="relative flex items-start">
                <div
                  className={`z-10 flex items-center justify-center w-14 h-14 rounded-full ${
                    order.status === "processing" || order.status === "shipped" || order.status === "delivered"
                      ? "bg-green-100"
                      : "bg-gray-100"
                  }`}
                >
                  <CheckCircle
                    className={`h-6 w-6 ${
                      order.status === "processing" || order.status === "shipped" || order.status === "delivered"
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">Order Confirmed</h3>
                  {/* <p className="text-sm text-gray-500">{order.timeline?.confirmed || order.date}</p> */}
                </div>
              </div>

              <div className="relative flex items-start">
                <div
                  className={`z-10 flex items-center justify-center w-14 h-14 rounded-full ${
                    order.status === "processing" || order.status === "shipped" || order.status === "delivered"
                      ? "bg-green-100"
                      : "bg-gray-100"
                  }`}
                >
                  <Package
                    className={`h-6 w-6 ${
                      order.status === "processing" || order.status === "shipped" || order.status === "delivered"
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">Processing</h3>
                  {/* <p className="text-sm text-gray-500">{order.timeline?.processing || "In progress"}</p> */}
                </div>
              </div>

              <div className="relative flex items-start">
                <div
                  className={`z-10 flex items-center justify-center w-14 h-14 rounded-full ${
                    order.status === "shipped" || order.status === "delivered" ? "bg-green-100" : "bg-gray-100"
                  }`}
                >
                  <Truck
                    className={`h-6 w-6 ${
                      order.status === "shipped" || order.status === "delivered" ? "text-green-500" : "text-gray-400"
                    }`}
                  />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">Shipped</h3>
                  <p className="text-sm text-gray-500">
                    {/* {order.status === "shipped" || order.status === "delivered" ? order.timeline?.shipped : "Pending"} */}
                  </p>
                </div>
              </div>

              <div className="relative flex items-start">
                <div
                  className={`z-10 flex items-center justify-center w-14 h-14 rounded-full ${
                    order.status === "delivered" ? "bg-green-100" : "bg-gray-100"
                  }`}
                >
                  <CheckCircle
                    className={`h-6 w-6 ${order.status === "delivered" ? "text-green-500" : "text-gray-400"}`}
                  />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">Delivered</h3>
                  <p className="text-sm text-gray-500">
                    {/* {order.status === "delivered" ? order.timeline?.delivered : "Pending"} */}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Order Items */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* {order.items.map((item: any, index: number) => (
                  <div key={index} className="flex gap-4">
                    <div className="relative w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg?height=80&width=80"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <Link href={`/product/${item.productId}`} className="font-medium hover:underline">
                          {item.name}
                        </Link>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">${item.price.toFixed(2)} each</p>
                      <p className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))} */}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  {/* <span>${order.subtotal.toFixed(2)}</span> */}
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  {/* <span>{order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}</span> */}
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax</span>
                  {/* <span>${order.tax.toFixed(2)}</span> */}
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  {/* <span>${order.total.toFixed(2)}</span> */}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                {/* <div>
                  <p className="font-medium">{order.shippingAddress.name}</p>
                  <p className="text-gray-600">{order.shippingAddress.street}</p>
                  <p className="text-gray-600">
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                  </p>
                  <p className="text-gray-600">{order.shippingAddress.country}</p>
                  <p className="text-gray-600">{order.shippingAddress.phone}</p>
                </div> */}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <div>
                    {/* <p className="font-medium">{order.payment.method}</p>
                    <p className="text-gray-600">**** **** **** {order.payment.cardLast4}</p> */}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  {/* <p className="text-gray-600">Billed on {order.payment.date}</p> */}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4">
        <Button asChild variant="outline">
          <Link href="/contact">Contact Support</Link>
        </Button>
        {order.status !== "cancelled" && order.status !== "delivered" && (
          <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">
            Cancel Order
          </Button>
        )}
        {order.status === "delivered" && <Button>Return Items</Button>}
      </div>
    </div>
  )
}
