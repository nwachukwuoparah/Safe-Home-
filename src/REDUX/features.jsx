import { createSlice } from '@reduxjs/toolkit'
import { ThemeContext } from '../Components/ContexApi/Contex';
import { useContext } from 'react';

const initialState = {
  product: [],
  cart: [],
  RECENT: [],
  addProduct: [],
  user: [],
  addOrder: [],
  cartState: false
}

const MyComponent = () => {
  const { alertValue, setAlertValue } = useContext(ThemeContext)
  setAlertValue('Out of stock')
  console.log('alertValue')
  // return (
  //   <div>
  //     {setAlertValue('Out of stock')}
  //   </div>
  // );
};



const features = createSlice({
  name: 'e-store',
  initialState,
  reducers: {
    AllProducts: (state, { payload }) => {
      state.product = payload;
    },
    addToCart: (state, { payload }) => {
      const check = state.cart.findIndex((i) => i._id === payload._id);

      if (check >= 0 && state.cart[check].QTY != state.cart[check].stockQuantity) {
        state.cartState = false
        const amount = state.cart[check].QTY += 1;
        state.cart[check].total = amount * state.cart[check].price
      } else if (check < 0) {
        state.cartState = false
        const item = { ...payload, QTY: 1, total: payload.price };
        state.cart.push(item);
        console.log(item)
      } else {
        state.cartState = true
      }
    },
    removeItem: (state, { payload }) => {
      const remove = state.cart.filter((i) => i._id != payload._id);
      state.cart = remove;
      state.cartState = false
    },
    addUser: (state, { payload }) => {
      state.user = [payload];
    },
    clearUser: (state) => {
      const clearAll = []
      state.user = clearAll
    },
    clearAll: (state) => {
      const clearAll = []
      state.cart = clearAll
    },
    Check: (state, { payload }) => {
      const check = state.cart.findIndex((i) => i._id === payload._id)
      if (state.cart[check].QTY > 1) {
        const newAmount = state.cart[check].QTY -= 1
        state.cart[check].total = newAmount * state.cart[check].price
      } else {
        const remove = state.cart.filter((i) => i._id != payload._id);
        state.cart = remove;
      }
    },
    recent: (state, { payload }) => {
      const check = state.RECENT.findIndex((i) => i._id === payload._id)
      // console.log(check)
      if (check === -1) {
        const recent = [payload, ...state.RECENT]
        state.RECENT = recent
      }
    },
    addProduct: (state, { payload }) => {
      state.addProduct = [...state.addProduct, payload]
    },
    orderproduct: (state, { payload }) => {
      state.addOrder = [payload];
    },
    removeOrders: (state, { payload }) => {
      const clearAll = []
      state.addOrder = clearAll
    },
  }
})

export const { AllProducts, addToCart, removeItem, clearAll, Check, recent, addProduct, addUser, clearUser, orderproduct, removeOrders } = features.actions
export default features.reducer

