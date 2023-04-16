import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { ObjectId } from "mongodb";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const { action } = req.query;

  if (action === "fetchAll") {
    let data = await req.db.collection("about").find({}).toArray();
    res.status(200).json(data);
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

      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ message: `На сервере произошла ошибка\n${error}` });
  }
});

export default handler;
