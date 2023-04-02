import categoriesService from "@/services/categories.service";
import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    entities: [],
    errors: [],
    isLoading: false,
  },
  reducers: {
    requestFetchAll: (state) => {
      state.isLoading = true;
    },
    requestFetchAllError: (state, action) => {
      state.isLoading = false;
      state.errors.push(action.payload);
      state.entities = [];
    },

    responsFetchAll: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.errors = [];
    },

    requestUpdateCategory: (state, action) => {
      state.isLoading = true;
    },
    requestUpdateCategoryError: (state, action) => {
      state.isLoading = false;
      state.errors.push(action.payload);
    },

    responsUpdateCategory: (state, action) => {
      state.isLoading = false;

      const category = action.payload;

      state.entities.forEach((item) => {
        if (item._id === category._id) {
          Object.keys(item).forEach((key) => (item[key] = category[key]));
        }
      });
    },
  },
});

const { reducer: categoriesReducer, actions } = categoriesSlice;
const { requestFetchAll, requestFetchAllError, responsFetchAll, requestUpdateCategory, requestUpdateCategoryError, responsUpdateCategory } = actions;

const updateCategory = (category) => async (dispatch) => {
  dispatch(requestUpdateCategory());
  try {
    const data = await categoriesService.saveCategory(category);
    dispatch(responsUpdateCategory(data));
  } catch (error) {
    dispatch(requestUpdateCategoryError(error));
  }
};

const fatchAllCategories = () => async (dispatch) => {
  dispatch(requestFetchAll());
  try {
    const data = await categoriesService.fetchAll();
    dispatch(responsFetchAll(data));
  } catch (error) {
    dispatch(requestFetchAllError(error));
  }
};

const getCategories = () => (state) => state.categories.entities;
const getIsLoading = () => (state) => state.categories.isLoading;

export { categoriesReducer, fatchAllCategories, updateCategory, getCategories, getIsLoading };
