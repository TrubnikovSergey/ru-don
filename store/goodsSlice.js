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

      const goods = action.payload;

      state.entities.forEach((item) => {
        if (item._id === goods._id) {
          Object.keys(item).forEach((key) => (item[key] = goods[key]));
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

const updateGood = (goods) => async (dispatch) => {
  dispatch(requestUpdateGood());
  try {
    const respons = await goodsService.saveGoods(goods);
    console.log("-----updateGood respons", respons);
    console.log("-----updateGood goods", goods);

    if (respons?.data?.acknowledged) {
      goods.images = respons.data.images;
      dispatch(responsUpdateGood(goods));
    }
  } catch (error) {
    dispatch(requestUpdateGoodError(error));
  }
};

// const sendFormData = (data) => async (dispatch) => {
//   dispatch(requestUpdateGood());
//   try {
//     const respons = await goodsService.sendFormData(data);
//     console.log("----------respons", respons);
//     // if (respons?.data?.acknowledged) {
//     //   const { goods } = JSON.parse(respons.config.data);
//     //   dispatch(responsUpdateGood(goods));
//     // }
//   } catch (error) {
//     dispatch(requestUpdateGoodError(error));
//   }
// };

const removeGood = (goodsId) => async (dispatch) => {
  dispatch(requestRemoveGood());
  try {
    const data = await goodsService.removeGoodById(goodsId);
    if (data?.acknowledged) {
      dispatch(responsRemoveGood(goodsId));
    } else {
      dispatch(responsRemoveGoodError({ codeError: 400, massage: "Remove goods failed" }));
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

const createGood = (goods) => async (dispatch) => {
  dispatch(requestCreateGood(goods));
  try {
    const respons = await goodsService.saveGoods(goods);
    console.log("-----createGood", respons);

    if (respons?.data?.acknowledged) {
      goods._id = respons.data.insertedId;
      dispatch(responsCreateGood(goods));
    }
  } catch (error) {
    dispatch(responsCreateGoodError(error));
  }
};

const getGoods = () => (state) => state.goods.entities;
const getErrors = () => (state) => state.goods.errors;
const getIsLoading = () => (state) => state.goods.isLoading;

export { goodsReducer, fatchAllGoods, updateGood, removeGood, createGood, getGoods, getIsLoading, getErrors };
