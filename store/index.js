import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./loginSlice";
import { categoriesReducer } from "./categoriesSlice";
import { goodsReducer } from "./goodsSlice";
import { newsReducer } from "./newsSlice";
import { contactsReducer } from "./contactsSlice";
import { userReducer } from "./userSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    categories: categoriesReducer,
    goods: goodsReducer,
    news: newsReducer,
    contacts: contactsReducer,
    users: userReducer,
  },
});

export default store;
