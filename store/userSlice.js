import userService from "@/services/user.service";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    entities: [],
    success: [],
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
      state.success = [];
      state.success.push({ _id: User._id, message: `Администратор "${User.title}" сохранен` });

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
    clearSuccess: (state, action) => {
      state.success = state.success.filter((item) => item._id !== action.payload);
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
  clearSuccess,
} = actions;

const fetchAllUser = () => async (dispatch) => {
  dispatch(requestUser());
  try {
    const respons = await userService.fetchAll();

    if (!respons.error) {
      dispatch(responseUser(respons.data));
    } else {
      dispatch(requestUserError(respons.error));
    }
  } catch (error) {
    dispatch(requestUserError(error));
  }
};

const updateUser = (User) => async (dispatch) => {
  dispatch(requestUpdateUser());
  try {
    const respons = await userService.saveUser(User);
    if (!respons.error) {
      dispatch(responsUpdateUser(User));
    } else {
      dispatch(requestUpdateUserError(respons.error));
    }
  } catch (error) {
    dispatch(requestUpdateUserError(error));
  }
};

const createUser = (User) => async (dispatch) => {
  dispatch(requestCreateUser());
  try {
    const respons = await userService.saveUser(User);

    if (!respons.error) {
      User._id = respons.data.insertedId;
      dispatch(responsCreateUser(User));
    } else {
      dispatch(requestCreateUserError(respons.error));
    }
  } catch (error) {
    dispatch(requestCreateUserError(error));
  }
};

const removeUser = (UserId) => async (dispatch) => {
  dispatch(requestRemoveUser());
  try {
    const respons = await userService.removeUserById(UserId);

    if (!respons.error) {
      dispatch(responsRemoveUser(UserId));
    } else {
      dispatch(requestRemoveUserError(respons.error));
    }
  } catch (error) {
    dispatch(requestRemoveUserError(error));
  }
};

const doClearSuccess = (id) => (dispatch) => {
  dispatch(clearSuccess(id));
};

const getUsers = () => (state) => state.users.entities;
const getErrors = () => (state) => state.users.errors;
const getSuccess = () => (state) => state.users.success;
const getIsLoading = () => (state) => state.users.isLoading;

export { userReducer, fetchAllUser, createUser, updateUser, removeUser, getUsers, getErrors, getIsLoading, getSuccess, doClearSuccess };
