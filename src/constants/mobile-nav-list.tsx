import { Blocks, HomeIcon, Layers, Users, Warehouse } from "lucide-react";

export const navItems = [
    { label: "Home", href: "/", icon: HomeIcon },
    { label: "Products", href: "/products", icon: Layers },
    { label: "Orders", href: "/orders", icon: Warehouse },
    { label: "Wishlist", href: "/wishlist", icon: Users },
    { label: "Inventories", href: "/#admin/inventories", icon: Blocks },
  ];
