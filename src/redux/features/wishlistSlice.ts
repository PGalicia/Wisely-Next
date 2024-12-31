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
  wishlists: [] as WishlistType[],
  budget: -1
}

/**
 * Slice
 */
const wishlist = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlist: (state, item: PayloadAction<WishlistType[]>) => {
      state.wishlists = item.payload
    },
    setBudget: (state, item: PayloadAction<number>) => {
      state.budget = item.payload;
    },
    addWishlist: (state, item: PayloadAction<WishlistType>) => {
      // Is the new wishlist inserted
      let inserted = false;

      for (let i = 0; i < state.wishlists.length; i++) {
        const {priority, targetAmount} = item.payload;
        const {priority: currentPriority, targetAmount: currentTargetAmount} = state.wishlists[i];

        /**
         * Insertion rules:
         *  - Priority: Same priority OR priority is higher than current available priority
         *  - Target amount: If same priority, place it where the targetAmount is greater than currentTargetAmount
         */
        if (
          !inserted && // Ensure we insert only once
          (
            priority! > currentPriority! ||
            (currentPriority === priority && targetAmount > currentTargetAmount )
          )
        ) {
          state.wishlists.splice(i, 0, item.payload); // Insert at the found index
          inserted = true;
          break; // Exit loop after insertion
        }
      }

      // If no condition matched, add to the end
      if (!inserted) {
        state.wishlists.push(item.payload);
      }

      // Adjust the current amount on each wishlist
      state.wishlists = adjustCurrentAmountOnWishlists(state.wishlists, state.budget);
    },
    removeWishlist: (state, item: PayloadAction<string>) => {
      const updatedWishlist = state.wishlists.filter(wishlist => wishlist.id !== item.payload);

      // Adjust the current amount on each wishlist
      state.wishlists = adjustCurrentAmountOnWishlists(updatedWishlist, state.budget);
    }
  }
})

/**
 * Utility func
 */
function adjustCurrentAmountOnWishlists(wishlists: WishlistType[], balance: number): WishlistType[] {
  return wishlists.map((wishlist) => {
    const { targetAmount } = wishlist;
    let currentAmount = 0;

    if (balance > 0) {
      if (targetAmount < balance) {
        currentAmount = targetAmount;
        balance -= targetAmount;
      } else {
        currentAmount = balance;
        balance = 0;
      }
    }

    return {
      ...wishlist,
      currentAmount
    };
  });
}

export const {
  setWishlist,
  setBudget,
  addWishlist,
  removeWishlist,
} = wishlist.actions
export default wishlist.reducer