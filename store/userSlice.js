import userService from "@/services/user.service";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    entities: [],
    isLoading: false,
    errors: [],
  },
  reducers: {
    requestUser: (state, action) => {
      state.isLoading = true;
    },
    responseUser: (state, action) => {
      state.isLoading = false;
      state.entities = action.payload;
    },
    requestUserError: (state, action) => {
      state.isLoading = false;
      state.errors.push(action.payload);
      state.entities = [];
    },

    requestCreateUser: (state, action) => {
      state.isLoading = true;
    },
    responsCreateUser: (state, action) => {
      state.isLoading = false;
      state.entities.push(action.payload);
    },
    requestCreateUserError: (state, action) => {
      state.isLoading = false;
      state.errors.push(action.payload);
    },

    requestRemoveUser: (state, action) => {
      state.isLoading = true;
    },
    responsRemoveUser: (state, action) => {
      state.isLoading = false;
      state.entities = state.entities.filter((item) => item._id !== action.payload);
    },
    requestRemoveUserError: (state, action) => {
      state.isLoading = false;
      state.errors.push(error);
    },

    requestUpdateUser: (state, action) => {
      state.isLoading = true;
    },
    responsUpdateUser: (state, action) => {
      state.isLoading = false;

      const User = action.payload;

      state.entities.forEach((item) => {
        if (item._id === User._id) {
          Object.keys(item).forEach((key) => (item[key] = User[key]));
        }
      });
    },
    requestUpdateUserError: (state, action) => {
      state.isLoading = false;
      state.errors.push(action.payload);
    },
  },
});

const { reducer: userReducer, actions } = userSlice;
const {
  requestUser,
  responseUser,
  requestUserError,
  requestCreateUser,
  responsCreateUser,
  requestCreateUserError,
  requestUpdateUser,
  responsUpdateUser,
  requestUpdateUserError,
  requestRemoveUser,
  responsRemoveUser,
  requestRemoveUserError,
} = actions;

const fetchAllUser = () => async (dispatch) => {
  dispatch(requestUser());
  try {
    const data = await userService.fetchAll();
    dispatch(responseUser(data));
  } catch (error) {
    dispatch(requestUserError(error));
  }
};

const updateUser = (User) => async (dispatch) => {
  dispatch(requestUpdateUser());
  try {
    const respons = await userService.saveUser(User);

    const { acknowledged } = respons.data;
    if (acknowledged) {
      dispatch(responsUpdateUser(User));
    }
  } catch (error) {
    dispatch(requestUpdateUserError(error));
  }
};

const createUser = (User) => async (dispatch) => {
  dispatch(requestCreateUser());
  try {
    const respons = await userService.saveUser(User);

    const { acknowledged, insertedId } = respons.data;
    if (acknowledged) {
      User._id = insertedId;
      dispatch(responsCreateUser(User));
    }
  } catch (error) {
    dispatch(requestCreateUserError(error));
  }
};

const removeUser = (UserId) => async (dispatch) => {
  dispatch(requestRemoveUser());
  try {
    const respons = await userService.removeUserById(UserId);
    const { data } = respons;
    if (data.acknowledged) {
      dispatch(responsRemoveUser(UserId));
    } else {
      dispatch(requestRemoveUserError({ codeError: 400, message: "Remove User failed" }));
    }
  } catch (error) {}
};

const getUsers = () => (state) => state.users.entities;
const getErrors = () => (state) => state.users.errors;
const getIsLoading = () => (state) => state.users.isLoading;

export { userReducer, fetchAllUser, createUser, updateUser, removeUser, getUsers, getErrors, getIsLoading };
