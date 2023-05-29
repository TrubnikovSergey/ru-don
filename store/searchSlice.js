import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    value: "",
  },
  reducers: {
    searchValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

const { reducer: searchReducer, actions } = searchSlice;
const { searchValue } = actions;

const setSearchValue = (value) => (dispatch) => {
  dispatch(searchValue(value));
};

const getSearchValue = () => (state) => state.search.value;

export { searchReducer, setSearchValue, getSearchValue };
