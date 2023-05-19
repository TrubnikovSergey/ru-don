import http from "./http.service";
import configJSON from "../config.json";

const deliveryService = {
  fetchAll: async () => {
    try {
      const respons = await http.get(`${configJSON.API_HOST}/delivery?action=fetchAll`);
      return respons;
    } catch (error) {
      return getResponsError(error);
    }
  },
  saveDelivery: async (news) => {
    try {
      const respons = await http.post(`${configJSON.API_HOST}/delivery?action=saveDelivery`, { news });
      return respons;
    } catch (error) {
      return getResponsError(error);
    }
  },
};

export default deliveryService;
