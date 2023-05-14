import authService from "@/services/auth.service";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    isLoading: false,
    errors: [],
    email: "",
    name: "",
  },
  reducers: {
    requestSignIn: (state, action) => {
      state.isLoading = true;
      state.errors = [];
    },
    responsSignIn: (state, action) => {
      state.isAuth = true;
      state.isLoading = false;
      state.email = action.payload.email;
      state.name = action.payload.title;
      state.errors = [];
    },
    responsSignInErrors: (state, action) => {
      state.isAuth = false;
      state.isLoading = false;
      state.email = "";
      state.name = "";
      console.log(action.payload);
      state.errors.push(action.payload);
    },
    requestSignOut: (state, action) => {
      state.isAuth = false;
      state.isLoading = false;
      state.email = "";
      state.name = "";
      state.errors = [];
    },
  },
});

const { reducer: authReducer, actions } = authSlice;
const { requestSignIn, responsSignIn, responsSignInErrors, requestSignOut } = actions;

const signIn = (authData) => async (dispatch) => {
  dispatch(requestSignIn());
  try {
    const respons = await authService.signIn(authData);

    if (!respons.error) {
      dispatch(responsSignIn(respons.data));
    } else {
      dispatch(responsSignInErrors(respons.error));
    }
  } catch (error) {
    dispatch(responsSignInErrors({ code: 400, message: `signIn throw errro\n${JSON.stringify(error)}` }));
  }
};

const signOut = () => (dispatch) => {
  dispatch(requestSignOut());
};

const isAuth = () => (state) => state.auth.isAuth;
const getErrors = () => (state) => state.auth.errors;
const isSignInLoading = () => (state) => state.auth.isLoading;

export { authReducer, signIn, signOut, isAuth, isSignInLoading, getErrors };
