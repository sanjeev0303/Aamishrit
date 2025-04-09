"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useWishlist } from "@/context/wishlist-context"
import { useCart } from "@/context/cart-context"

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleRemoveItem = (productId: string, productName: string) => {
    removeFromWishlist(productId)
    toast.success(`${productName} removed from wishlist`)
  }

  const handleAddToCart = (product: any) => {
    addToCart(product)
    toast.success(`${product.name} added to cart`)
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Heart className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-8">Save items you love for later.</p>
          <Button asChild size="lg">
            <Link href="/products">Explore Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Wishlist</h1>
        <Button variant="outline" onClick={() => clearWishlist()}>
          Clear Wishlist
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={item.images[0] || "/placeholder.svg?height=300&width=300"}
                alt={item.name}
                fill
                className="object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full text-red-500"
                onClick={() => handleRemoveItem(item.id, item.name)}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
            <CardContent className="p-4">
              <Link href={`/product/${item.id}`} className="font-medium hover:underline">
                {item.name}
              </Link>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
              <div className="mt-2 font-bold">${item.price.toFixed(2)}</div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full" onClick={() => handleAddToCart(item)}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

