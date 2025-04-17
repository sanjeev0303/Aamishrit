"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* It is shop nav-menu-item */}
        <NavigationMenuItem className="">
          <NavigationMenuTrigger className="bg-inherit underline hover:no-underline text-md">
            Shop
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-[#6B4226]">
            <ul className="flex flex-col gap-2 px-2 py-1  w-[18vh] text-[#E6D5C1]">
              <ListItem href="/products" title="All Products" />
              <ListItem href="/category/jaggery" title="Organic Jaggery" />
              <ListItem href="/category/cookies" title="Millte Cookies" />
              <ListItem href="/category/herbal-tea" title="Herbal Tea" />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none rounded-md  leading-none no-underline outline-none transition-colors ",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none hover:underline hover:bg-inherit">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-brown-light-text">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"
