import goodsService from "../services/goods.service";
import { createSlice } from "@reduxjs/toolkit";
import configJSON from "../config.json";

const goodsSlice = createSlice({
  name: "goods",
  initialState: {
    entities: [],
    errors: [],
    success: [],
    pageSize: configJSON.pageSize,
    totalCount: 0,
    isSaving: false,
    isLoading: false,
  },
  reducers: {
    requestCreateGoods: (state, action) => {},
    responsCreateGoods: (state, action) => {
      state.entities.unshift(action.payload);
      state.totalCount += 1;
    },
    responsCreateGoodsError: (state, action) => {
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
      state.entities = action.payload.dataPaginate;
      state.totalCount = action.payload.totalCount;
      state.isLoading = false;
    },

    requestUpdateGoods: (state, action) => {
      // state.isLoading = true;
      state.isSaving = true;
    },
    requestUpdateGoodsError: (state, action) => {
      // state.isLoading = false;
      state.isSaving = false;
      state.errors = [];
      state.errors.push(action.payload);
    },

    responsUpdateGoods: (state, action) => {
      // state.isLoading = false;
      state.isSaving = false;
      const goods = action.payload;
      state.success = [];
      state.success.push({ _id: goods._id, message: `Товар "${goods.title}" сохранен` });

      state.entities.forEach((item) => {
        if (item._id === goods._id) {
          Object.keys(item).forEach((key) => (item[key] = goods[key]));
        }
      });
    },
    requestRemoveGoods: (state) => {
      state.isLoading = true;
    },
    responsRemoveGoods: (state, action) => {
      state.entities = state.entities.filter((item) => item._id !== action.payload);
      state.totalCount -= 1;
      state.isLoading = false;
    },
    responsRemoveGoodsError: (state, action) => {
      state.errors = [];
      state.errors.push(action.payload);
      state.isLoading = false;
    },
    clearSuccess: (state, action) => {
      state.success = state.success.filter((item) => item._id !== action.payload);
    },
    clearError: (state, action) => {
      state.errors = state.errors.filter((item) => item._id !== action.payload);
    },
    setGoods: (state, action) => {
      state.entities = Array.isArray(action.payload) ? action.payload : [action.payload];
    },
  },
});

const { reducer: goodsReducer, actions } = goodsSlice;
const {
  requestCreateGoods,
  responsCreateGoods,
  responsCreateGoodsError,
  requestFetchAll,
  requestFetchAllError,
  responsFetchAll,
  requestUpdateGoods,
  requestUpdateGoodsError,
  responsUpdateGoods,
  requestRemoveGoods,
  responsRemoveGoods,
  responsRemoveGoodsError,
  clearSuccess,
  clearError,
  setGoods,
} = actions;

const updateGoods = (goods) => async (dispatch) => {
  dispatch(requestUpdateGoods());
  try {
    const respons = await goodsService.saveGoods(goods);

    if (!respons.error) {
      dispatch(responsUpdateGoods(goods));
    } else {
      dispatch(requestUpdateGoodsError(respons.error));
    }
  } catch (error) {
    dispatch(requestUpdateGoodsError(error));
  }
};

const removeGoods = (goodsId) => async (dispatch) => {
  dispatch(requestRemoveGoods());
  try {
    const respons = await goodsService.removeGoodsById(goodsId);

    if (!respons.error) {
      dispatch(responsRemoveGoods(goodsId));
    } else {
      dispatch(responsRemoveGoodsError(respons.error));
    }
  } catch (error) {
    dispatch(responsRemoveGoodsError(error));
  }
};

const setUpGoods = (data) => (dispatch) => {
  dispatch(setGoods(data));
};

const fatchAllGoods = (data) => async (dispatch, getState) => {
  dispatch(requestFetchAll());
  try {
    const { numberPage, searchValue, categoryId } = data;
    const limit = getState().goods.pageSize;
    const page = numberPage ? numberPage : 1;

    const respons = await goodsService.fetchAll({ limit, page, searchValue, categoryId });

    if (!respons.error) {
      dispatch(responsFetchAll(respons.data));
    } else {
      dispatch(requestFetchAllError(respons.error));
    }
  } catch (error) {
    dispatch(requestFetchAllError(error));
  }
};

const createGoods = (goods) => async (dispatch) => {
  dispatch(requestCreateGoods(goods));
  try {
    const respons = await goodsService.saveGoods(goods);

    if (!respons.error) {
      goods._id = respons.data.insertedId;

      dispatch(responsCreateGoods(goods));
    } else {
      dispatch(responsCreateGoodsError(respons.error));
    }
  } catch (error) {
    dispatch(responsCreateGoodsError(error));
  }
};

const doClearSuccess = (id) => (dispatch) => {
  dispatch(clearSuccess(id));
};

const doClearError = (id) => (dispatch) => {
  dispatch(clearError(id));
};

const getGoods = () => (state) => state.goods.entities;
const getGoodsById = (id) => (state) => state.goods.entities.find((item) => item._id === id);
const getGoodsTotalCount = () => (state) => state.goods.totalCount;
const getGoodsPageSize = () => (state) => state.goods.pageSize;
const getErrors = () => (state) => state.goods.errors;
const getSuccess = () => (state) => state.goods.success;
const getIsLoading = () => (state) => state.goods.isLoading;
const getIsSaving = () => (state) => state.goods.isSaving;

export {
  goodsReducer,
  fatchAllGoods,
  updateGoods,
  removeGoods,
  createGoods,
  getGoods,
  getGoodsById,
  getIsLoading,
  getErrors,
  getSuccess,
  doClearSuccess,
  doClearError,
  getGoodsTotalCount,
  getGoodsPageSize,
  getIsSaving,
  setUpGoods,
};
