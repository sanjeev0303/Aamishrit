import {
    HelpCircleIcon,
    LayoutDashboardIcon,
    ListIcon,
    Settings,
    SettingsIcon,
    ShoppingCartIcon,
    Users,
} from "lucide-react"



export const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatar.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/admin",
            icon: LayoutDashboardIcon,
        },
        {
            title: "Products",
            url: "/admin/products",
            icon: ListIcon,
        },
        {
            title: "Orders",
            url: "/admin/orders",
            icon: ShoppingCartIcon,
        },
        {
            title: "Users",
            url: "/admin/visitors",
            icon: Users,
        },
        {
            title: "Settings",
            url: "/admin/settings",
            icon: Settings,
        },
    ],


    navSecondary: [
        {
            title: "Settings",
            url: "#",
            icon: SettingsIcon,
        },
        {
            title: "Get Help",
            url: "#",
            icon: HelpCircleIcon,
        },
    ],
}
