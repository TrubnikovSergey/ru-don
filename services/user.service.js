import http from "./http.service";
import configJSON from "../config.json";
import { getResponsError } from "@/utils/errors";

const userService = {
  fetchAll: async () => {
    try {
      const data = await http.get(`${configJSON.API_HOST}/user?action=fetchAll`);
      return data;
    } catch (error) {
      return getResponsError(error);
    }
  },
  saveUser: async (user) => {
    try {
      const data = await http.post(`${configJSON.API_HOST}/user?action=saveUser`, { user });
      return data;
    } catch (error) {
      return getResponsError(error);
    }
  },

  removeUserById: async (userId) => {
    try {
      const data = await http.post(`${configJSON.API_HOST}/user?action=removeUserById`, { userId });
      return data;
    } catch (error) {
      return getResponsError(error);
    }
  },
};

export default userService;
