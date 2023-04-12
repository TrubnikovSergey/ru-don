import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./loginSlice";
import { categoriesReducer } from "./categoriesSlice";
import { goodsReducer } from "./goodsSlice";
import { newsReducer } from "./newsSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    categories: categoriesReducer,
    goods: goodsReducer,
    news: newsReducer,
  },
});

export default store;
