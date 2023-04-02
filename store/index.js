import { configureStore } from "@reduxjs/toolkit";
import { reducerLogin } from "./loginSlice";
import { categoriesReducer } from "./categoriesSlice";

const store = configureStore({
  reducer: { login: reducerLogin, categories: categoriesReducer },
});

export default store;
