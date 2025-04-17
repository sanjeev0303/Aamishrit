import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { removeFromCart, updateQuantity } from "@/react-redux/slices/cartSlice";
import { useAppDispatch } from "@/react-redux/store";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

const CartItemCard = ({
  item,
}: {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    productImages: string[];
  };
}) => {
//   const cartItems = useAppSelector((state) => state.cartReducer.items) || [];
  const dispatch = useAppDispatch();

  const handleRemoveItem = (id: string, name: string) => {
    dispatch(removeFromCart(id));
    toast.success(`${name} removed from cart`);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  return (
    <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 group">
      <div className="relative h-24 w-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={item.productImages[0] || "/placeholder.svg?height=96&width=96"}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between">
          <Link
            href={`/product/${item.id}`}
            className="font-medium text-gray-900 hover:text-brand-600 transition-colors"
          >
            {item.name}
          </Link>
          <span className="font-medium">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          {formatPrice(item.price)} × {item.quantity}
        </p>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center border rounded-full overflow-hidden">
            <button
              className="px-3 py-1 hover:bg-gray-100 hover:text-brand-600"
              onClick={() =>
                handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
              }
              disabled={item.quantity <= 1}
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-4 py-1 border-x">{item.quantity}</span>
            <button
              className="px-3 py-1 hover:bg-gray-100 hover:text-brand-600"
              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
            >
             <Plus className="h-3 w-3" />
            </button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => handleRemoveItem(item.id, item.name)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
