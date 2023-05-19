import http from "./http.service";
import configJSON from "../config.json";

const aboutService = {
  fetchAll: async () => {
    try {
      const respons = await http.get(`${configJSON.API_HOST}/about?action=fetchAll`);
      return respons;
    } catch (error) {
      return getResponsError(error);
    }
  },
  saveAbout: async (about) => {
    try {
      const respons = await http.post(`${configJSON.API_HOST}/about?action=saveAbout`, { about });
      return respons;
    } catch (error) {
      return getResponsError(error);
    }
  },
};

export default aboutService;
