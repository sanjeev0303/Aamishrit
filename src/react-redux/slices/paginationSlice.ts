import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface PaginationState {
  currentPage: number
  itemsPerPage: number
  totalItems: number
}

const initialState: PaginationState = {
  currentPage: 1,
  itemsPerPage: 12,
  totalItems: 0,
}

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload
      // Reset to first page when changing items per page
      state.currentPage = 1
    },
    setTotalItems: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload
    },
    resetPagination: (state) => {
      state.currentPage = 1
    },
  },
})

export const { setCurrentPage, setItemsPerPage, setTotalItems, resetPagination } = paginationSlice.actions

export default paginationSlice.reducer
