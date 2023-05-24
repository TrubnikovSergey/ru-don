import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { ObjectId } from "mongodb";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const { action } = req.query;

  try {
    if (action === "fetchAll") {
      try {
        let data = await req.db.collection("about").find({}).toArray();
        return res.status(200).json(data);
      } catch (error) {
        return res.status(500).json({ error: { code: 500, message: `Server error - ${JSON.stringify(error)}` } });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: { code: 500, message: `Error about API (get metod) - ${JSON.stringify(error)}` } });
  }
});

handler.post(async (req, res) => {
  try {
    const { action } = req.query;
    const { about } = req.body;

    if (action === "saveAbout") {
      let data = null;
      if (about._id) {
        const dataForUpdate = { ...about };
        delete dataForUpdate._id;

        data = await req.db.collection("about").updateOne({ _id: new ObjectId(about._id) }, { $set: dataForUpdate });
      } else {
        data = await req.db.collection("about").insertOne(about);
      }

      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ error: { code: 500, message: `Error about API (post metod) - ${JSON.stringify(error)}` } });
  }
});

export default handler;
