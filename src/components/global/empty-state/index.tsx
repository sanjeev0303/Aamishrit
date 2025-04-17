import { ShoppingCart, Heart, User, Search, ShoppingBag, Package } from "lucide-react"
import type { ReactNode } from "react"

interface EmptyStateProps {
  title: string
  description: string
  icon: "shopping-cart" | "heart" | "user" | "search" | "shopping-bag" | "package"
  action?: ReactNode
}

export default function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  const getIcon = () => {
    switch (icon) {
      case "shopping-cart":
        return <ShoppingCart className="h-16 w-16 text-brown-800/50" />
      case "heart":
        return <Heart className="h-16 w-16 text-brown-800/50" />
      case "user":
        return <User className="h-16 w-16 text-brown-800/50" />
      case "search":
        return <Search className="h-16 w-16 text-brown-800/50" />
      case "shopping-bag":
        return <ShoppingBag className="h-16 w-16 text-brown-800/50" />
      case "package":
        return <Package className="h-16 w-16 text-brown-800/50" />
      default:
        return <ShoppingCart className="h-16 w-16 text-brown-800/50" />
    }
  }

  return (
    <div className="empty-state w-full h-screen flex items-center flex-col justify-center
    ">
      <div className="">{getIcon()}</div>
      <h2 className="text-center text-brown-800 font-semibold text-3xl mt-3">{title}</h2>
      <p className="text-center text-brown-700/90 mb-5">{description}</p>
      {action}
    </div>
  )
}
