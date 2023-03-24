import { categories } from "../../mockdata/index";

export default function handler(req, res) {
  if (req.url === "/api/categories" && req.method === "GET") {
    res.status(200).json(categories);
  }
}
