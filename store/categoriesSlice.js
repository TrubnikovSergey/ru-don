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
      state.errors.push(action.payload);
    },

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

    let { data, config } = respons;
    if (data.result.acknowledged) {
      const configData = JSON.parse(config.data);
      data.changedCategories.push(configData.category);

      dispatch(responsUpdateCategory(data.changedCategories));
    } else {
      const message = data.response.data.message;
      dispatch(requestUpdateCategoryError({ _id: category._id, message }));
    }
  } catch (error) {
    console.log(error);
    dispatch(requestUpdateCategoryError(JSON.stringify(error)));
  }
};

const removeCategory = (categoryId) => async (dispatch) => {
  dispatch(requestRemoveCategory());
  try {
    const data = await categoriesService.removeCategoryById(categoryId);

    if (data.acknowledged) {
      dispatch(responsRemoveCategory(categoryId));
    } else {
      const message = data.response.data.message;
      dispatch(responsRemoveCategoryError({ _id: categoryId, message }));
    }
  } catch (error) {
    dispatch(responsRemoveCategoryError(error));
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

const createCategory = (category) => async (dispatch) => {
  dispatch(requestCreateCategory(category));
  try {
    const respons = await categoriesService.saveCategory(category);
    const { acknowledged, insertedId } = respons.data.result;
    if (acknowledged) {
      category._id = insertedId;
      dispatch(responsCreateCategory(category));
    } else {
      const message = data.response.data.message;
      dispatch(requestUpdateCategoryError({ _id: category._id, message }));
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
