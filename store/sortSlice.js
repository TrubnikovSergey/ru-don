import { createSlice } from "@reduxjs/toolkit";

const sortSlice = createSlice({
  name: "sort",
  initialState: {
    kindSort: "title asc",
  },
  reducers: {
    changeKindSort: (state, action) => {
      state.kindSort = action.payload;
    },
  },
});

const { reducer: sortReducer, actions } = sortSlice;
const { changeKindSort } = actions;

const setKindSort = (kind) => (dispatch) => {
  dispatch(changeKindSort(kind));
};

const getKindSort = () => (state) => state.sort.kindSort;

export { sortReducer, setKindSort, getKindSort };
