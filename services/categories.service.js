import http from "./http.service";
import configJSON from "../config.json";
import { getResponsError } from "@/utils/errors";

const categoriesService = {
  fetchAll: async () => {
    try {
      const respons = await http.get(`${configJSON.API_HOST}/categories?action=fetchAll`);

      return respons;
    } catch (error) {
      return getResponsError(error);
    }
  },
  fetchAllWithConcreteFields: async (fields) => {
    try {
      const respons = await http.post(`${configJSON.API_HOST}/categories?action=fetchAllWithConcreteFields`, { fields });

      return respons;
    } catch (error) {
      return getResponsError(error);
    }
  },
  fetchRootCategories: async () => {
    try {
      const respons = await http.get(`${configJSON.API_HOST}/categories?action=fetchRootCategories`);

      return respons;
    } catch (error) {
      return getResponsError(error);
    }
  },
  fetchByArrayId: async (arrayId) => {
    try {
      const respons = await http.post(`${configJSON.API_HOST}/categories?action=fetchByArrayId`, { arrayId });

      return respons;
    } catch (error) {
      return getResponsError(error);
    }
  },
  getCategoryById: async (categoryId) => {
    try {
      const respons = await http.post(`${configJSON.API_HOST}/categories?action=getCategoryById`, { categoryId });

      return respons;
    } catch (error) {
      return getResponsError(error);
    }
  },
  saveCategory: async (category) => {
    try {
      const respons = await http.post(`${configJSON.API_HOST}/categories?action=saveCategory`, { category });

      return respons;
    } catch (error) {
      return getResponsError(error);
    }
  },

  removeCategoryById: async (categoryId) => {
    try {
      const respons = await http.post(`${configJSON.API_HOST}/categories?action=removeCategoryById`, { categoryId });

      return respons;
    } catch (error) {
      return getResponsError(error);
    }
  },
};

export default categoriesService;
