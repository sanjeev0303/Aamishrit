"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Suspense, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const HeroImage = () => {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (imageRef.current && window.innerWidth >= 1024) {
        const viewportHeight = window.innerHeight;
        imageRef.current.style.height = `${viewportHeight * 0.92}px`;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Suspense
    fallback={
      <div className="flex items-center justify-center w-full h-screen bg-brown-900">
        <Loader2 className="animate-spin text-white" />
      </div>
    }
  >
    <motion.div
      ref={imageRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full lg:min-h-screen md:h-[75vh] max-sm:h-[40vh] relative overflow-hidden select-none bg-brown-900"
    >
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2 }}
        className="w-full h-full"
      >
        <Image
          src="/Background-1.jpg"
          alt="hero-image"
          width={1500}
          height={1000}
          priority
          className="object-cover w-full h-full max-sm:h-[40vh] bg-brown-900"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Gradient Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute flex items-center flex-col lg:bottom-28 max-sm:bottom-5 md:bottom-28 left-0 right-0 p-6   text-white"
      >
        <h1 className="text-4xl md:text-7xl lg:text-9xl font-serif font-bold text-brown-50 drop-shadow-md text-center">
          Aamishrit
        </h1>
        <p className="text-lg md:text-2xl lg:text-3xl mt-2 text-brown-100 max-w-2xl leading-relaxed drop-shadow text-center font-semibold">
          Purity you taste, Quality you can trust.
        </p>
      </motion.div>
    </motion.div>
  </Suspense>

  );
};

export default HeroImage;
