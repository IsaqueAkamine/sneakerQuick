import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    init: (state, action) => {
      let userStore = action.payload;
      if (userStore !== null) {
        state.user = userStore;
      }
    },
    logout: state => {
      state.user = null;
    },
  },
});
