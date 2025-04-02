import Image from 'next/image'
import React, {Suspense} from 'react'
import {easeInOut, motion} from "framer-motion"
import { Loader2 } from 'lucide-react'

const HeroImage = () => {
  return (
    <Suspense fallback={<Loader2 className='animate-spin text-white' />}>
        <motion.div
    className='w-full lg:h-[92vh] md:h-[75vh] bg-black'>
        <Image src={"/gudworld.avif"} alt='hero-image' width={1500} height={1000} className='object-cover size-full max-sm:h-[40vh]' />
    </motion.div>
    </Suspense>
  )
}

export default HeroImage
