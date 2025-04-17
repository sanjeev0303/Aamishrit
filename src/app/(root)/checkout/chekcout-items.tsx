import Image from "next/image"
import Link from "next/link"
import type { CartItem } from "@/types"

interface CheckoutItemsProps {
  items: CartItem[]
}

export default function CheckoutItems({ items }: CheckoutItemsProps) {
  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div key={item.id} className="flex gap-4">
          <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
            <Image
              src={item.productImages[0] || "/placeholder.svg?height=64&width=64"}
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
              <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              ₹{item.price} × {item.quantity}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
