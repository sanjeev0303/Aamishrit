"use client";

import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { addToCart, openCart } from "@/store/slices/cartSlice";
import {
    clearWishlist,
    removeFromWishlist,
} from "@/store/slices/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Product } from "@/types";
import { useEffect, useState } from "react";

const WishlistPage = () => {
  const [mounted, setMounted] = useState(false);
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items || []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRemoveItem = (productId: string, productName: string) => {
    dispatch(removeFromWishlist(productId));
    toast.success(`${productName} removed from wishlist`);
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ ...product }));
    dispatch(openCart());
    toast.success(`${product.name} added to cart`);
  };

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
    toast.success("Wishlist cleared");
  };

  if (!mounted) {
    return null;
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 pt-16">
        <h1 className="text-3xl font-bold mb-8 text-brown-800">
          Your Wishlist
        </h1>
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-brown-200 rounded-full flex items-center justify-center mb-6">
            <Heart className="h-12 w-12 text-cocoa/80" />
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-brown-800/90">
            Your wishlist is empty
          </h2>
          <p className=" mb-8 text-brown-700/90">Save items you love for later.</p>
          <Button asChild size="lg" className="bg-brown-300 hover:bg-brown-200 text-brown-700 hover:text-brown-800">
            <Link href="/products">Explore Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!mounted) {
    return null; // Prevents hydration error
  }

  const unitMap: Record<string, string> = {
    "Jaggery": "/kg",
    "Herbal Tea": "/30g",
    "Cookies": "/200g",
  };


  return (
    <div className=" mx-auto px-4 py-12 pt-16 bg-gradient-to-br from-brown-50 via-white to-brown-100 rounded-2xl shadow-inner">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-12 border-b border-brown-200 pb-6">
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-brown-800 via-brown-700 to-brown-600 drop-shadow-sm bg-clip-text text-transparent text-center sm:text-left">
      Your Wishlist
    </h1>

    <Button
      variant="outline"
      className="w-full sm:w-auto text-brown-800 border border-brown-700 bg-brown-200 hover:bg-brown-100 hover:text-brown-800 transition-all px-5 py-2 rounded-full shadow-sm"
      onClick={handleClearWishlist}
    >
      Clear Wishlist
    </Button>
  </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {wishlistItems.map((item) => (
        <div key={item.ID} className="overflow-hidden rounded-2xl shadow-md bg-brown-100 backdrop-blur-md border border-brown-100 transition-all duration-300 hover:shadow-lg">
         <Link href={`/products/${item.ID}`}>
         <div className="relative bg-white rounded-t-2xl overflow-hidden">
            <Image
              src={
                item.images && item.images.length > 0
                  ? item.images[0]
                  : "/placeholder.svg?height=300&width=300"
              }
              alt={item.name}
              width={300}
              height={200}
              className="object-contain transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute top-2 right-2 flex flex-col gap-2 items-center">

            <button
                  onClick={() => handleAddToCart(item)}
                  className="w-9 h-9 bg-brown-300 hover:bg-brown-200 text-brown-800 flex items-center justify-center rounded-full shadow transition-colors"
                >
                  <ShoppingCart className="h-5 w-5 p-[2px]" />
                </button>

            <Button
              variant="ghost"
              size="icon"
              className=" bg-brown-200 hover:bg-brown-100 rounded-full text-brown-800 hover:text-red-600 shadow"
              onClick={() => handleRemoveItem(String(item.ID), item.name)}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
            </div>
          </div>
         </Link>

          <CardContent className="px-5 py-3 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <Link
                  href={`/products/${item.ID}`}
                  className="font-semibold text-brown-800 hover:underline text-lg"
                >
                  {item.name}
                </Link>
                <div className="mt-1 font-bold text-brown-700">
                  {formatPrice(item.price)}{unitMap[item?.Category[0]?.name] || ""}
                </div>
              </div>
              <div>

              </div>
            </div>
          </CardContent>
        </div>
      ))}
    </div>
  </div>

  );
};

export default WishlistPage;
