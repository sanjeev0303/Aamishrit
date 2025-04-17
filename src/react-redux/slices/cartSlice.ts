import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { CartItem, Product } from "@/types"

interface CartState {
  items: CartItem[],
  isOpen: boolean
}

// Initialize state from localStorage if available
const getInitialState = (): CartState => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        return { items: JSON.parse(savedCart), isOpen: false }
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }
  return { items: [], isOpen: false }
}

const initialState: CartState = getInitialState()

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItemIndex = state.items.findIndex((item) => item.id === action.payload.id)

      if (existingItemIndex >= 0) {
        // Increment quantity if item already exists
        state.items[existingItemIndex].quantity += 1
      } else {
        // Add new item with quantity 1
        state.items.push({
          ...action.payload,
          quantity: 1,
        })
      }

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.items))
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.items))
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload
      const itemIndex = state.items.findIndex((item) => item.id === id)

      if (itemIndex >= 0) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          state.items = state.items.filter((item) => item.id !== id)
        } else {
          // Update quantity
          state.items[itemIndex].quantity = quantity
        }

        // Save to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(state.items))
        }
      }
    },
    clearCart: (state) => {
      state.items = []

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify([]))
      }
    },

      toggleCart: (state) => {
        state.isOpen = !state.isOpen
      },
      closeCart: (state) => {
        state.isOpen = false
      },
      openCart: (state) => {
        state.isOpen = true
      },
      setCartItems: (state, action: PayloadAction<CartItem[]>) => {
        state.items = action.payload
      },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, openCart } = cartSlice.actions

export default cartSlice.reducer
