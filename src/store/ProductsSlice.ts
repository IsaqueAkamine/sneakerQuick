import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import products from "../data/products";
import api from "../services/api";

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
  productsSneaker: any[];
  selectedProduct: any;
};

const initialState: ProductsState = {
  products: products,
  productsSneaker: [],
  selectedProduct: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async thunkAPI => {
    try {
      const response = await api.get("/search", {
        params: { query: "Adidas Forum, Nike Air" },
      });

      const { hits } = response.data;
      return hits;
    } catch (error: any) {
      return error.message;
    }
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.productsSneaker = action.payload;
    });
  },
});

export const { setSelectedProduct } = productsSlice.actions;

export default productsSlice.reducer;
