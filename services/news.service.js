import http from "./http.service";
import configJSON from "../config.json";

const newsService = {
  fetchAll: async () => {
    try {
      const { data } = await http.get(`${configJSON.API_HOST}/news?action=fetchAll`);
      return data;
    } catch (error) {
      return getResponsError(error);
    }
  },
  saveNews: async (news) => {
    try {
      const data = await http.post(`${configJSON.API_HOST}/news?action=saveNews`, { news });
      return data;
    } catch (error) {
      return getResponsError(error);
    }
  },

  removeNewsById: async (newsId) => {
    try {
      const data = await http.post(`${configJSON.API_HOST}/news?action=removeNewsById`, { newsId });
      return data;
    } catch (error) {
      return getResponsError(error);
    }
  },
};

export default newsService;
