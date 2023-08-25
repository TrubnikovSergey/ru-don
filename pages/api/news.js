import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { ObjectId } from "mongodb";
import { flushSync } from "react-dom";
import * as fs from "fs";
import * as path from "path";
import { createNameImageWithID } from "@/utils/images";

const handler = nextConnect();
const staticFolder = process.env.staticFolder;
handler.use(middleware);

handler.get(async (req, res) => {
  const { action } = req.query;

  try {
    if (action === "fetchAll") {
      let data = await req.db.collection("news").find({}).toArray();
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ error: { code: 500, message: `Error news API (get metod) action (${action}) - ${JSON.stringify(error.message)}` } });
  }
});

handler.post(async (req, res) => {
  try {
    const { action } = req.query;
    const { news, newsId } = req.body;

    if (action === "removeNewsById") {
      const removeNews = await req.db.collection("news").findOne({ _id: new ObjectId(newsId) });

      removeNews.images.forEach((item) => {
        try {
          fs.unlinkSync(`${staticFolder}/images/${createNameImageWithID(item)}`);
        } catch (error) {
          throw new Error(`Something wrong with remove news images`);
        }
      });

      const data = await req.db.collection("news").deleteOne({ _id: new ObjectId(newsId) });
      return res.status(200).json(data);
    }

    if (action === "saveNews") {
      let data = null;

      if (news.images.length > 0) {
        news.images.forEach((img) => {
          if ("imageBase64" in img) {
            const extention = img.name.split(".")[1];
            const base64Data = img.imageBase64.split("base64,")[1];
            const pathImg = `${staticFolder}/images/${img._id}.${extention}`;

            fs.writeFileSync(pathImg, base64Data, "base64");
          }
        });
      }

      news.images = news.images.map((img) => {
        const newImg = { ...img };
        delete newImg.imageBase64;

        return newImg;
      });

      if (news._id) {
        const dataForUpdate = { ...news };
        delete dataForUpdate._id;

        data = await req.db.collection("news").updateOne({ _id: new ObjectId(news._id) }, { $set: dataForUpdate });
      } else {
        data = await req.db.collection("news").insertOne(news);
      }

      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ error: { code: 500, message: `Error news API (post metod) - ${JSON.stringify(error.message)}` } });
  }
});

export default handler;
