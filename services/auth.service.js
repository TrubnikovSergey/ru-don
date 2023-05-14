import http from "./http.service";
import configJSON from "../config.json";
import { getResponsError } from "@/utils/errors";

const authService = {
  signIn: async (authData) => {
    try {
      const data = await http.post(`${configJSON.API_HOST}/login?action=signIn`, authData);

      return data;
    } catch (error) {
      return getResponsError(error);
    }
  },
};

export default authService;
