import authService from "@/services/auth.service";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    isLoading: false,
    error: [],
    email: "",
    name: "",
  },
  reducers: {
    requestSignIn: (state, action) => {
      state.isLoading = true;
    },
    responsSignIn: (state, action) => {
      state.isAuth = true;
      state.isLoading = false;
      state.email = action.payload.email;
      state.name = action.payload.title;
      state.error = [];
    },
    responsSignInError: (state, action) => {
      state.isAuth = false;
      state.isLoading = false;
      state.email = "";
      state.name = "";
      console.log(action.payload);
      state.error.push(action.payload);
    },
    requestSignOut: (state, action) => {
      state.isAuth = false;
      state.isLoading = false;
      state.email = "";
      state.name = "";
      state.error = [];
    },
  },
});

const { reducer: authReducer, actions } = authSlice;
const { requestSignIn, responsSignIn, responsSignInError, requestSignOut } = actions;

const signIn = (authData) => async (dispatch) => {
  dispatch(requestSignIn());
  try {
    const respons = await authService.signIn(authData);

    if ("error" in respons) {
      dispatch(responsSignInError(respons.error));
    } else {
      dispatch(responsSignIn(respons.data));
    }
  } catch (error) {
    dispatch(responsSignInError({ code: 400, massage: `signIn throw errro\n${JSON.stringify(error)}` }));
  }
};

const signOut = () => (dispatch) => {
  dispatch(requestSignOut());
};

const isAuth = () => (state) => state.auth.isAuth;
const isSignInLoading = () => (state) => state.auth.isLoading;

export { authReducer, signIn, signOut, isAuth, isSignInLoading };
