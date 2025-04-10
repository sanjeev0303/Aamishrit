"use client"

import { ChevronRight, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs } from "@/components/ui/tabs"
import { Order, OrderItem } from "@/types"

// Move this function outside of the components
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

export default function OrdersPage() {
  // Remove the getStatusBadge function from here since it's now defined outside
  const [searchQuery, setSearchQuery] = useState("")

//   const {
//     data: orders,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["userOrders"],
//     queryFn: getUserOrders,
//   })

//   if (isLoading) {
//     return (
//       <div className="container mx-auto px-4 py-12">
//         <h1 className="text-3xl font-bold mb-8">My Orders</h1>
//         <div className="space-y-6">
//           {[...Array(3)].map((_, i) => (
//             <Card key={i}>
//               <CardContent className="p-6">
//                 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
//                   <div>
//                     <Skeleton className="h-6 w-32 mb-2" />
//                     <Skeleton className="h-4 w-48" />
//                   </div>
//                   <Skeleton className="h-8 w-24" />
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                   <Skeleton className="h-20" />
//                   <Skeleton className="h-20" />
//                   <Skeleton className="h-20" />
//                   <Skeleton className="h-20" />
//                 </div>
//               </CardContent>
//               <CardFooter className="p-6 pt-0 border-t">
//                 <Skeleton className="h-10 w-full md:w-40" />
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-12">
//         <h1 className="text-3xl font-bold mb-8">My Orders</h1>
//         <div className="text-center py-12">
//           <p className="text-red-500 mb-4">Failed to load orders. Please try again later.</p>
//           <Button onClick={() => window.location.reload()}>Retry</Button>
//         </div>
//       </div>
//     )
//   }

//   if (!orders || orders.length === 0) {
//     return (
//       <div className="container mx-auto px-4 py-12">
//         <h1 className="text-3xl font-bold mb-8">My Orders</h1>
//         <div className="text-center py-12">
//           <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
//             <Package className="h-12 w-12 text-gray-400" />
//           </div>
//           <h2 className="text-2xl font-semibold mb-4">No orders yet</h2>
//           <p className="text-gray-500 mb-8">You haven't placed any orders yet.</p>
//           <Button asChild size="lg">
//             <Link href="/products">Start Shopping</Link>
//           </Button>
//         </div>
//       </div>
//     )
//   }

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "processing":
//         return <Clock className="h-5 w-5 text-yellow-500" />
//       case "shipped":
//         return <Package className="h-5 w-5 text-blue-500" />
//       case "delivered":
//         return <CheckCircle className="h-5 w-5 text-green-500" />
//       case "cancelled":
//         return <XCircle className="h-5 w-5 text-red-500" />
//       default:
//         return <Package className="h-5 w-5 text-gray-500" />
//     }
//   }

  // Filter orders based on search query
//   const filteredOrders = orders.filter(
//     (order) =>
//       order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())),
//   )

  // Group orders by status
//   const processingOrders = filteredOrders.filter((order) => order.status === "processing")
//   const shippedOrders = filteredOrders.filter((order) => order.status === "shipped")
//   const deliveredOrders = filteredOrders.filter((order) => order.status === "delivered")
//   const cancelledOrders = filteredOrders.filter((order) => order.status === "cancelled")

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search orders by ID or product name..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all">
        {/* <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="all">All ({filteredOrders.length})</TabsTrigger>
          <TabsTrigger value="processing">Processing ({processingOrders.length})</TabsTrigger>
          <TabsTrigger value="shipped">Shipped ({shippedOrders.length})</TabsTrigger>
          <TabsTrigger value="delivered">Delivered ({deliveredOrders.length})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({cancelledOrders.length})</TabsTrigger>
        </TabsList> */}

        {/* <TabsContent value="all" className="space-y-6">
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </TabsContent> */}

        {/* <TabsContent value="processing" className="space-y-6">
          {processingOrders.length > 0 ? (
            processingOrders.map((order) => <OrderCard key={order.id} order={order} />)
          ) : (
            <p className="text-center py-8 text-gray-500">No processing orders found.</p>
          )}
        </TabsContent> */}

        {/* <TabsContent value="shipped" className="space-y-6">
          {shippedOrders.length > 0 ? (
            shippedOrders.map((order) => <OrderCard key={order.id} order={order} />)
          ) : (
            <p className="text-center py-8 text-gray-500">No shipped orders found.</p>
          )}
        </TabsContent> */}

        {/* <TabsContent value="delivered" className="space-y-6">
          {deliveredOrders.length > 0 ? (
            deliveredOrders.map((order) => <OrderCard key={order.id} order={order} />)
          ) : (
            <p className="text-center py-8 text-gray-500">No delivered orders found.</p>
          )}
        </TabsContent> */}

        {/* <TabsContent value="cancelled" className="space-y-6">
          {cancelledOrders.length > 0 ? (
            cancelledOrders.map((order) => <OrderCard key={order.id} order={order} />)
          ) : (
            <p className="text-center py-8 text-gray-500">No cancelled orders found.</p>
          )}
        </TabsContent> */}
      </Tabs>
    </div>
  )
}

export function OrderCard({ order }: { order: Order }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Order #{order.id}</h3>
              {getStatusBadge(order.status)}
            </div>
            <p className="text-sm text-gray-500">Placed on {order.date}</p>
          </div>
          <div className="font-medium">${order.total.toFixed(2)}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {order.items.slice(0, 4).map((item: OrderItem, index: number) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-md flex-shrink-0"></div>
              <div className="flex-grow min-w-0">
                <p className="font-medium truncate">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
          {order.items.length > 4 && (
            <div className="text-sm text-gray-500 flex items-center">+{order.items.length - 4} more items</div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 border-t">
        <Button asChild variant="outline">
          <Link href={`/orders/${order.id}`} className="flex items-center">
            View Order Details
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
