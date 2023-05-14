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
    requestCreateCategory: (state, action) => {
      state.isLoading = true;
    },
    responsCreateCategory: (state, action) => {
      state.isLoading = false;
      state.entities.unshift(action.payload);
    },
    responsCreateCategoryError: (state, action) => {
      state.isLoading = false;
      state.errors = [];
      state.errors.push(action.payload);
    },

    requestFetchAll: (state) => {
      state.isLoading = true;
    },
    requestFetchAllError: (state, action) => {
      state.isLoading = false;
      state.errors = [];
      state.errors.push(action.payload);
      state.entities = [];
    },

    responsFetchAll: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },

    requestUpdateCategory: (state, action) => {
      state.isLoading = true;
    },
    requestUpdateCategoryError: (state, action) => {
      state.isLoading = false;
      state.errors = [];
      state.errors.push(action.payload);
    },

    responsUpdateCategory: (state, action) => {
      state.isLoading = false;

      const categories = action.payload;

      for (let i = 0; i < categories.length; i++) {
        const category = categories[i];

        state.entities.forEach((item) => {
          if (item._id === category._id) {
            Object.keys(item).forEach((key) => (item[key] = category[key]));
          }
        });
      }
    },
    requestRemoveCategory: (state) => {
      state.isLoading = true;
    },
    responsRemoveCategory: (state, action) => {
      state.entities = state.entities.filter((item) => item._id !== action.payload);
      state.isLoading = false;
    },
    responsRemoveCategoryError: (state, action) => {
      state.errors = [];
      state.errors.push(action.payload);
      state.isLoading = false;
    },
    closeError: (state, action) => {
      state.errors = state.errors.filter((item) => item._id !== action.payload);
    },
  },
});

const { reducer: categoriesReducer, actions } = categoriesSlice;
const {
  requestCreateCategory,
  responsCreateCategory,
  responsCreateCategoryError,
  requestFetchAll,
  requestFetchAllError,
  responsFetchAll,
  requestUpdateCategory,
  requestUpdateCategoryError,
  responsUpdateCategory,
  requestRemoveCategory,
  responsRemoveCategory,
  responsRemoveCategoryError,
  closeError,
} = actions;

const updateCategory = (category) => async (dispatch) => {
  dispatch(requestUpdateCategory());
  try {
    const respons = await categoriesService.saveCategory(category);

    if (!respons.error) {
      const updatedCategory = JSON.parse(respons.config.data);
      respons.data.changedCategories.push(updatedCategory.category);

      dispatch(responsUpdateCategory(respons.data.changedCategories));
    } else {
      dispatch(requestUpdateCategoryError(respons.error));
    }
  } catch (error) {
    dispatch(requestUpdateCategoryError(JSON.stringify(error)));
  }
};

const removeCategory = (categoryId) => async (dispatch) => {
  dispatch(requestRemoveCategory());
  try {
    const respons = await categoriesService.removeCategoryById(categoryId);

    if (!respons.error) {
      dispatch(responsRemoveCategory(categoryId));
    } else {
      dispatch(responsRemoveCategoryError(respons.error));
    }
  } catch (error) {
    dispatch(responsRemoveCategoryError(JSON.stringify(error)));
  }
};

const fatchAllCategories = () => async (dispatch) => {
  dispatch(requestFetchAll());
  try {
    const respons = await categoriesService.fetchAll();

    if (!respons.error) {
      dispatch(responsFetchAll(respons.data));
    } else {
      dispatch(requestFetchAllError(respons.error));
    }
  } catch (error) {
    dispatch(requestFetchAllError(JSON.stringify(error)));
  }
};

const createCategory = (category) => async (dispatch) => {
  dispatch(requestCreateCategory(category));
  try {
    const respons = await categoriesService.saveCategory(category);

    if (!respons.error) {
      category._id = respons.data.category.insertedId;
      dispatch(responsCreateCategory(category));
    } else {
      dispatch(requestUpdateCategoryError(respons.error));
    }
  } catch (error) {
    dispatch(responsCreateCategoryError(error));
  }
};

const doCloseError = (_id) => (dispatch) => {
  dispatch(closeError(_id));
};

const getCategories = () => (state) => state.categories.entities;
const getErrors = () => (state) => state.categories.errors;
const getIsLoading = () => (state) => state.categories.isLoading;

export { categoriesReducer, fatchAllCategories, updateCategory, removeCategory, createCategory, doCloseError, getCategories, getIsLoading, getErrors };
