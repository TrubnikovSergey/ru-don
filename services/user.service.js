import http from "./http.service";
import configJSON from "../config.json";
import { getResponsError } from "@/utils/errors";

const userService = {
  fetchAll: async () => {
    try {
      const respons = await http.get(`${configJSON.API_HOST}/user?action=fetchAll`);
      return respons;
    } catch (error) {
      return getResponsError(error);
    }
  },
  saveUser: async (user) => {
    try {
      const respons = await http.post(`${configJSON.API_HOST}/user?action=saveUser`, { user });
      return respons;
    } catch (error) {
      return getResponsError(error);
    }
  },

  removeUserById: async (userId) => {
    try {
      const respons = await http.post(`${configJSON.API_HOST}/user?action=removeUserById`, { userId });
      return respons;
    } catch (error) {
      return getResponsError(error);
    }
  },
};

export default userService;
