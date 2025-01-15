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
  budget: -1,
  isOnDemo: false
}

/**
 * Slice
 */
const wishlist = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlist: (state, item: PayloadAction<WishlistType[]>) => {
      state.wishlists = item.payload;
    },
    setWishlistAndAdjustCurrentAmount: (state, item: PayloadAction<WishlistType[]>) => {
      const updatedWishlist = item.payload;

      // Adjust the current amount on each wishlist
      state.wishlists = adjustCurrentAmountOnWishlists(updatedWishlist, state.budget);
    },
    setBudget: (state, item: PayloadAction<number>) => {
      state.budget = item.payload;

      // Adjust the current amount on each wishlist
      state.wishlists = adjustCurrentAmountOnWishlists(state.wishlists, state.budget);
    },
    addWishlist: (state, item: PayloadAction<WishlistType>) => {
      // Add the new wishlist in the right spot
      const updatedWishlist = insertWishlistIntoTheRightSpot(state.wishlists, item.payload);

      // Adjust the current amount on each wishlist
      state.wishlists = adjustCurrentAmountOnWishlists(updatedWishlist, state.budget);
    },
    updateWishlist: (state, item: PayloadAction<WishlistType>) => {
      // Remove the target wishlist from the arr
      const { id: targetId } = item.payload;
      const updatedWishlistAfterRemoval = state.wishlists.filter(wishlist => wishlist.id !== targetId);

      // Add it to the proper spot
      const updatedWishlistAfterAddition = insertWishlistIntoTheRightSpot(updatedWishlistAfterRemoval, item.payload);

      // Adjust the current amount on each wishlist
      state.wishlists = adjustCurrentAmountOnWishlists(updatedWishlistAfterAddition, state.budget);
    },
    removeWishlist: (state, item: PayloadAction<string>) => {
      const updatedWishlist = state.wishlists.filter(wishlist => wishlist.id !== item.payload);

      // Adjust the current amount on each wishlist
      state.wishlists = adjustCurrentAmountOnWishlists(updatedWishlist, state.budget);
    },
    setIsOnDemo: (state, item: PayloadAction<boolean>) => {
      state.isOnDemo = item.payload;
    }
  }
})

/**
 * Utility funcs
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

function insertWishlistIntoTheRightSpot(wishlistArr: WishlistType[], newWishlist: WishlistType): WishlistType[] {
  // Create a copy of the original array to avoid mutation
  const updatedWishlistArr = [...wishlistArr];

  // Is the new wishlist inserted
  let inserted = false;

  for (let i = 0; i < updatedWishlistArr.length; i++) {
    const { priority, targetAmount } = newWishlist;
    const { priority: currentPriority, targetAmount: currentTargetAmount } = updatedWishlistArr[i];

    /**
     * Insertion rules:
     *  - Priority: Same priority OR priority is higher than current available priority
     *  - Target amount: If same priority, place it where the targetAmount is greater than currentTargetAmount
     */
    if (
      !inserted && // Ensure we insert only once
      (
        priority! > currentPriority! ||
        (currentPriority === priority && targetAmount > currentTargetAmount)
      )
    ) {
      updatedWishlistArr.splice(i, 0, newWishlist); // Insert at the found index
      inserted = true;
      break; // Exit loop after insertion
    }
  }

  // If no condition matched, add to the end
  if (!inserted) {
    updatedWishlistArr.push(newWishlist);
  }

  return updatedWishlistArr;
}

export const {
  setWishlist,
  setWishlistAndAdjustCurrentAmount,
  setBudget,
  addWishlist,
  updateWishlist,
  removeWishlist,
  setIsOnDemo,
} = wishlist.actions
export default wishlist.reducer