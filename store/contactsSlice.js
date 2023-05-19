import contactsService from "@/services/contacts.service";
import { createSlice } from "@reduxjs/toolkit";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    entities: [],
    success: [],
    isLoading: false,
    errors: [],
  },
  reducers: {
    requestContacts: (state, action) => {
      state.isLoading = true;
    },
    responseContacts: (state, action) => {
      state.isLoading = false;
      state.entities = action.payload;
    },
    requestContactsError: (state, action) => {
      state.isLoading = false;
      state.errors = [];
      state.errors.push(action.payload);
      state.entities = [];
    },

    requestCreateContacts: (state, action) => {
      state.isLoading = true;
    },
    responsCreateContacts: (state, action) => {
      state.isLoading = false;
      state.entities.push(action.payload);
    },
    requestCreateContactsError: (state, action) => {
      state.isLoading = false;
      state.errors = [];
      state.errors.push(action.payload);
    },

    requestRemoveContacts: (state, action) => {
      state.isLoading = true;
    },
    responsRemoveContacts: (state, action) => {
      state.isLoading = false;
      state.entities = state.entities.filter((item) => item._id !== action.payload);
    },
    requestRemoveContactsError: (state, action) => {
      state.isLoading = false;
      state.errors = [];
      state.errors.push(error);
    },

    requestUpdateContacts: (state, action) => {
      state.isLoading = true;
    },
    responsUpdateContacts: (state, action) => {
      state.isLoading = false;

      const contacts = action.payload;
      state.success = [];
      state.success.push({ _id: contacts._id, message: `Новость "${contacts.title}" сохранена` });

      state.entities.forEach((item) => {
        if (item._id === contacts._id) {
          Object.keys(item).forEach((key) => (item[key] = contacts[key]));
        }
      });
    },
    requestUpdateContactsError: (state, action) => {
      state.isLoading = false;
      state.errors = [];
      state.errors.push(action.payload);
    },
    clearSuccess: (state, action) => {
      state.success = state.success.filter((item) => item._id !== action.payload);
    },
  },
});

const { reducer: contactsReducer, actions } = contactsSlice;
const {
  requestContacts,
  responseContacts,
  requestContactsError,
  requestCreateContacts,
  responsCreateContacts,
  requestCreateContactsError,
  requestUpdateContacts,
  responsUpdateContacts,
  requestUpdateContactsError,
  requestRemoveContacts,
  responsRemoveContacts,
  requestRemoveContactsError,
  clearSuccess,
} = actions;

const fetchAllContacts = () => async (dispatch) => {
  dispatch(requestContacts());
  try {
    const respons = await contactsService.fetchAll();

    if (!respons.error) {
      dispatch(responseContacts(respons.data));
    } else {
      dispatch(requestContactsError(respons.error));
    }
  } catch (error) {
    dispatch(requestContactsError(error));
  }
};

const updateContacts = (contacts) => async (dispatch) => {
  dispatch(requestUpdateContacts());
  try {
    const respons = await contactsService.saveContacts(contacts);

    if (!respons.error) {
      dispatch(responsUpdateContacts(contacts));
    } else {
      dispatch(requestUpdateContactsError(respons.error));
    }
  } catch (error) {
    dispatch(requestUpdateContactsError(error));
  }
};

const createContacts = (contacts) => async (dispatch) => {
  dispatch(requestCreateContacts());
  try {
    const respons = await contactsService.saveContacts(contacts);

    if (!respons.error) {
      contacts._id = respons.data.insertedId;
      dispatch(responsCreateContacts(contacts));
    } else {
      dispatch(requestCreateContactsError(respons.error));
    }
  } catch (error) {
    dispatch(requestCreateContactsError(error));
  }
};

const removeContacts = (contactsId) => async (dispatch) => {
  dispatch(requestRemoveContacts());
  try {
    const respons = await contactsService.removeContactById(contactsId);

    if (!respons.error) {
      dispatch(responsRemoveContacts(contactsId));
    } else {
      dispatch(requestRemoveContactsError(respons.error));
    }
  } catch (error) {
    dispatch(requestRemoveContactsError(error));
  }
};

const doClearSuccess = (id) => (dispatch) => {
  dispatch(clearSuccess(id));
};

const getContacts = () => (state) => state.contacts.entities;
const getErrors = () => (state) => state.contacts.errors;
const getSuccess = () => (state) => state.contacts.success;
const getIsLoading = () => (state) => state.contacts.isLoading;

export { contactsReducer, fetchAllContacts, createContacts, updateContacts, removeContacts, getContacts, getErrors, getIsLoading, getSuccess, doClearSuccess };
