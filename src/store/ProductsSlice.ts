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
  status: string;
  error: string | undefined;
};

const initialState: ProductsState = {
  products: products,
  productsSneaker: [],
  selectedProduct: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: "",
};

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async thunkAPI => {
    try {
      const response = await api.get("/search", {
        params: { query: "sneaker" },
      });

      const { hits } = response.data;
      return hits;
    } catch (error: any) {
      return error.message;
    }
  },
);

export const fetchProductsByBrand = createAsyncThunk(
  "products/fetchByBrand",
  async (thunkAPI: string) => {
    try {
      const response = await api.get("/search", {
        params: { query: `${thunkAPI} Shoes` },
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
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productsSneaker = action.payload;
      })
      .addCase(fetchProducts.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductsByBrand.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productsSneaker = action.payload;
      })
      .addCase(fetchProductsByBrand.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchProductsByBrand.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSelectedProduct } = productsSlice.actions;

export const getProductsStatus = (state: ProductsState) => state.status;
export const getProductsError = (state: ProductsState) => state.error;

export default productsSlice.reducer;
