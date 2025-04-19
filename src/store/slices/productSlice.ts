import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { Product } from "@/types"
import { getAllProducts } from "@/api/products"

interface ProductState {
  items: Product[]
  filteredItems: Product[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
  currentPage: number
  totalPages: number
  itemsPerPage: number
  filters: {
    category?: string
    minPrice?: number
    maxPrice?: number
    search?: string
  }
}

const initialState: ProductState = {
  items: [],
  filteredItems: [],
  status: "idle",
  error: null,
  currentPage: 1,
  totalPages: 1,
  itemsPerPage: 12,
  filters: {},
}

export const fetchProducts = createAsyncThunk("products/fetchProducts", async (limit, { rejectWithValue }) => {
  try {
    const response = await getAllProducts()
    return response
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message)
    }
    return rejectWithValue("Failed to fetch products")
  }
})

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload
      state.totalPages = Math.ceil(state.filteredItems.length / action.payload)
    },
    applyFilters: (state, action: PayloadAction<Partial<ProductState["filters"]>>) => {
      state.filters = { ...state.filters, ...action.payload }

      // Apply filters to items
      let filtered = [...state.items]

      if (state.filters.category) {
        filtered = filtered.filter((item) => item.Category[0].name === state.filters.category)
      }

      if (state.filters.minPrice !== undefined) {
        filtered = filtered.filter((item) => item.price >= (state.filters.minPrice || 0))
      }

      if (state.filters.maxPrice !== undefined) {
        filtered = filtered.filter((item) => item.price <= (state.filters.maxPrice || Number.POSITIVE_INFINITY))
      }

      if (state.filters.search) {
        const searchTerm = state.filters.search.toLowerCase()
        filtered = filtered.filter(
          (item) => item.name.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm),
        )
      }

      state.filteredItems = filtered
      state.totalPages = Math.ceil(filtered.length / state.itemsPerPage)
      state.currentPage = 1 // Reset to first page when filters change
    },
    clearFilters: (state) => {
      state.filters = {}
      state.filteredItems = state.items
      state.totalPages = Math.ceil(state.items.length / state.itemsPerPage)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = "succeeded"
        state.items = action.payload
        state.filteredItems = action.payload
        state.totalPages = Math.ceil(action.payload.length / state.itemsPerPage)
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload as string
      })
  },
})

export const { setCurrentPage, setItemsPerPage, applyFilters, clearFilters } = productSlice.actions

export default productSlice.reducer
