/**
 * Imports
 */
// Redux
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
import type { WishlistType } from "@/types/WishlistType";

/**
 * Inital State
 */
const initialState = {
  isDeleteConfirmationModalActive: false,
  isAddItemModalActive: false,
  targetWishlist: {} as WishlistType
}

/**
 * Slice
 */
const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    // Delete confirmation
    openDeleteConfirmationModal: (state, wishlistDeleteObj: PayloadAction<WishlistType>) => {
      state.isDeleteConfirmationModalActive = true;
      state.targetWishlist = wishlistDeleteObj.payload;
    },
    closeDeleteConfirmationModal: (state) => {
      state.isDeleteConfirmationModalActive = false;
      state.targetWishlist = {} as WishlistType;
    },

    // Add item
    openAddItemModal: (state) => {
      state.isAddItemModalActive = true;
    },
    openEditItemModal: (state, wishlistObj: PayloadAction<WishlistType>) => {
      state.targetWishlist = wishlistObj.payload;
      state.isAddItemModalActive = true;
    },
    closeAddItemModal: (state) => {
      state.isAddItemModalActive = false;
      state.targetWishlist = {} as WishlistType;
    },
  }
})

export const {
  // Delete confirmation
  openDeleteConfirmationModal,
  closeDeleteConfirmationModal,

  // Add item
  openAddItemModal,
  openEditItemModal,
  closeAddItemModal
} = modal.actions
export default modal.reducer