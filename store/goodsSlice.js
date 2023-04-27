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
    requestCreateGoods: (state, action) => {},
    responsCreateGoods: (state, action) => {
      state.entities.unshift(action.payload);
    },
    responsCreateGoodsError: (state, action) => {
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

    requestUpdateGoods: (state, action) => {
      state.isLoading = true;
    },
    requestUpdateGoodsError: (state, action) => {
      state.isLoading = false;
      state.errors.push(action.payload);
    },

    responsUpdateGoods: (state, action) => {
      state.isLoading = false;

      const goods = action.payload;

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
      state.isLoading = false;
    },
    responsRemoveGoodsError: (state, action) => {
      state.errors.push(action.payload);
      state.isLoading = false;
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
} = actions;

const updateGoods = (goods) => async (dispatch) => {
  dispatch(requestUpdateGoods());
  try {
    const respons = await goodsService.saveGoods(goods);

    if (respons.data.acknowledged) {
      const stateData = {};

      for (let el of respons.config.data) {
        const key = el[0];
        const value = el[1];

        if (key === "_id") {
          stateData[key] = value;
        }
        if (key === "title") {
          stateData[key] = value;
        }
        if (key === "description") {
          stateData[key] = value;
        }
        if (key === "categoryId") {
          stateData[key] = value;
        }
        if (key === "price") {
          stateData[key] = Number(value);
        }
        if (key === "discountProcent") {
          stateData[key] = Number(value);
        }
        if (key === "discountCount") {
          stateData[key] = Number(value);
        }
      }

      stateData.images = respons.data.images;

      dispatch(responsUpdateGoods(stateData));
    }
  } catch (error) {
    dispatch(requestUpdateGoodsError(error));
  }
};

const removeGoods = (goodsId) => async (dispatch) => {
  dispatch(requestRemoveGoods());
  try {
    const data = await goodsService.removeGoodsById(goodsId);
    if (data.acknowledged) {
      dispatch(responsRemoveGoods(goodsId));
    } else {
      dispatch(responsRemoveGoodsError({ codeError: 400, massage: "Remove goods failed" }));
    }
  } catch (error) {
    dispatch(responsRemoveGoodsError(error));
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

const createGoods = (goods) => async (dispatch) => {
  dispatch(requestCreateGoods(goods));
  try {
    const respons = await goodsService.saveGoods(goods);

    if (respons.data.acknowledged) {
      goods._id = respons.data.insertedId;
      goods.images = respons.data.images;

      dispatch(responsCreateGoods(goods));
    }
  } catch (error) {
    dispatch(responsCreateGoodsError(error));
  }
};

const getGoods = () => (state) => state.goods.entities;
const getErrors = () => (state) => state.goods.errors;
const getIsLoading = () => (state) => state.goods.isLoading;

export { goodsReducer, fatchAllGoods, updateGoods, removeGoods, createGoods, getGoods, getIsLoading, getErrors };
