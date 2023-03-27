import { configureStore } from "@reduxjs/toolkit";
import { reducerLogin } from "./loginSlice";

const store = configureStore({
  reducer: { login: reducerLogin },
});

export default store;
