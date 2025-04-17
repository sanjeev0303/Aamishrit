import { Home, ShoppingBag, Heart, User, Settings, HelpCircle, LogOut } from "lucide-react"

export const navItems = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Shop",
    href: "/products",
    icon: ShoppingBag,
  },
  {
    label: "Wishlist",
    href: "/wishlist",
    icon: Heart,
  },
  {
    label: "Account",
    href: "/account",
    icon: User,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    label: "Help",
    href: "/help",
    icon: HelpCircle,
  },
  {
    label: "Logout",
    href: "/logout",
    icon: LogOut,
  },
]
