import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Product } from "@/types"

interface WishlistState {
  items: Product[]
}

// Initialize state from localStorage if available
const getInitialState = (): WishlistState => {
  if (typeof window !== "undefined") {
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      try {
        return { items: JSON.parse(savedWishlist) }
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage:", error)
      }
    }
  }
  return { items: [] }
}

const initialState: WishlistState = getInitialState()

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (!existingItem) {
        state.items.push(action.payload)
        // Save to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("wishlist", JSON.stringify(state.items))
        }
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(state.items))
      }
    },
    clearWishlist: (state) => {
      state.items = []
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify([]))
      }
    },
  },
})

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions

export default wishlistSlice.reducer
