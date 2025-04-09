import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
// Removed unused import
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { User2 } from 'lucide-react'
import { User } from '@prisma/client'



const UserButton = ({user}: {user: User}) => {

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
