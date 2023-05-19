import http from "./http.service";
import configJSON from "../config.json";

const contactsService = {
  fetchAll: async () => {
    try {
      const respons = await http.get(`${configJSON.API_HOST}/contacts?action=fetchAll`);
      return respons;
    } catch (error) {
      return getResponsError(error);
    }
  },
  saveContacts: async (contact) => {
    try {
      const respons = await http.post(`${configJSON.API_HOST}/contacts?action=saveContact`, { contact });
      return respons;
    } catch (error) {
      return getResponsError(error);
    }
  },

  removeContactById: async (contactId) => {
    try {
      const respons = await http.post(`${configJSON.API_HOST}/contacts?action=removeContactById`, { contactId });
      return respons;
    } catch (error) {
      return getResponsError(error);
    }
  },
};

export default contactsService;
