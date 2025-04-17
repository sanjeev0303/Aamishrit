import ScrollNavigation from '@/components/global/navigation/scroll-navigation'
import React from 'react'

const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (

      <div className="flex flex-col min-h-screen">
          <ScrollNavigation />
          <main className="flex-grow lg:pt-4 pt-12 md:pt-12">{children}</main>
      </div>

  )
}

export default RootLayout
