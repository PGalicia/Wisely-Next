/**
 * Imports
 */
// Redux
import { configureStore } from '@reduxjs/toolkit'

// Features
import modalReducer from '@/redux/features/modalSlice'

export const store = configureStore({
  reducer: {
    modalReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch