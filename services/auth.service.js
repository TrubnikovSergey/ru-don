import http from "./http.service";
import configJSON from "../config.json";

const authService = {
  signIn: async (authData) => {
    try {
      const data = await http.post(`${configJSON.API_HOST}/login?action=signIn`, authData);

      return data;
    } catch (error) {
      const code = error.response.status;
      const massage = error.response.data.massage;

      return { error: { code, massage } };
    }
  },
};

export default authService;
