import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/AuthSlice'
import scaleSlice from '../features/EscalasSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    scales: scaleSlice
  },
})