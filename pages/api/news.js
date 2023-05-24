import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { ObjectId } from "mongodb";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const { action } = req.query;

  try {
    if (action === "fetchAll") {
      let data = await req.db.collection("news").find({}).toArray();
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ error: { code: 500, message: `Error news API (get metod) - ${JSON.stringify(error)}` } });
  }
});

handler.post(async (req, res) => {
  try {
    const { action } = req.query;
    const { news, newsId } = req.body;

    if (action === "removeNewsById") {
      const data = await req.db.collection("news").deleteOne({ _id: new ObjectId(newsId) });
      return res.status(200).json(data);
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

      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ error: { code: 500, message: `Error news API (post metod) - ${JSON.stringify(error)}` } });
  }
});

export default handler;
