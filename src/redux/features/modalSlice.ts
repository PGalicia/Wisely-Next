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
  }
})

export const {
  openDeleteConfirmationModal,
  closeDeleteConfirmationModal,
} = modal.actions
export default modal.reducer