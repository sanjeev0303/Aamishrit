import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Product } from "@/types"

export interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

// Load cart from localStorage if available
if (typeof window !== "undefined") {
  const savedCart = localStorage.getItem("cart")
  if (savedCart) {
    try {
      initialState.items = JSON.parse(savedCart)
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error)
    }
  }
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product | CartItem>) => {
      const product = action.payload
      const existingItemIndex = state.items.findIndex((item) => item.id === product.id)

      if (existingItemIndex !== -1) {
        // If product already exists in cart, increase quantity
        const newQuantity =
          "quantity" in product
            ? state.items[existingItemIndex].quantity + product.quantity
            : state.items[existingItemIndex].quantity + 1

        state.items[existingItemIndex].quantity = newQuantity
      } else {
        // Add new product to cart
        state.items.push({
          ...product,
          quantity: "quantity" in product ? product.quantity : 1,
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
    updateCartItemQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload
      const itemIndex = state.items.findIndex((item) => item.id === productId)

      if (itemIndex !== -1 && quantity > 0) {
        state.items[itemIndex].quantity = quantity
      }

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.items))
      }
    },
    clearCart: (state) => {
      state.items = []

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify([]))
      }
    },
  },
})

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } = cartSlice.actions

export default cartSlice.reducer
