import http from "./http.service";
import configJSON from "../config.json";

const goodsService = {
  fetchAll: async () => {
    try {
      const { data } = await http.get(`${configJSON.API_HOST}/goods?action=fetchAll`);

      return data;
    } catch (error) {
      return error;
    }
  },
  fetchAllWithConcreteFields: async (fields) => {
    try {
      const { data } = await http.post(`${configJSON.API_HOST}/goods?action=fetchAllWithConcreteFields`, { fields });
      return data;
    } catch (error) {
      return error;
    }
  },
  fetchByArrayId: async (arrayId) => {
    try {
      const { data } = await http.post(`${configJSON.API_HOST}/goods?action=fetchByArrayId`, { arrayId });
      return data;
    } catch (error) {
      return error;
    }
  },
  getGoodById: async (goodId) => {
    try {
      const data = await http.post(`${configJSON.API_HOST}/goods?action=getGoodById`, { goodId });
      return data;
    } catch (error) {
      return error;
    }
  },
  saveGood: async (good) => {
    try {
      const respons = await http.post(`${configJSON.API_HOST}/goods?action=saveGood`, { good });

      return respons;
    } catch (error) {
      return error;
    }
  },

  removeGoodById: async (goodId) => {
    try {
      const { data } = await http.post(`${configJSON.API_HOST}/goods?action=removeGoodById`, { goodId });

      return data;
    } catch (error) {
      return error;
    }
  },
};

export default goodsService;
