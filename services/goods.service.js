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
  fetchAllWithConcreteFields: async (arrayFields) => {
    try {
      const { data } = await http.post(`${configJSON.API_HOST}/goods?action=fetchAllWithConcreteFields`, { arrayFields });
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
  getGoodById: async (goodsId) => {
    try {
      const data = await http.post(`${configJSON.API_HOST}/goods?action=getGoodById`, { goodsId });
      return data;
    } catch (error) {
      return error;
    }
  },
  saveGoods: async (goods) => {
    console.log("-----Service goods saveGoods");
    try {
      const respons = await http.post(`${configJSON.API_HOST}/goods?action=saveGoods`, goods, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return respons;
    } catch (error) {
      return error;
    }
  },
  sendFormData: async (data) => {
    try {
      const respons = await http.post(`${configJSON.API_HOST}/goods?action=formData`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return respons;
    } catch (error) {
      return error;
    }
  },

  removeGoodById: async (goodsId) => {
    try {
      const { data } = await http.post(`${configJSON.API_HOST}/goods?action=removeGoodsById`, { goodsId });

      return data;
    } catch (error) {
      return error;
    }
  },
};

export default goodsService;
