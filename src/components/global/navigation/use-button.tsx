"use client"

import { onAuthenticateUser } from "@/actions/user"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from '@prisma/client'
import { User2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from "react"



const UserButton = () => {

   const [user, setUser] = useState<User | null>(null)

   useEffect(() => {
    const fetchUser = async () => {
      const {user} = await onAuthenticateUser()
      setUser(user || null)
    }

    fetchUser()
   }, [])


  return (
    <div>
        <DropdownMenu>
  <DropdownMenuTrigger asChild >
    {
        user ? (
            <div className=' w-8 h-8 overflow-hidden rounded-full'>
                <Image
                src={user.profileImage || ""}
                alt="User Profile"
                width={50}
                height={50}
                className='object-contain w-full h-full'
                />
            </div>
        ):(
            <div>
                <User2 />
            </div>
        )
    }
  </DropdownMenuTrigger>
  <DropdownMenuContent className='bg-[#6B4226] border-[#8B5A2B]'>
    <DropdownMenuLabel className='text-[#E6D5C1]'>
        {
            user ? (
                <div>{user.name}</div>
            ):(
                <div>MY Account</div>
            )
        }
    </DropdownMenuLabel>
    <DropdownMenuSeparator className='bg-[#8B5A2B]' />
    <DropdownMenuItem className='text-[#E6D5C1]'>Profile</DropdownMenuItem>
    <DropdownMenuItem className='text-[#E6D5C1]'>
        <Link href={"/orders"}>
        Order
        </Link>
    </DropdownMenuItem>
    <DropdownMenuItem className='text-[#E6D5C1]'>
        <Link href={"/wishlist"}>
        Wishlist
        </Link>
    </DropdownMenuItem>

  </DropdownMenuContent>
</DropdownMenu>
    </div>
  )
}

export default UserButton
