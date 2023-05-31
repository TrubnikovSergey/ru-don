import { createSlice } from "@reduxjs/toolkit";

const sortSlice = createSlice({
  name: "sort",
  initialState: {
    kindSort: "title-asc",
  },
  reducers: {
    setKindSort: (state, action) => {
      state.kindSort = action.payload;
    },
  },
});

const { reducer: sortReducer, actions } = sortSlice;
const { setKindSort } = actions;

const setUpKindSort = (kind) => (dispatch) => {
  dispatch(setKindSort(kind));
};

const getKindSort = () => (state) => state.sort.kindSort;

export { sortReducer, setUpKindSort, getKindSort };
