"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, ShoppingCart, User, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Footer from "@/components/global/footer"

export default function WishlistPage() {
  // In a real app, you would fetch this from an API or local storage
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 101,
      name: "Artisanal Jaggery Block",
      description:
        "Our premium Artisanal Jaggery Block is handcrafted using traditional methods that have been passed down through generations.",
      price: "$89.99",
      image: "/placeholder.svg?height=200&width=200",
      stock: 15,
    },
    {
      id: 102,
      name: "Organic Jaggery Powder",
      description: "Finely ground organic jaggery powder for easy use in cooking and baking.",
      price: "$59.99",
      image: "/placeholder.svg?height=200&width=200",
      stock: 23,
    },
    {
      id: 103,
      name: "Premium Jaggery Gift Box",
      description: "Assorted jaggery varieties presented in an elegant gift box.",
      price: "$39.98",
      image: "/placeholder.svg?height=200&width=200",
      stock: 7,
    },
  ])

  const [itemToRemove, setItemToRemove] = useState<number | null>(null)

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-[#FDF7F0]">

      {/* Main Content */}
      <main className="container mx-auto px-4 mt-18 pt-2 mb-10">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#6B4226]">My Wishlist</h2>
          <p className="text-[#8B5A2B] mt-2">Products you've saved for later</p>
        </div>

        {/* Wishlist Items */}
        {wishlistItems.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="border-[#D4B08C] bg-[#FDF7F0] overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-[200px] w-full">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <Link href={`/product/${item.id}`}>
                      <h3 className="font-medium text-[#6B4226] hover:underline">{item.name}</h3>
                    </Link>
                    <p className="text-sm text-[#8B5A2B] mt-2 line-clamp-2">{item.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="font-bold text-[#6B4226]">{item.price}</span>
                      <Badge className={item.stock > 0 ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}>
                        {item.stock > 0 ? `In Stock (${item.stock})` : "Out of Stock"}
                      </Badge>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button className="bg-[#8B5A2B] hover:bg-[#6B4226] text-white flex-1" disabled={item.stock <= 0}>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="border-[#8B5A2B] text-[#8B5A2B] hover:bg-[#F0E6D9]"
                            onClick={() => setItemToRemove(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-[#FDF7F0] border-[#D4B08C]">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-[#6B4226]">Remove from Wishlist</AlertDialogTitle>
                            <AlertDialogDescription className="text-[#8B5A2B]">
                              Are you sure you want to remove this item from your wishlist?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="border-[#D4B08C] text-[#8B5A2B]">Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-[#8B5A2B] hover:bg-[#6B4226] text-white"
                              onClick={() => removeFromWishlist(itemToRemove!)}
                            >
                              Remove
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg border border-[#D4B08C]">
            <Heart className="h-16 w-16 mx-auto text-[#8B5A2B] opacity-30 mb-4" />
            <h3 className="text-xl font-medium text-[#6B4226] mb-2">Your Wishlist is Empty</h3>
            <p className="text-[#8B5A2B] mb-6">Browse our products and add items to your wishlist</p>
            <Link href="/">
              <Button className="bg-[#8B5A2B] hover:bg-[#6B4226] text-white">Explore Products</Button>
            </Link>
          </div>
        )}
      </main>

      {/* Footer */}
     <Footer />
    </div>
  )
}
