"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CardAside from "./_components/cart-aside";
import CartItemCard from "./_components/cart-item-card";
import { useAppSelector } from "@/store/store";

export default function CartPage() {
  const cartItems = useAppSelector((state) => state.cartReducer.items) || [];
  const router = useRouter();

  {cartItems.length === 0 && (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-16 min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-12 border-b border-brown-200 pb-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-brown-heading via-brown-600 to-brown-500 bg-clip-text text-transparent drop-shadow-sm text-center sm:text-left">
          Your Shopping Cart
        </h1>
      </div>

      {/* Empty Cart Content */}
      <div className="flex-grow flex items-center justify-center px-4 text-center">
        <div className="w-full max-w-md flex flex-col items-center justify-center">
          <div className="w-24 h-24 bg-brown-200/50 rounded-full flex items-center justify-center shadow-inner mb-6">
            <ShoppingBag className="h-12 w-12 text-brown-heading" />
          </div>
          <h2 className="text-2xl font-semibold text-brown-text mb-2">
            Your cart is empty
          </h2>
          <p className="text-brown-text/70 mb-6 max-w-md mx-auto">
            Looks like you haven’t added any luxurious treats yet. Start browsing our premium collection.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-brown-heading via-brown-600 to-brown-500 text-white font-medium rounded-full shadow-md hover:opacity-90 transition-all px-8 py-5"
          >
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  )}

  return (
    <div className="min-h-screen bg-gradient-to-br from-brown-50 via-white to-brown-100 shadow-inner px-4 sm:px-6 lg:px-12 py-6 lg:py-10">
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-8 border-b border-brown-200 pb-3 lg:pt-6 max-sm:pt-10 md:pt-12">
    <h2 className="relative inline-block text-4xl md:text-5xl font-bold text-brown-700 mb-2">
            <span className="bg-gradient-to-r from-brown-800 via-brown-700 to-brown-600 bg-clip-text text-transparent">
              Your Shopping Cart
            </span>
          </h2>
    </div>

    {/* Grid Layout */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:h-[calc(100vh-12rem)]">
      {/* Scrollable Cart Section */}
      <div className="lg:col-span-2 flex flex-col lg:max-h-full lg:overflow-y-auto custom-scrollbar">
  <Card className="border border-brown-200 bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col flex-1">
    <CardHeader className="border-b text-brown-800 px-6">
      <CardTitle className="text-xl font-semibold tracking-wide">
        Cart Items ({cartItems.length})
      </CardTitle>
    </CardHeader>

    <CardContent className="p-0 flex-1">
      <div className="divide-y lg:max-h-[calc(100vh-200px)] lg:overflow-y-auto custom-scrollbar">
        {cartItems.map((item: any) => (
          <CartItemCard key={item.ID} item={item} />
        ))}
      </div>
    </CardContent>
  </Card>

  <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4 mb-10">
    <Button
      variant="outline"
      onClick={() => router.push("/products")}
      className="rounded-full border-brown-300 text-brown-heading hover:bg-brown-100 hover:border-brown-400 transition-all w-full sm:w-auto"
    >
      Continue Shopping
    </Button>
  </div>
</div>


      {/* Static Sidebar */}
      <div className="lg:col-span-1">
        <CardAside />
      </div>
    </div>
  </div>

  );
}
