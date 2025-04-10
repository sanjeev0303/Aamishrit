import { onAuthenticateUser } from '@/actions/user'
import NavigationBar from '@/components/global/navigation'
import { redirect } from 'next/navigation'
import React from 'react'
import { Toaster } from 'sonner'

const RootLayout = async ({children}: {children: React.ReactNode}) => {

    return (
    <div className='select-none relative'>
    <NavigationBar  />
    <main className='mt-16'>
    {children}
    <Toaster />
    </main>
  </div>
  )
}

export default RootLayout
