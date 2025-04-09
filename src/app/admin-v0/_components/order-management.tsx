"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  Search,
  MoreHorizontal,
  Eye,
  Download,
  Clock,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Calendar,
  User,
  CreditCard,
  Mail,
  Phone,
} from "lucide-react"
import { toast } from "sonner"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { getOrders, getOrderById, updateOrderStatus } from "@/actions/admin"
import AdminLayout from "./admin-layout"

export default function OrderManagement() {
  const queryClient = useQueryClient()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isUpdateStatusDialogOpen, setIsUpdateStatusDialogOpen] = useState(false)
  const [newStatus, setNewStatus] = useState("")
  const [statusNote, setStatusNote] = useState("")

  // Fetch orders
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders", statusFilter, dateFilter],
    queryFn: () =>
      getOrders({
        status: statusFilter !== "all" ? statusFilter : undefined,
        dateRange: dateFilter !== "all" ? dateFilter : undefined,
      }),
  })

  // Fetch single order details
  const { data: orderDetails, isLoading: isOrderDetailsLoading } = useQuery({
    queryKey: ["order", selectedOrder?.id],
    queryFn: () => (selectedOrder ? getOrderById(selectedOrder.id) : null),
    enabled: !!selectedOrder,
  }) as { data: {
    shippingAddress: { name: string; street: string; city: string; state: string; zip: string; country: string; phone: string };
    shippingMethod: string;
    trackingNumber: string | null;
    estimatedDelivery: string | null;
    paymentId?: string;
    items: Array<{ id: string; name: string; price: number; quantity: number; image?: string; sku?: string }>;
    [key: string]: any;
  } | null, isLoading: boolean }

  // Update order status mutation
  const updateStatusMutation = useMutation<
    { id: string; createdAt: Date; updatedAt: Date; userId: string; status: string; },
    Error,
    { orderId: string; status: string; note: string }
  >({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] })
      queryClient.invalidateQueries({ queryKey: ["order", selectedOrder?.id] })
      setIsUpdateStatusDialogOpen(false)
      setNewStatus("")
      setStatusNote("")
      toast.success("Order status updated successfully")
    },
    onError: (error) => {
      toast.error("Failed to update order status", {
        description: error instanceof Error ? error.message : "Please try again",
      })
    },
  })

  const openOrderDetails = (order: any) => {
    setSelectedOrder(order)
    setIsViewDialogOpen(true)
  }

  const openUpdateStatusDialog = (order: any) => {
    setSelectedOrder(order)
    setNewStatus(order.status)
    setIsUpdateStatusDialogOpen(true)
  }

  const handleUpdateStatus = () => {
    if (!selectedOrder || !newStatus) return

    updateStatusMutation.mutate({
      orderId: selectedOrder.id,
      status: newStatus,
      note: statusNote,
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Processing
          </Badge>
        )
      case "shipped":
        return (
          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "processing":
        return <Package className="h-5 w-5 text-blue-500" />
      case "shipped":
        return <Truck className="h-5 w-5 text-indigo-500" />
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Package className="h-5 w-5 text-gray-500" />
    }
  }

  // Filter orders based on search query
  const filteredOrders =
    orders?.filter(
      (order) =>
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || []

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
            <p className="text-gray-500">Manage customer orders and fulfillment</p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Orders
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search orders by ID, customer name or email..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <Skeleton className="h-4 w-[100px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-[100px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-[150px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-[80px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-[100px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-[100px]" />
                        </TableCell>
                        <TableCell className="text-right">
                          <Skeleton className="h-8 w-[80px] ml-auto" />
                        </TableCell>
                      </TableRow>
                    ))
                ) : filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      No orders found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{format(new Date(order.date), "MMM dd, yyyy")}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.customer.name}</p>
                          <p className="text-sm text-gray-500">{order.customer.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{order.paymentMethod}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => openOrderDetails(order)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openUpdateStatusDialog(order)}>
                              <Package className="mr-2 h-4 w-4" />
                              Update Status
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download Invoice
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* View Order Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>View complete information about this order</DialogDescription>
          </DialogHeader>

          {isOrderDetailsLoading ? (
            <div className="py-8 text-center">
              <Skeleton className="h-8 w-[200px] mx-auto mb-4" />
              <Skeleton className="h-4 w-[300px] mx-auto" />
            </div>
          ) : orderDetails ? (
            <div className="py-4">
              <div className="flex flex-col md:flex-row justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Order #{orderDetails.id}</h3>
                  <p className="text-sm text-gray-500">
                    Placed on {format(new Date(orderDetails.date), "MMMM dd, yyyy")}
                  </p>
                </div>
                <div className="mt-2 md:mt-0">{getStatusBadge(orderDetails.status)}</div>
              </div>

              <Tabs defaultValue="items">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="items">Items</TabsTrigger>
                  <TabsTrigger value="customer">Customer</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                </TabsList>

                <TabsContent value="items" className="space-y-4 pt-4">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orderDetails.items.map((item: any) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                                  {item.image ? (
                                    <img
                                      src={item.image || "/placeholder.svg"}
                                      alt={item.name}
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <Package className="h-6 w-6 text-gray-400" />
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-xs text-gray-500">SKU: {item.sku || item.id}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>${item.price.toFixed(2)}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="rounded-md border p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Subtotal</span>
                        <span>${orderDetails.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Shipping</span>
                        <span>${orderDetails.shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Tax</span>
                        <span>${orderDetails.tax.toFixed(2)}</span>
                      </div>
                      {orderDetails.discount > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Discount</span>
                          <span className="text-green-600">-${orderDetails.discount.toFixed(2)}</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${orderDetails.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="customer" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Customer Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">Name:</span>
                            <span className="text-sm">{orderDetails.customer.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">Email:</span>
                            <span className="text-sm">{orderDetails.customer.email}</span>
                          </div>
                          {/* {orderDetails.customer.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-500" />
                              <span className="text-sm font-medium">Phone:</span>
                              <span className="text-sm">{orderDetails.customer.phone}</span>
                            </div>
                          )} */}
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">Order Date:</span>
                            <span className="text-sm">
                              {format(new Date(orderDetails.date), "MMMM yyyy")}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Payment Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">Method:</span>
                            <span className="text-sm">{orderDetails.paymentMethod}</span>
                          </div>
                          {orderDetails.paymentId && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">Payment ID:</span>
                              <span className="text-sm">{orderDetails.paymentId}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">Payment Date:</span>
                            <span className="text-sm">
                              {format(new Date(orderDetails.paymentDate), "MMMM dd, yyyy")}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Status:</span>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Paid
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="shipping" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Shipping Address</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-1">
                          <p className="font-medium">{orderDetails.shippingAddress.name}</p>
                          <p>{orderDetails.shippingAddress.street}</p>
                          <p>
                            {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state}{" "}
                            {orderDetails.shippingAddress.zip}
                          </p>
                          <p>{orderDetails.shippingAddress.country}</p>
                          <p className="pt-2">{orderDetails.shippingAddress.phone}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Shipping Details</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">Method:</span>
                            <span className="text-sm">{orderDetails.shippingMethod}</span>
                          </div>
                          {orderDetails.trackingNumber && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">Tracking Number:</span>
                              <span className="text-sm">{orderDetails.trackingNumber}</span>
                            </div>
                          )}
                          {orderDetails.estimatedDelivery && (
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span className="text-sm font-medium">Estimated Delivery:</span>
                              <span className="text-sm">
                                {format(new Date(orderDetails.estimatedDelivery), "MMMM dd, yyyy")}
                              </span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {orderDetails.notes && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Order Notes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{orderDetails.notes}</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="timeline" className="space-y-4 pt-4">
                  <div className="relative">
                    <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    <div className="space-y-8">
                      <div className="relative flex items-start">
                        <div
                          className={`z-10 flex items-center justify-center w-14 h-14 rounded-full ${
                            orderDetails.timeline?.confirmed ? "bg-green-100" : "bg-gray-100"
                          }`}
                        >
                          <CheckCircle
                            className={`h-6 w-6 ${
                              orderDetails.timeline?.confirmed ? "text-green-500" : "text-gray-400"
                            }`}
                          />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium">Order Confirmed</h3>
                          <p className="text-sm text-gray-500">
                            {orderDetails.timeline?.confirmed
                              ? format(new Date(orderDetails.timeline.confirmed), "MMM dd, yyyy h:mm a")
                              : "Pending"}
                          </p>
                        </div>
                      </div>

                      <div className="relative flex items-start">
                        <div
                          className={`z-10 flex items-center justify-center w-14 h-14 rounded-full ${
                            orderDetails.timeline?.processing ? "bg-green-100" : "bg-gray-100"
                          }`}
                        >
                          <Package
                            className={`h-6 w-6 ${
                              orderDetails.timeline?.processing ? "text-green-500" : "text-gray-400"
                            }`}
                          />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium">Processing</h3>
                          <p className="text-sm text-gray-500">
                            {orderDetails.timeline?.processing
                              ? format(new Date(orderDetails.timeline.processing), "MMM dd, yyyy h:mm a")
                              : "Pending"}
                          </p>
                        </div>
                      </div>

                      <div className="relative flex items-start">
                        <div
                          className={`z-10 flex items-center justify-center w-14 h-14 rounded-full ${
                            orderDetails.timeline?.shipped ? "bg-green-100" : "bg-gray-100"
                          }`}
                        >
                          <Truck
                            className={`h-6 w-6 ${orderDetails.timeline?.shipped ? "text-green-500" : "text-gray-400"}`}
                          />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium">Shipped</h3>
                          <p className="text-sm text-gray-500">
                            {orderDetails.timeline?.shipped
                              ? format(new Date(orderDetails.timeline.shipped), "MMM dd, yyyy h:mm a")
                              : "Pending"}
                          </p>
                          {orderDetails.trackingNumber && orderDetails.timeline?.shipped && (
                            <p className="text-sm">
                              Tracking: <span className="font-medium">{orderDetails.trackingNumber}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="relative flex items-start">
                        <div
                          className={`z-10 flex items-center justify-center w-14 h-14 rounded-full ${
                            orderDetails.timeline?.delivered ? "bg-green-100" : "bg-gray-100"
                          }`}
                        >
                          <CheckCircle
                            className={`h-6 w-6 ${
                              orderDetails.timeline?.delivered ? "text-green-500" : "text-gray-400"
                            }`}
                          />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium">Delivered</h3>
                          <p className="text-sm text-gray-500">
                            {orderDetails.timeline?.delivered
                              ? format(new Date(orderDetails.timeline.delivered), "MMM dd, yyyy h:mm a")
                              : "Pending"}
                          </p>
                        </div>
                      </div>

                      {orderDetails.timeline?.cancelled && (
                        <div className="relative flex items-start">
                          <div className="z-10 flex items-center justify-center w-14 h-14 rounded-full bg-red-100">
                            <XCircle className="h-6 w-6 text-red-500" />
                          </div>
                          <div className="ml-4">
                            <h3 className="font-medium">Cancelled</h3>
                            <p className="text-sm text-gray-500">
                              {format(new Date(orderDetails.timeline.cancelled), "MMM dd, yyyy h:mm a")}
                            </p>
                            {orderDetails.cancellationReason && (
                              <p className="text-sm mt-1">Reason: {orderDetails.cancellationReason}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="py-8 text-center">Order not found.</div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            {selectedOrder && (
              <Button
                onClick={() => {
                  setIsViewDialogOpen(false)
                  openUpdateStatusDialog(selectedOrder)
                }}
              >
                Update Status
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Status Dialog */}
      <Dialog open={isUpdateStatusDialogOpen} onOpenChange={setIsUpdateStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>Change the status of order #{selectedOrder?.id}</DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select new status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newStatus === "shipped" && (
                <div className="grid gap-2">
                  <Label htmlFor="trackingNumber">Tracking Number (Optional)</Label>
                  <Input id="trackingNumber" placeholder="Enter tracking number" />
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="note">Note (Optional)</Label>
                <Textarea
                  id="note"
                  placeholder="Add a note about this status change"
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateStatusDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateStatus} disabled={updateStatusMutation.isPending || !newStatus}>
              {updateStatusMutation.isPending ? "Updating..." : "Update Status"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}
