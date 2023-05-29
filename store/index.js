import { configureStore } from "@reduxjs/toolkit";
import { categoriesReducer } from "./categoriesSlice";
import { goodsReducer } from "./goodsSlice";
import { newsReducer } from "./newsSlice";
import { contactsReducer } from "./contactsSlice";
import { userReducer } from "./userSlice";
import { authReducer } from "./authSlice";
import { searchReducer } from "./searchSlice";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    goods: goodsReducer,
    news: newsReducer,
    contacts: contactsReducer,
    users: userReducer,
    auth: authReducer,
    search: searchReducer,
  },
});

export default store;
