/**
 * Imports
 */
// Redux
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Inital State
 */
const initialState = {
  isDeleteConfirmationModalActive: false,
  isAddItemModalActive: false,
  targetWishlistId: '',
  targetWishlistName: ''
}

interface WishlistDeleteObject {
  id: string;
  itemName: string;
}

/**
 * Slice
 */
const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    // Delete confirmation
    openDeleteConfirmationModal: (state, wishlistDeleteObj: PayloadAction<WishlistDeleteObject>) => {
      state.isDeleteConfirmationModalActive = true;
      const { id, itemName } = wishlistDeleteObj.payload;
      state.targetWishlistId = id;
      state.targetWishlistName = itemName;
    },
    closeDeleteConfirmationModal: (state) => {
      state.isDeleteConfirmationModalActive = false;
      state.targetWishlistId = '';
      state.targetWishlistName = '';
    },

    // Add item
    openAddItemModal: (state) => {
      state.isAddItemModalActive = true;
    },
    closeAddItemModal: (state) => {
      state.isAddItemModalActive = false;
    },
  }
})

export const {
  // Delete confirmation
  openDeleteConfirmationModal,
  closeDeleteConfirmationModal,

  // Add item
  openAddItemModal,
  closeAddItemModal
} = modal.actions
export default modal.reducer