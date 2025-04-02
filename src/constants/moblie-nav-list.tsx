import { HomeIcon, Layers, Warehouse, Users, ShoppingCart, Blocks } from "lucide-react";

export const navItems = [
    { label: "Dashboard", href: "/#admin", icon: HomeIcon },
    { label: "Products", href: "/#admin/products", icon: Layers },
    { label: "Warehouses", href: "/#admin/warehouses", icon: Warehouse },
    { label: "Deliver Persons", href: "/#admin/delivery-persons", icon: Users },
    { label: "Orders", href: "/#admin/orders", icon: ShoppingCart },
    { label: "Inventories", href: "/#admin/inventories", icon: Blocks },
  ];
