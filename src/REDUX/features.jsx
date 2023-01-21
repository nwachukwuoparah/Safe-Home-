import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  product: [],
  cart: [],
}
const features = createSlice({
  name: 'e-store',
  initialState,
  reducers: {
    AllProducts: (state, { payload }) => {
      state.product = payload;
    },
    addToCart: (state, { payload }) => {
      const check = state.cart.findIndex((i) => i.id === payload.id);
      if (check >= 0) {
        const amount = state.cart[check].QTY += 1;
        state.cart[check].total = amount * state.cart[check].price
      } else {
        const item = { ...payload, QTY: 1, total: payload.price };
        state.cart.push(item);
      }
    },
    removeItem: (state, { payload }) => {
      const remove = state.cart.filter((i) => i.id != payload.id);
      state.cart = remove;
    },
    clearAll: (state, { payload }) => {
      const clearAll = []
      state.cart = clearAll
    },
    Check: (state, { payload }) => {
      const check = state.cart.findIndex((i) => i.id === payload.id)
      if (state.cart[check].QTY > 1) {
        const newAmount = state.cart[check].QTY -= 1
        state.cart[check].total = newAmount * state.cart[check].price
      } else {
        const remove = state.cart.filter((i) => i.id != payload.id);
        state.cart = remove;
      }
    },
  }
})
export const { AllProducts, addToCart, removeItem, clearAll, Check } = features.actions
export default features.reducer