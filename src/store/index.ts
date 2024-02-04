import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./ProductsSlice";
import { cartSlice } from "./cartSlice";
import { AuthSlice } from "./AuthSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    auth: AuthSlice.reducer,
  },
});
