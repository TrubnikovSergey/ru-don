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
      state.entities.push(action.payload);
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
    responsCreateNewsError: (state, action) => {
      state.isLoading = false;
      state.errors.push(action.payload);
      state.entities = [];
    },
  },
});

const { reducer: newsReducer, actions } = newsSlice;
const { requestNews, responseNews, requestNewsError, requestCreateNews, responsCreateNews, responsCreateNewsError } = actions;

const fetchAllNews = () => async (dispatch) => {
  dispatch(requestNews);
  try {
    const data = await newsService.fetchAll();
    if (data.acknowledged) {
      dispatch(responseNews(data));
    }
  } catch (error) {
    dispatch(requestNewsError(error));
  }
};

const getNews = () => (state) => state.news.entities;

export { newsReducer, fetchAllNews, getNews };
