import { configureStore } from '@reduxjs/toolkit'
import e_Commerce from './features'

export const store = configureStore({
  reducer: {
    Commerce: e_Commerce,
  },
})
