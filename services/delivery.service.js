import http from "./http.service";
import configJSON from "../config.json";

const deliveryService = {
  fetchAll: async () => {
    try {
      const { data } = await http.get(`${configJSON.API_HOST}/delivery?action=fetchAll`);
      return data;
    } catch (error) {
      return getResponsError(error);
    }
  },
  saveDelivery: async (news) => {
    try {
      const data = await http.post(`${configJSON.API_HOST}/delivery?action=saveDelivery`, { news });
      return data;
    } catch (error) {
      return getResponsError(error);
    }
  },
};

export default deliveryService;
