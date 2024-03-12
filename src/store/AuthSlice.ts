import { createSlice } from "@reduxjs/toolkit";

type UserState = {
  user: any;
};

const initialState: UserState = {
  user: null,
};

const authSlice = createSlice({
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

export const { loginUser, init, logout } = authSlice.actions;

export default authSlice.reducer;
