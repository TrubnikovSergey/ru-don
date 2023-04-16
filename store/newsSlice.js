import newsService from "@/services/news.service";
import { createSlice } from "@reduxjs/toolkit";

const newsSlice = createSlice({
  name: "news",
  initialState: {
    entities: [],
    isLoading: false,
    errors: [],
  },
  reducers: {
    requestNews: (state, action) => {
      state.isLoading = true;
    },
    responseNews: (state, action) => {
      state.isLoading = false;
      state.entities = action.payload;
    },
    requestNewsError: (state, action) => {
      state.isLoading = false;
      state.errors.push(action.payload);
      state.entities = [];
    },

    requestCreateNews: (state, action) => {
      state.isLoading = true;
    },
    responsCreateNews: (state, action) => {
      state.isLoading = false;
      state.entities.push(action.payload);
    },
    requestCreateNewsError: (state, action) => {
      state.isLoading = false;
      state.errors.push(action.payload);
    },

    requestRemoveNews: (state, action) => {
      state.isLoading = true;
    },
    responsRemoveNews: (state, action) => {
      state.isLoading = false;
      state.entities = state.entities.filter((item) => item._id !== action.payload);
    },
    requestRemoveNewsError: (state, action) => {
      state.isLoading = false;
      state.errors.push(error);
    },

    requestUpdateNews: (state, action) => {
      state.isLoading = true;
    },
    responsUpdateNews: (state, action) => {
      state.isLoading = false;

      const news = action.payload;

      state.entities.forEach((item) => {
        if (item._id === news._id) {
          Object.keys(item).forEach((key) => (item[key] = news[key]));
        }
      });
    },
    requestUpdateNewsError: (state, action) => {
      state.isLoading = false;
      state.errors.push(action.payload);
    },
  },
});

const { reducer: newsReducer, actions } = newsSlice;
const {
  requestNews,
  responseNews,
  requestNewsError,
  requestCreateNews,
  responsCreateNews,
  requestCreateNewsError,
  requestUpdateNews,
  responsUpdateNews,
  requestUpdateNewsError,
  requestRemoveNews,
  responsRemoveNews,
  requestRemoveNewsError,
} = actions;

const fetchAllNews = () => async (dispatch) => {
  dispatch(requestNews());
  try {
    const data = await newsService.fetchAll();
    dispatch(responseNews(data));
  } catch (error) {
    dispatch(requestNewsError(error));
  }
};

const updateNews = (news) => async (dispatch) => {
  dispatch(requestUpdateNews());
  try {
    const respons = await newsService.saveNews(news);

    const { acknowledged } = respons.data;
    if (acknowledged) {
      dispatch(responsUpdateNews(news));
    }
  } catch (error) {
    dispatch(requestUpdateNewsError(error));
  }
};

const createNews = (news) => async (dispatch) => {
  dispatch(requestCreateNews());
  try {
    const respons = await newsService.saveNews(news);

    const { acknowledged, insertedId } = respons.data;
    if (acknowledged) {
      news._id = insertedId;
      dispatch(responsCreateNews(news));
    }
  } catch (error) {
    dispatch(requestCreateNewsError(error));
  }
};

const removeNews = (newsId) => async (dispatch) => {
  dispatch(requestRemoveNews());
  try {
    const respons = await newsService.removeNewsById(newsId);
    const { data } = respons;
    if (data.acknowledged) {
      dispatch(responsRemoveNews(newsId));
    } else {
      dispatch(requestRemoveNewsError({ codeError: 400, massage: "Remove news failed" }));
    }
  } catch (error) {}
};

const getNews = () => (state) => state.news.entities;
const getErrors = () => (state) => state.news.errors;
const getIsLoading = () => (state) => state.news.isLoading;

export { newsReducer, fetchAllNews, createNews, updateNews, removeNews, getNews, getErrors, getIsLoading };
