import http from "./http.service";
import configJSON from "../config.json";

const newsService = {
  fetchAll: async () => {
    try {
      const respons = await http.get(`${configJSON.API_HOST}/news?action=fetchAll`);
      return respons;
    } catch (error) {
      return getResponsError(error);
    }
  },
  saveNews: async (news) => {
    try {
      const respons = await http.post(`${configJSON.API_HOST}/news?action=saveNews`, { news });
      return respons;
    } catch (error) {
      return getResponsError(error);
    }
  },

  removeNewsById: async (newsId) => {
    try {
      const respons = await http.post(`${configJSON.API_HOST}/news?action=removeNewsById`, { newsId });
      return respons;
    } catch (error) {
      return getResponsError(error);
    }
  },
};

export default newsService;
