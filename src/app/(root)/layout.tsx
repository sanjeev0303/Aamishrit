import Footer from '@/components/global/footer'
import NavigationBar from '@/components/global/navigation'
import React from 'react'

const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='select-none relative'>
    <NavigationBar />
    {children}

  </div>
  )
}

export default RootLayout
