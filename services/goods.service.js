import http from "./http.service";
import configJSON from "../config.json";

const goodsService = {
  fetchAll: async (option) => {
    try {
      const respons = await http.get(`${configJSON.API_HOST}/goods?action=fetchAll&limit=${option.limit}&page=${option.page}`);

      return respons;
    } catch (error) {
      return getResponsError(error);
    }
  },
  fetchAllWithConcreteFields: async (arrayFields) => {
    try {
      const respons = await http.post(`${configJSON.API_HOST}/goods?action=fetchAllWithConcreteFields`, { arrayFields });
      return respons;
    } catch (error) {
      return getResponsError(error);
    }
  },
  fetchByArrayId: async (arrayId) => {
    try {
      const respons = await http.post(`${configJSON.API_HOST}/goods?action=fetchByArrayId`, { arrayId });
      return respons;
    } catch (error) {
      return getResponsError(error);
    }
  },
  getGoodsById: async (goodsId) => {
    try {
      const respons = await http.post(`${configJSON.API_HOST}/goods?action=getGoodsById`, { goodsId });
      return respons;
    } catch (error) {
      return getResponsError(error);
    }
  },
  saveGoods: async (goods) => {
    try {
      const respons = await http.post(`${configJSON.API_HOST}/goods?action=saveGoods`, { goods });

      return respons;
    } catch (error) {
      return getResponsError(error);
    }
  },

  removeGoodsById: async (goodsId) => {
    try {
      const respons = await http.post(`${configJSON.API_HOST}/goods?action=removeGoodsById`, { goodsId });

      return respons;
    } catch (error) {
      return getResponsError(error);
    }
  },
};

export default goodsService;
