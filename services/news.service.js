import http from "./http.service";

const newsService = {
  fetchAll: async () => {
    try {
      const { data } = await http.get(
        `${process.env.API_HOST}/news?action=fetchAll`
      );
      return data;
    } catch (error) {
      return null;
    }
  },
};

export default newsService;
