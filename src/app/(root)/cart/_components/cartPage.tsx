"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { redirect, useRouter } from "next/navigation"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAppDispatch, useAppSelector } from "@/react-redux/store"
import { clearCart, removeFromCart, updateCartItemQuantity } from "@/react-redux/slices/cartSlice"

export default function CartPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector((state) => state.cartReducer.items)
  const [isProcessing, setIsProcessing] = useState(false)
  const [subtotal, setSubtotal] = useState(0)
  const [shipping, setShipping] = useState(0)
  const [tax, setTax] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const newSubtotal = cartItems.reduce((total: number, item: { price: number; quantity: number }) => total + item.price * item.quantity, 0)
    const newShipping = newSubtotal > 100 ? 0 : 10
    const newTax = newSubtotal * 0.07
    const newTotal = newSubtotal + newShipping + newTax

    setSubtotal(newSubtotal)
    setShipping(newShipping)
    setTax(newTax)
    setTotal(newTotal)
  }, [cartItems])

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    dispatch(updateCartItemQuantity({ productId, quantity: newQuantity }))
  }

  const handleRemoveItem = (productId: string, productName: string) => {
    dispatch(removeFromCart(productId))
    toast.success(`${productName} removed from cart`)
  }

  console.log("cart Items: ", cartItems.length);


  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty")
      return
    }

    setIsProcessing(true)

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
      redirect("/checkout")
    }, 1000)
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 mt-18 pt-2">
        <h1 className="lg:text-3xl text-2xl text-brown-text font-bold mb-8">Your Cart</h1>
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-brown-light-text/50 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="h-12 w-12 text-brown-heading " />
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-brown-text">Your cart is empty</h2>
          {/* <p className=" mb-8 text-brown-text/80">Looks like you haven't added anything to your cart yet.</p> */}
          <Button asChild size="lg" className="bg-brown-heading text-brown-light-text hover:bg-brown-heading/90">
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-4">
                    <div className="relative w-full sm:w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.productImages[0] || "/placeholder.svg?height=100&width=100"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <Link href={`/product/${item.id}`} className="font-medium hover:underline">
                          {item.name}
                        </Link>
                        <span className="font-medium">₹{(Number(item.price) * item.quantity).toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">₹{Number(item.price).toFixed(2)} each</p>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-r-none"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <div className="h-8 px-4 flex items-center justify-center border-y border-x-0 border-input">
                            {item.quantity}
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-l-none"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleRemoveItem(item.id, item.name)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between p-6 pt-0 border-t">
              <Button variant="outline" onClick={() => router.push("/products")}>
                Continue Shopping
              </Button>
              <Button variant="ghost" className="text-red-500" onClick={() => dispatch(clearCart())}>
                Clear Cart
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button className="w-full" size="lg" onClick={handleCheckout} disabled={isProcessing}>
                {isProcessing ? "Processing..." : "Proceed to Checkout"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
