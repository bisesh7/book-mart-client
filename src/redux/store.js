// store.js
import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./slices/booksSlice";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    book: booksReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});

export default store;
