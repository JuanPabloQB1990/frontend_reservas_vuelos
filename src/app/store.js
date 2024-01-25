import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/AuthSlice'
import scaleSlice from '../features/EscalasSlice'
import errorSlice  from '../features/ErrorVueloSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    scales: scaleSlice,
    error: errorSlice
  },
})