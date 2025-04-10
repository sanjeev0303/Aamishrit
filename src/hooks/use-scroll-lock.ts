"use client"

import { useEffect } from "react"

export function useScrollLock(shouldLock: boolean) {
  useEffect(() => {
    if (shouldLock) {
      // Save the current scroll position
      const scrollY = window.scrollY

      // Add styles to prevent body scrolling
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
      document.body.style.overflowY = "hidden"

      return () => {
        // Remove styles and restore scroll position when component unmounts
        document.body.style.position = ""
        document.body.style.top = ""
        document.body.style.width = ""
        document.body.style.overflowY = ""
        window.scrollTo(0, scrollY)
      }
    }
  }, [shouldLock])
}

