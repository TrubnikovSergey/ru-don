import { news } from "../../mockdata/index";

export default function handler(req, res) {
  if (req.url === "/api/news" && req.method === "GET") {
    res.status(200).json(news);
  }
}
