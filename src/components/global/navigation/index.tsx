"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MenuIcon, SearchIcon, ShoppingCartIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { navItems } from "@/constants/mobile-nav-list"
import { useIsMobile, useIsTablet } from "@/hooks/useMobile"
import { NavigationMenuDemo } from "./navigation-menu"
import UserButton from "./use-button"
import { useRouter } from "next/navigation"

const NavigationBar = () => {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()

  const router = useRouter()

  return (
    <div className="bg-gradient-to-r from-brown-400 via-brown-500 to-brown-600 shadow-md w-full">
      {isMobile || isTablet ? (
        <div className="w-full flex justify-between sm:landscape:pt-4 px-4 py-2 pt-4 bg-white shadow-md">
          <div>
            <Sheet>
              <SheetTrigger>
                <MenuIcon className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col w-[55%]">
                <div>
                  <h2 id="dialog-title" className="sr-only">
                    Navigation Menu
                  </h2>
                </div>
                <nav className="flex flex-col gap-2 text-lg font-medium ml-2 " aria-labelledby="dialog-title">
                  <div>
                      <Image
                        src={"/logo.png"}
                        alt="logo"
                        width={70}
                        height={50}
                        priority={true}
                        className="object-contain"
                      />
                  </div>

                  <div className="overflow-y-auto">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary "
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          <div>
            <Image src={"/logo.png"} alt="logo" width={10} height={10} className="object-contain" />
          </div>
          <div className="flex gap-5 ">
            <SearchIcon className="w-6 h-6" />
            <ShoppingCartIcon className="w-6 h-6" onClick={() => router.push("/cart")} />
          </div>
        </div>
      ) : (
        <div className="w-full px-8 py-3 flex items-center justify-between bg-white shadow-md">
          <div className="flex gap-8">
            <Link href={"/"}>
              <Image src={"/logo.png"} alt="logo" width={50} height={40} priority={true} />
            </Link>
          </div>

          <div className="flex gap-8 items-center">
            <NavigationMenuDemo />
            <div className="flex gap-5 items-center">
              <UserButton />
              <Link href={"/cart"}>
                <ShoppingCartIcon className="w-7 h-7" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NavigationBar
