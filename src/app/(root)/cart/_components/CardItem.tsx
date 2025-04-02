import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type CartItemProps = {
  cartItem: any
  onQuantityChange?: (productId: string, newQuantity: number) => void
  onRemove?: (productId: string) => void
}

const CartItem = ({ cartItem: { photo, name, price, stock, quantity, productId } }: CartItemProps) => {
  return (
    <div className="flex flex-col sm:flex-row w-full border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="w-full sm:w-1/3 h-48 sm:h-auto relative">
        <Image src={photo || "/placeholder.svg"} alt={name} fill className="object-cover" />
      </div>
      <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
        <article className="flex flex-col space-y-1">
          <Link href={`/product/${productId}`} className="text-lg font-medium hover:text-primary transition-colors">
            {name}
          </Link>
          <span className="text-xl font-bold">₹{price}</span>
          <span className="text-sm text-gray-500">In Stock: {stock}</span>
        </article>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 w-full sm:w-auto justify-between">
          <div className="flex items-center gap-3">
            <Button size="icon" variant="outline" className="h-8 w-8 rounded-full">
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <Button size="icon" variant="outline" className="h-8 w-8 rounded-full">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-red-600 hover:bg-red-50">
            <Trash2 className="h-5 w-5" />
            <span className="sr-only">Remove item</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
