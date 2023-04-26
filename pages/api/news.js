import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { ObjectId } from "mongodb";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const { action } = req.query;

  if (action === "fetchAll") {
    let data = await req.db.collection("news").find({}).toArray();
    res.status(200).json(data);
  }
});

handler.post(async (req, res) => {
  try {
    const { action } = req.query;
    const { news, newsId } = req.body;

    if (action === "removeNewsById") {
      const data = await req.db.collection("news").deleteOne({ _id: new ObjectId(newsId) });
      res.status(200).json(data);
    }

    if (action === "saveNews") {
      let data = null;
      if (news._id) {
        const dataForUpdate = { ...news };
        delete dataForUpdate._id;

        data = await req.db.collection("news").updateOne({ _id: new ObjectId(news._id) }, { $set: dataForUpdate });
      } else {
        data = await req.db.collection("news").insertOne(news);
      }

      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ message: `На сервере произошла ошибка\n${error}` });
  }
});

export default handler;
