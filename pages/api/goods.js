import { goods } from "../../mockdata/index";

export default function handler(req, res) {
  if (req.url === "/api/goods" && req.method === "GET") {
    res.status(200).json(goods);
  }
}
