import http from "./http.service";
import configJSON from "../config.json";

const aboutService = {
  fetchAll: async () => {
    try {
      const { data } = await http.get(`${configJSON.API_HOST}/about?action=fetchAll`);
      return data;
    } catch (error) {
      return null;
    }
  },
  saveAbout: async (about) => {
    try {
      const data = await http.post(`${configJSON.API_HOST}/about?action=saveAbout`, { about });
      return data;
    } catch (error) {
      return null;
    }
  },
};

export default aboutService;
