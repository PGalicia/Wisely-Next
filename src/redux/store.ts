/**
 * Imports
 */
// Redux
import { configureStore } from '@reduxjs/toolkit'

// Features
import modalReducer from '@/redux/features/modalSlice'
import wishlistReducer from '@/redux/features/wishlistSlice'

export const store = configureStore({
  reducer: {
    modalReducer,
    wishlistReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch