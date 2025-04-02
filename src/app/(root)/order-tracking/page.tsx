"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Package, Truck, CheckCircle, Clock, User, Search, Filter, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function OrderTrackingPage() {
  // Sample orders data
  const orders = [
    {
      id: 1,
      orderNumber: "ORD-7829",
      date: "March 25, 2025",
      total: "$249.95",
      status: "Delivered",
      estimatedDelivery: "March 30, 2025",
      trackingNumber: "TRK-123456789",
      items: [
        {
          id: 101,
          name: "Artisanal Jaggery Block",
          price: "$89.99",
          quantity: 1,
          image: "https://images.unsplash.com/photo-1742268350465-35d7baae61fa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          id: 102,
          name: "Organic Jaggery Powder",
          price: "$59.99",
          quantity: 2,
          image: "https://images.unsplash.com/photo-1743044091650-6f558c16ffd1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          id: 103,
          name: "Premium Jaggery Gift Box",
          price: "$39.98",
          quantity: 1,
          image: "https://images.unsplash.com/photo-1741851373559-6879db14fd8a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ],
    },
    {
      id: 2,
      orderNumber: "ORD-7830",
      date: "March 27, 2025",
      total: "$159.97",
      status: "Processing",
      estimatedDelivery: "April 5, 2025",
      trackingNumber: "TRK-987654321",
      items: [
        {
          id: 201,
          name: "Jaggery Infused Honey",
          price: "$79.99",
          quantity: 1,
          image: "https://images.unsplash.com/photo-1742144897663-6c8c6faaf1ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          id: 202,
          name: "Jaggery Coated Nuts",
          price: "$39.99",
          quantity: 2,
          image: "https://images.unsplash.com/photo-1742845918430-c6093f93f740?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ],
    },
    {
      id: 3,
      orderNumber: "ORD-7831",
      date: "March 28, 2025",
      total: "$129.99",
      status: "Shipped",
      estimatedDelivery: "April 3, 2025",
      trackingNumber: "TRK-456789123",
      items: [
        {
          id: 301,
          name: "Luxury Jaggery Hamper",
          price: "$129.99",
          quantity: 1,
          image: "https://images.unsplash.com/photo-1742943679519-bb9eb364b152?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ],
    },
  ]

  const [selectedOrder, setSelectedOrder] = useState<number | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [rating, setRating] = useState<number>(0)
  const [reviewText, setReviewText] = useState<string>("")
  const [hoveredStar, setHoveredStar] = useState<number>(0)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

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

  const handleReviewSubmit = () => {
    // In a real app, you would send this data to your backend
    console.log({
      orderId: selectedOrder,
      productId: selectedProduct?.id,
      rating,
      reviewText,
    })

    // Reset form
    setRating(0)
    setReviewText("")
    setSelectedProduct(null)
    setSelectedOrder(null)
  }

  const openReviewDialog = (orderId: number, product: any) => {
    setSelectedOrder(orderId)
    setSelectedProduct(product)
    setRating(0)
    setReviewText("")
  }

  // Filter orders based on search term and status filter
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-[#FDF7F0] mt-10">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gradient-to-r from-[#8B5A2B] to-[#A67C52] shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl md:text-2xl font-serif font-bold text-[#FDF7F0]">
              Jaggery Luxe
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/wishlist">
              <Button variant="ghost" className="text-[#FDF7F0] hover:bg-[#9E6B3C] hover:text-[#FDF7F0]">
                Wishlist
              </Button>
            </Link>
            <Button variant="ghost" className="text-[#FDF7F0] hover:bg-[#9E6B3C] hover:text-[#FDF7F0]">
              <User className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">My Account</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#6B4226]">Track Your Orders</h2>
          <p className="text-[#8B5A2B] mt-2">Monitor the status of your orders and leave reviews</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B5A2B]" />
            <Input
              placeholder="Search orders..."
              className="pl-10 border-[#D4B08C] bg-[#FDF7F0] focus-visible:ring-[#8B5A2B]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] border-[#D4B08C] bg-[#FDF7F0] focus:ring-[#8B5A2B]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
              </SelectContent>
            </Select>
            <Button
              className="bg-[#8B5A2B] hover:bg-[#6B4226] text-white"
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("all")
              }}
            >
              <Filter className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <Card key={order.id} className="overflow-hidden border-[#D4B08C] bg-[#FDF7F0]">
                <CardContent className="p-0">
                  {/* Order Header */}
                  <div className="p-4 md:p-6 border-b border-[#E6D5C1]">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-[#6B4226]">Order #{order.orderNumber}</h3>
                          <Badge className={`${getStatusColor(order.status)}`}>
                            <span className="flex items-center gap-1">
                              {getStatusIcon(order.status)}
                              {order.status}
                            </span>
                          </Badge>
                        </div>
                        <p className="text-sm text-[#8B5A2B]">Placed on {order.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-medium text-[#6B4226]">Total: {order.total}</p>
                        <Link href={`/track-order?id=${order.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-[#8B5A2B] hover:bg-[#F0E6D9] hover:text-[#6B4226]"
                          >
                            Track Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-4 md:p-6">
                    <h4 className="font-medium text-[#6B4226] mb-4">Order Items</h4>
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 rounded-lg bg-white border border-[#E6D5C1]"
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="rounded-md object-cover"
                            />
                            <div className="flex-grow">
                              <Link href={`/product/${item.id}`}>
                                <h5 className="font-medium text-[#6B4226] hover:underline">{item.name}</h5>
                              </Link>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1 text-sm text-[#8B5A2B]">
                                <p>Price: {item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 w-full sm:w-auto mt-3 sm:mt-0">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-[#8B5A2B] text-[#8B5A2B] hover:bg-[#F0E6D9] flex-1 sm:flex-none"
                                  onClick={() => openReviewDialog(order.id, item)}
                                >
                                  Write Review
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-[#FDF7F0] border-[#D4B08C]">
                                <DialogHeader>
                                  <DialogTitle className="text-[#6B4226]">Review {selectedProduct?.name}</DialogTitle>
                                  <DialogDescription className="text-[#8B5A2B]">
                                    Share your experience with this product.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div>
                                    <Label className="text-[#6B4226] mb-2 block">Rating</Label>
                                    <div className="flex gap-1">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                          key={star}
                                          type="button"
                                          onClick={() => setRating(star)}
                                          onMouseEnter={() => setHoveredStar(star)}
                                          onMouseLeave={() => setHoveredStar(0)}
                                          className="focus:outline-none"
                                        >
                                          <Star
                                            className={`h-8 w-8 ${
                                              (hoveredStar ? star <= hoveredStar : star <= rating)
                                                ? "fill-[#8B5A2B] text-[#8B5A2B]"
                                                : "text-[#D4B08C]"
                                            }`}
                                          />
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <Label htmlFor="review" className="text-[#6B4226] mb-2 block">
                                      Your Review
                                    </Label>
                                    <Textarea
                                      id="review"
                                      placeholder="Write your review here..."
                                      className="border-[#D4B08C] min-h-[120px]"
                                      value={reviewText}
                                      onChange={(e) => setReviewText(e.target.value)}
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button
                                    className="bg-[#8B5A2B] hover:bg-[#6B4226] text-white"
                                    onClick={handleReviewSubmit}
                                    disabled={rating === 0}
                                  >
                                    Submit Review
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <Link href={`/product/${item.id}`} className="flex-1 sm:flex-none">
                              <Button size="sm" className="bg-[#8B5A2B] hover:bg-[#6B4226] text-white w-full">
                                View Product
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Summary */}
                    <div className="mt-6 p-4 rounded-lg bg-white border border-[#E6D5C1]">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h4 className="font-medium text-[#6B4226] mb-2">Delivery Information</h4>
                          <p className="text-sm text-[#8B5A2B]">Estimated Delivery: {order.estimatedDelivery}</p>
                          <p className="text-sm text-[#8B5A2B]">Tracking Number: {order.trackingNumber}</p>
                        </div>
                        <div className="text-right">
                          <h4 className="font-medium text-[#6B4226] mb-2">Order Total</h4>
                          <p className="text-xl font-bold text-[#6B4226]">{order.total}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <Package className="h-12 w-12 mx-auto text-[#8B5A2B] opacity-50 mb-4" />
              <h3 className="text-xl font-medium text-[#6B4226] mb-2">No Orders Found</h3>
              <p className="text-[#8B5A2B]">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
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
                  <a href="/order-tracking" className="text-[#E6D5C1] hover:text-white">
                    Track Orders
                  </a>
                </li>
                <li>
                  <a href="/wishlist" className="text-[#E6D5C1] hover:text-white">
                    My Wishlist
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
