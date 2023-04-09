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
    requestCreateCategory: (state, action) => {},
    responsCreateCategory: (state, action) => {
      state.entities.unshift(action.payload);
    },
    responsCreateCategoryError: (state, action) => {
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
    const changedCategories = await checkParentReferens(category);
    const respons = await categoriesService.saveCategory(category);

    if (respons.data.acknowledged) {
      const data = JSON.parse(respons.config.data);
      changedCategories.push(data.category);

      dispatch(responsUpdateCategory(changedCategories));
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

    if (respons.data.acknowledged) {
      category._id = respons.data.insertedId;
      dispatch(responsCreateCategory(category));
    }
  } catch (error) {
    dispatch(responsCreateCategoryError(error));
  }
};

async function checkParentReferens(category) {
  const respons = await categoriesService.getCategoryById(category._id);
  const categoryFromBD = respons.data;

  const changedCategories = [];
  if (categoryFromBD && category.parent !== categoryFromBD.parent) {
    if (!category.parent && categoryFromBD.parent) {
      const changedObject = await changeParentReferens(categoryFromBD.parent, categoryFromBD._id, "remove");
      changedCategories.push(changedObject);
    } else if (category.parent && !categoryFromBD.parent) {
      const changedObject = await changeParentReferens(category.parent, category._id, "add");
      changedCategories.push(changedObject);
    } else if (category.parent && categoryFromBD.parent) {
      const changedObject = await changeParentReferens(categoryFromBD.parent, categoryFromBD._id, "remove");
      changedCategories.push(changedObject);

      const changedObject2 = await changeParentReferens(category.parent, categoryFromBD._id, "add");
      changedCategories.push(changedObject2);
    }
  }

  return changedCategories;
}

async function changeParentReferens(parentId, childrenId, mode) {
  const respons = await categoriesService.getCategoryById(parentId);
  const categoryParent = respons.data;

  addRemoveChildrenCategory(categoryParent, childrenId, mode);
  await categoriesService.saveCategory(categoryParent);

  return categoryParent;
}

function addRemoveChildrenCategory(parent, childrenId, mode) {
  const isExistChildren = parent.children.includes(childrenId);

  if (mode === "add") {
    if (!isExistChildren) {
      parent.children.unshift(childrenId);
    }
  }

  if (mode === "remove") {
    if (isExistChildren) {
      parent.children = parent.children.filter((item) => item !== childrenId);
    }
  }
}

const doCloseError = (_id) => (dispatch) => {
  dispatch(closeError(_id));
};

const getCategories = () => (state) => state.categories.entities;
const getErrors = () => (state) => state.categories.errors;
const getIsLoading = () => (state) => state.categories.isLoading;

export { categoriesReducer, fatchAllCategories, updateCategory, removeCategory, createCategory, doCloseError, getCategories, getIsLoading, getErrors };
