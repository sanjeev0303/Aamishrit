import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/lib/utils'
import { useAppSelector } from '@/react-redux/store'
import { ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation'

const CardAside = () => {
      const cartItems = useAppSelector((state) => state.cartReducer.items) || []
    const router = useRouter()

    const subtotal = cartItems.reduce((total: any, item: any) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 500 ? 0 : 50
  const tax = subtotal * 0.05
  const total = subtotal + shipping + tax

  return (
    <div className="lg:col-span-1">
          <Card className="border-0 shadow-sm sticky top-8">
            <CardHeader className=" border-b">
              <CardTitle className="text-xl text-gray-900">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">{shipping === 0 ? "Free" : `${formatPrice(shipping)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (5%)</span>
                <span className="font-medium">{formatPrice(tax)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <Button
                className="w-full mt-6 rounded-full bg-brand-600 hover:bg-brand-700"
                onClick={() => router.push("/checkout")}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Proceed to Checkout
              </Button>

              <div className="mt-4 text-xs text-gray-500 space-y-1">
                <p>Free shipping on orders over ₹500</p>
                <p>Taxes calculated at checkout</p>
                <p>Secure payments with all major credit cards</p>
              </div>
            </CardContent>
          </Card>
        </div>
  )
}

export default CardAside
