import goodsService from "../services/goods.service";
import { createSlice } from "@reduxjs/toolkit";

const goodsSlice = createSlice({
  name: "goods",
  initialState: {
    entities: [],
    errors: [],
    isLoading: false,
  },
  reducers: {
    requestCreateGood: (state, action) => {},
    responsCreateGood: (state, action) => {
      state.entities.unshift(action.payload);
    },
    responsCreateGoodError: (state, action) => {
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

    requestUpdateGood: (state, action) => {
      state.isLoading = true;
    },
    requestUpdateGoodError: (state, action) => {
      state.isLoading = false;
      state.errors.push(action.payload);
    },

    responsUpdateGood: (state, action) => {
      state.isLoading = false;

      const good = action.payload;

      state.entities.forEach((item) => {
        if (item._id === good._id) {
          Object.keys(item).forEach((key) => (item[key] = good[key]));
        }
      });
    },
    requestRemoveGood: (state) => {
      state.isLoading = true;
    },
    responsRemoveGood: (state, action) => {
      state.entities = state.entities.filter((item) => item._id !== action.payload);
      state.isLoading = false;
    },
    responsRemoveGoodError: (state, action) => {
      state.errors.push(action.payload);
      state.isLoading = false;
    },
  },
});

const { reducer: goodsReducer, actions } = goodsSlice;
const {
  requestCreateGood,
  responsCreateGood,
  responsCreateGoodError,
  requestFetchAll,
  requestFetchAllError,
  responsFetchAll,
  requestUpdateGood,
  requestUpdateGoodError,
  responsUpdateGood,
  requestRemoveGood,
  responsRemoveGood,
  responsRemoveGoodError,
} = actions;

const updateGood = (good) => async (dispatch) => {
  dispatch(requestUpdateGood());
  try {
    const respons = await goodsService.saveGood(good);

    if (respons.data.acknowledged) {
      const { good } = JSON.parse(respons.config.data);
      dispatch(responsUpdateGood(good));
    }
  } catch (error) {
    dispatch(requestUpdateGoodError(error));
  }
};

const removeGood = (goodId) => async (dispatch) => {
  dispatch(requestRemoveGood());
  try {
    const data = await goodsService.removeGoodById(goodId);
    if (data.acknowledged) {
      dispatch(responsRemoveGood(goodId));
    } else {
      dispatch(responsRemoveGoodError({ codeError: 400, massage: "Remove category failed" }));
    }
  } catch (error) {
    dispatch(responsRemoveGoodError(error));
  }
};

const fatchAllGoods = () => async (dispatch) => {
  dispatch(requestFetchAll());
  try {
    const data = await goodsService.fetchAll();
    dispatch(responsFetchAll(data));
  } catch (error) {
    dispatch(requestFetchAllError(error));
  }
};

const createGood = (good) => async (dispatch) => {
  dispatch(requestCreateGood(good));
  try {
    const respons = await goodsService.saveGood(good);
    if (respons.data.acknowledged) {
      good._id = respons.data.insertedId;
      dispatch(responsCreateGood(good));
    }
  } catch (error) {
    dispatch(responsCreateGoodError(error));
  }
};

const getGoods = () => (state) => state.goods.entities;
const getIsLoading = () => (state) => state.goods.isLoading;

// async function checkParentReferens(category) {
//   const respons = await categoriesService.getCategoryById(category._id);
//   const categoryFromBD = respons.data;

//   const changedCategories = [];
//   if (category.parent !== categoryFromBD.parent) {
//     if (!category.parent && categoryFromBD.parent) {
//       const changedObject = await changeParentReferens(categoryFromBD.parent, categoryFromBD._id, "remove");
//       changedCategories.push(changedObject);
//     } else if (category.parent && !categoryFromBD.parent) {
//       const changedObject = await changeParentReferens(category.parent, category._id, "add");
//       changedCategories.push(changedObject);
//     } else if (category.parent && categoryFromBD.parent) {
//       const changedObject = await changeParentReferens(categoryFromBD.parent, categoryFromBD._id, "remove");
//       changedCategories.push(changedObject);

//       const changedObject2 = await changeParentReferens(category.parent, categoryFromBD._id, "add");
//       changedCategories.push(changedObject2);
//     }
//   }

//   return changedCategories;
// }

// async function changeParentReferens(parentId, childrenId, mode) {
//   const respons = await categoriesService.getCategoryById(parentId);
//   const categoryParent = respons.data;

//   addRemoveChildrenCategory(categoryParent, childrenId, mode);
//   await categoriesService.saveCategory(categoryParent);

//   return categoryParent;
// }

// function addRemoveChildrenCategory(parent, childrenId, mode) {
//   const isExistChildren = parent.children.includes(childrenId);

//   if (mode === "add") {
//     if (!isExistChildren) {
//       parent.children.unshift(childrenId);
//     }
//   }

//   if (mode === "remove") {
//     if (isExistChildren) {
//       parent.children = parent.children.filter((item) => item !== childrenId);
//     }
//   }
// }

export { goodsReducer, fatchAllGoods, updateGood, removeGood, createGood, getGoods, getIsLoading };
