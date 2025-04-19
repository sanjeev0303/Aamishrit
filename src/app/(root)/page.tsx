"use client"

import { useEffect } from "react"
import ShopSection from "./_components/shop"
import ProductShowcase from "./_components/product-showcase"
import AboutSection from "./_components/about"
import Footer from "@/components/global/footer"
import { motion, useAnimation } from "framer-motion"
import  HeroImage  from "./_components/hero-image"

const RootPage = () => {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    })
  }, [controls])

  return (
    <motion.div className="flex flex-col items-center w-full" initial={{ opacity: 0, y: 20 }} animate={controls}>
     <HeroImage />
      <ShopSection />
      <ProductShowcase />
      <AboutSection />
      <Footer />
    </motion.div>
  )
}

export default RootPage
