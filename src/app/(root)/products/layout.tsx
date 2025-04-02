"use client"



import React, { useState } from 'react'

const ProductLayout = ({children}: {children: React.ReactNode}) => {



    return (
    <div className='lg:mt-18 mt-14 px-4 lg:px-8 bg-brown-background min-h-dvh'>
        {children}
    </div>
  )
}

export default ProductLayout
