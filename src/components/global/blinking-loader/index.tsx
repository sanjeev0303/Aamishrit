"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function BlinkingLoader() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <div
        className={`transition-all duration-700 ease-in-out ${
          isVisible ? "opacity-100 scale-100" : "opacity-50 scale-90"
        }`}
      >
        <Image
          src="/amishrit.png"
          alt="Meditation Logo"
          width={128}
          height={128}
          className="w-full h-full object-contain"
          priority
        />
      </div>
    </div>
  )
}

