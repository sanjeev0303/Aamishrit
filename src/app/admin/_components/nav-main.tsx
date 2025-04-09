"use client"

import { MailIcon, PlusCircleIcon, type LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
import { useIsMobile } from "@/hooks/use-mobile"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
  }[]
}) {

    const router = useRouter()
    const {toggleSidebar} = useSidebar()
    const isMobile = useIsMobile()

  return (
    <SidebarGroup className="mt-[-7px]">
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title} >
              <SidebarMenuButton className="mt-3" onClick={(event) => {
                router.push(`${item.url}`)
                {
                    isMobile && toggleSidebar()
                }

              }} tooltip={item.title}>
                {item.icon && <item.icon className="w-7 h-7 mr-5" />}
                <span className="text-md font-medium text-gray-700">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
