import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLogin: false,
    user: { login: "" },
  },
  reducers: {
    login(state, action) {
      state.isLogin = action.payload;
    },
  },
});

const { reducer: reducerLogin, actions: actionsLogin } = loginSlice;

const getIsLogin = () => (state) => state.login.isLogin;

export { reducerLogin, actionsLogin, getIsLogin };
