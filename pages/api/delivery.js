import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { ObjectId } from "mongodb";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const { action } = req.query;

  try {
    if (action === "fetchAll") {
      let data = await req.db.collection("delivery").find({}).toArray();
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ error: { code: 500, message: `Error goods API (get metod) - ${JSON.stringify(error.message)}` } });
  }
});

handler.post(async (req, res) => {
  try {
    const { action } = req.query;
    const { news } = req.body;

    if (action === "saveDelivery") {
      let data = null;
      if (news._id) {
        const dataForUpdate = { ...news };
        delete dataForUpdate._id;

        data = await req.db.collection("delivery").updateOne({ _id: new ObjectId(news._id) }, { $set: dataForUpdate });
      } else {
        data = await req.db.collection("delivery").insertOne(news);
      }

      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ error: { code: 500, message: `Error delivery API (post metod) - ${JSON.stringify(error.message)}` } });
  }
});

export default handler;
