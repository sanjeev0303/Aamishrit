"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navItems } from "@/constants/moblie-nav-list";
import { useIsMobile, useIsTablet } from "@/hooks/use-mobile";
import { User } from "@prisma/client";
import {
    MenuIcon,
    SearchIcon,
    ShoppingCartIcon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NavigationMenuDemo } from "./navigation-menu";
import UserButton from "./use-button";



type NavigationBarProps = {
    user: User
}


const NavigationBar = ({user}: NavigationBarProps) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  return (
    <div className="bg-gradient-to-r from-[#8B5A2B] to-[#A67C52] shadow-md">
      {isMobile || isTablet ? (
        <div className="fixed top-0 z-10 w-full flex justify-between sm:landscape:pt-4 px-4 py-2 pt-4 bg-gradient-to-r from-[#8B5A2B] to-[#A67C52] shadow-md">
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
                <nav
                  className="flex flex-col gap-2 text-lg font-medium ml-2 "
                  aria-labelledby="dialog-title"
                >
                  <div>
                    <Link
                      href="/"
                      className="flex items-center gap-2 text-lg  mb-2  ml-2 "
                    >
                      <Image
                        src={"/logo.png"}
                        alt="logo"
                        width={150}
                        height={50}
                        priority={true}
                        className="object-contain"
                      />
                    </Link>
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
            <Image
              src={"/logo.png"}
              alt="logo"
              width={120}
              height={50}
              className="object-contain"
            />
          </div>
          <div className="flex gap-5 ">
            <SearchIcon className="w-6 h-6" />
            <ShoppingCartIcon className="w-6 h-6" />
          </div>
        </div>
      ) : (
        <div className="w-full fixed top-0 z-10  px-12 py-3 flex items-center justify-between pt-5 bg-gradient-to-r from-[#8B5A2B] to-[#A67C52] shadow-md">
          <div className="flex gap-8">
           <Link href={"/"}>
           <Image src={"/logo.png"} alt="logo" width={170} height={100} priority={true} />
           </Link>
          </div>

         <div className="flex gap-8 items-center">
         <NavigationMenuDemo />
         <div className="flex gap-5 items-center">
            <UserButton user={user} />
            <Link href={"/cart"}>
            <ShoppingCartIcon className="w-7 h-7" />
            </Link>
          </div>
         </div>
        </div>
      )}
    </div>
  );
};

export default NavigationBar;
