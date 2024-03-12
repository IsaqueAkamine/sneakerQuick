import { createSlice } from "@reduxjs/toolkit";
import products from "../data/products";

type ProductProps = {
  id: string;
  image: string;
  images: string[];
  name: string;
  price: number;
  sizes: number[];
  description: string;
};

type ProductsState = {
  products: ProductProps[];
  selectedProduct: any;
};

const initialState: ProductsState = {
  products: products,
  selectedProduct: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = state.products.find(
        product => product.id === action.payload,
      );
    },
  },
});

export const { setSelectedProduct } = productsSlice.actions;

export default productsSlice.reducer;
