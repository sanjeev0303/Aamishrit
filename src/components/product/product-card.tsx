"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart } from "lucide-react"
import { toast } from "sonner"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/types"
import { useWishlist } from "@/context/wishlist-context" // Keep wishlist in context for now
import { addToCart } from "@/react-redux/slices/cartSlice"
import { useAppDispatch } from "@/react-redux/store"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [isWishlisted, setIsWishlisted] = useState(isInWishlist(product.id))

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(addToCart(product))
    toast.success(`${product.name} added to cart`)
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isWishlisted) {
      removeFromWishlist(product.id)
      toast.success(`${product.name} removed from wishlist`)
    } else {
      addToWishlist(product)
      toast.success(`${product.name} added to wishlist`)
    }

    setIsWishlisted(!isWishlisted)
  }

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
        <div className="relative w-full h-[30vh]">
          <Image
            src={product.productImages[0] || "/Amishrit.png"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
            className="object-cover"
          />
          {product.onSale && <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">Sale</Badge>}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
            onClick={handleToggleWishlist}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </Button>
        </div>
        <CardContent className="p-4 flex-grow">
          <h3 className="font-medium line-clamp-1">{product.name}</h3>
          <p className="text-sm text-gray-500 line-clamp-2 mt-1">{product.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="flex items-baseline gap-2">
            <span className="font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.price}</span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-primary/10 hover:bg-primary/20 text-primary"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
