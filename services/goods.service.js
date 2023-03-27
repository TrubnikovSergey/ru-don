import http from "./http.service";

const goodsService = {
  fetchAll: async () => {
    try {
      const { data } = await http.get(
        `${process.env.API_HOST}/goods?action=fetchAll`
      );
      return data;
    } catch (error) {
      return null;
    }
  },
  getGoodById: () => {},
};

export default goodsService;
