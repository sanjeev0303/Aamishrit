"use client"

import { type LucideIcon } from "lucide-react"

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import { useRouter } from "next/navigation"

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
              <SidebarMenuButton className="mt-3" onClick={() => {
                router.push(`${item.url}`);
                if (isMobile) toggleSidebar();
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
