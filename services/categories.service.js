import http from "./http.service";

const categoriesService = {
  fetchAll: async () => {
    try {
      const { data } = await http.get(
        `${process.env.API_HOST}/categories?action=fetchAll`
      );
      return data;
    } catch (error) {
      return null;
    }
  },
};

export default categoriesService;
