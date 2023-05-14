import http from "./http.service";
import configJSON from "../config.json";

const contactsService = {
  fetchAll: async () => {
    try {
      const { data } = await http.get(`${configJSON.API_HOST}/contacts?action=fetchAll`);
      return data;
    } catch (error) {
      return getResponsError(error);
    }
  },
  saveContacts: async (contact) => {
    try {
      const data = await http.post(`${configJSON.API_HOST}/contacts?action=saveContact`, { contact });
      return data;
    } catch (error) {
      return getResponsError(error);
    }
  },

  removeContactById: async (contactId) => {
    try {
      const data = await http.post(`${configJSON.API_HOST}/contacts?action=removeContactById`, { contactId });
      return data;
    } catch (error) {
      return getResponsError(error);
    }
  },
};

export default contactsService;
