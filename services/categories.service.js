import http from "./http.service";
import configJSON from "../config.json";

const categoriesService = {
  fetchAll: async () => {
    try {
      const { data } = await http.get(`${process.env.API_HOST || configJSON.API_HOST}/categories?action=fetchAll`);

      return data;
    } catch (error) {
      return error;
    }
  },
  fetchAllWithConcreteFields: async (fields) => {
    try {
      const { data } = await http.post(`${process.env.API_HOST || configJSON.API_HOST}/categories?action=fetchAllWithConcreteFields`, { fields });
      return data;
    } catch (error) {
      return error;
    }
  },
  fetchRootCategories: async () => {
    try {
      const { data } = await http.get(`${process.env.API_HOST || configJSON.API_HOST}/categories?action=fetchRootCategories`);
      return data;
    } catch (error) {
      return error;
    }
  },
  fetchByArrayId: async (arrayId) => {
    try {
      const { data } = await http.post(`${process.env.API_HOST || configJSON.API_HOST}/categories?action=fetchByArrayId`, { arrayId });
      return data;
    } catch (error) {
      return error;
    }
  },
  getCategoryById: async (categoryId) => {
    try {
      const data = await http.post(`${process.env.API_HOST || configJSON.API_HOST}/categories?action=getCategoryById`, { categoryId });
      return data;
    } catch (error) {
      return error;
    }
  },
  saveCategory: async (category) => {
    try {
      const respons = await http.post(`${process.env.API_HOST || configJSON.API_HOST}/categories?action=saveCategory`, { category });

      return respons;
    } catch (error) {
      return error;
    }
  },

  removeCategoryById: async (categoryId) => {
    try {
      const { data } = await http.post(`${process.env.API_HOST || configJSON.API_HOST}/categories?action=removeCategoryById`, { categoryId });

      return data;
    } catch (error) {
      return error;
    }
  },
};

export default categoriesService;
