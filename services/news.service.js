import http from "./http.service";
import configJSON from "../config.json";
import { MongoClient } from "mongodb";

const newsService = {
  fetchAll: async () => {
    try {
      const { data } = await http.get(`${configJSON.API_HOST}/news?action=fetchAll`);
      return data;
    } catch (error) {
      console.log("-----newsService error", error);
      return null;
    }
  },
  saveNews: async (news) => {
    try {
      const data = await http.post(`${configJSON.API_HOST}/news?action=saveNews`, { news });
      return data;
    } catch (error) {
      return null;
    }
  },

  removeNewsById: async (newsId) => {
    try {
      const data = await http.post(`${configJSON.API_HOST}/news?action=removeNewsById`, { newsId });
      return data;
    } catch (error) {
      return null;
    }
  },
};

export default newsService;
