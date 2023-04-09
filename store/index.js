import { configureStore } from "@reduxjs/toolkit";
import { reducerLogin } from "./loginSlice";
import { categoriesReducer } from "./categoriesSlice";
import { goodsReducer } from "./goodsSlice";

const store = configureStore({
  reducer: { login: reducerLogin, categories: categoriesReducer, goods: goodsReducer },
});

export default store;
