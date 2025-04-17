"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User2 } from "lucide-react"
import Link from "next/link"

const UserButton = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <User2 className="w-7 h-7" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-[#6B4226] border-[#8B5A2B]">
          <DropdownMenuLabel className="text-[#E6D5C1]">
            <div>MY Account</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-[#8B5A2B]" />
          <DropdownMenuItem className="text-[#E6D5C1]">Profile</DropdownMenuItem>
          <DropdownMenuItem className="text-[#E6D5C1]">
            <Link href={"/orders"}>Order</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-[#E6D5C1]">
            <Link href={"/wishlist"}>Wishlist</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default UserButton
