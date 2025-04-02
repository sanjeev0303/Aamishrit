import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import { AppSidebar } from './_components/app-sidebar'
import { SiteHeader } from './_components/site-header'

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <SidebarProvider>
        <AppSidebar variant="inset" />

        <SidebarInset>
        <SiteHeader />
        <div className='py-2 px-3'>
            {children}
        </div>
        </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout
