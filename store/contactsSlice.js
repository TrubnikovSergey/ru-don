import contactsService from "@/services/contacts.service";
import { createSlice } from "@reduxjs/toolkit";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    entities: [],
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
      state.errors.push(error);
    },

    requestUpdateContacts: (state, action) => {
      state.isLoading = true;
    },
    responsUpdateContacts: (state, action) => {
      state.isLoading = false;

      const contacts = action.payload;

      state.entities.forEach((item) => {
        if (item._id === contacts._id) {
          Object.keys(item).forEach((key) => (item[key] = contacts[key]));
        }
      });
    },
    requestUpdateContactsError: (state, action) => {
      state.isLoading = false;
      state.errors.push(action.payload);
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
} = actions;

const fetchAllContacts = () => async (dispatch) => {
  dispatch(requestContacts());
  try {
    const data = await contactsService.fetchAll();

    dispatch(responseContacts(data));
  } catch (error) {
    dispatch(requestContactsError(error));
  }
};

const updateContacts = (contacts) => async (dispatch) => {
  dispatch(requestUpdateContacts());
  try {
    const respons = await contactsService.saveContacts(contacts);

    const { acknowledged } = respons.data;
    if (acknowledged) {
      dispatch(responsUpdateContacts(contacts));
    }
  } catch (error) {
    dispatch(requestUpdateContactsError(error));
  }
};

const createContacts = (contacts) => async (dispatch) => {
  dispatch(requestCreateContacts());
  try {
    const respons = await contactsService.saveContacts(contacts);

    const { acknowledged, insertedId } = respons.data;
    if (acknowledged) {
      contacts._id = insertedId;
      dispatch(responsCreateContacts(contacts));
    }
  } catch (error) {
    dispatch(requestCreateContactsError(error));
  }
};

const removeContacts = (contactsId) => async (dispatch) => {
  dispatch(requestRemoveContacts());
  try {
    const respons = await contactsService.removeContactById(contactsId);
    const { data } = respons;
    if (data.acknowledged) {
      dispatch(responsRemoveContacts(contactsId));
    } else {
      dispatch(requestRemoveContactsError({ codeError: 400, massage: "Remove contact failed" }));
    }
  } catch (error) {}
};

const getContacts = () => (state) => state.contacts.entities;
const getErrors = () => (state) => state.contacts.errors;
const getIsLoading = () => (state) => state.contacts.isLoading;

export { contactsReducer, fetchAllContacts, createContacts, updateContacts, removeContacts, getContacts, getErrors, getIsLoading };
