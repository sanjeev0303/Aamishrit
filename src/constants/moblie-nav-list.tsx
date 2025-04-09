import { HomeIcon, Layers, Warehouse, Users, ShoppingCart, Blocks } from "lucide-react";

export const navItems = [
    { label: "Home", href: "/", icon: HomeIcon },
    { label: "Products", href: "/products", icon: Layers },
    { label: "Orders", href: "/orders", icon: Warehouse },
    { label: "Wishlist", href: "/wishlist", icon: Users },
    { label: "Inventories", href: "/#admin/inventories", icon: Blocks },
  ];
