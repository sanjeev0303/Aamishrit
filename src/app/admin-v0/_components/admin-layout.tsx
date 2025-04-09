"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, ShoppingBag, Package, Settings, LogOut, Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5 mr-3" />,
      active: pathname === "/admin",
    },
    {
      href: "/admin/users",
      label: "Users",
      icon: <Users className="h-5 w-5 mr-3" />,
      active: pathname === "/admin/users",
    },
    {
      href: "/admin/products",
      label: "Products",
      icon: <ShoppingBag className="h-5 w-5 mr-3" />,
      active: pathname === "/admin/products",
    },
    {
      href: "/admin/orders",
      label: "Orders",
      icon: <Package className="h-5 w-5 mr-3" />,
      active: pathname === "/admin/orders",
    },
    {
      href: "/admin/settings",
      label: "Settings",
      icon: <Settings className="h-5 w-5 mr-3" />,
      active: pathname === "/admin/settings",
    },
  ]

  const handleSignOut = async () => {
    console.log("Sign out");
    
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
          <div className="flex items-center flex-shrink-0 px-4 mb-5">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex flex-col flex-1">
            <nav className="flex-1 px-2 space-y-1">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-md hover:bg-gray-100",
                    route.active ? "bg-gray-100 text-primary" : "text-gray-700",
                  )}
                >
                  {route.icon}
                  {route.label}
                </Link>
              ))}
            </nav>
            <div className="p-4 mt-auto">
              <Button
                variant="outline"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleSignOut}
              >
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className="absolute top-4 left-4 z-50">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <div className="flex flex-col h-full pt-5 bg-white">
            <div className="flex items-center justify-between px-4 mb-5">
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex flex-col flex-1">
              <nav className="flex-1 px-2 space-y-1">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "flex items-center px-4 py-3 text-sm font-medium rounded-md hover:bg-gray-100",
                      route.active ? "bg-gray-100 text-primary" : "text-gray-700",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {route.icon}
                    {route.label}
                  </Link>
                ))}
              </nav>
              <div className="p-4 mt-auto">
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="md:ml-64 flex-1 flex flex-col">
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
