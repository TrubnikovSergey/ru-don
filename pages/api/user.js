import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { ObjectId } from "mongodb";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const { action } = req.query;

  if (action === "fetchAll") {
    let data = await req.db.collection("users").find({}).toArray();
    res.status(200).json(data);
  }
});

handler.post(async (req, res) => {
  try {
    const { action } = req.query;
    const { user, userId } = req.body;

    if (action === "removeUserById") {
      const data = await req.db.collection("users").deleteOne({ _id: new ObjectId(userId) });
      res.status(200).json(data);
    }

    if (action === "saveUser") {
      let data = null;
      if (user._id) {
        const dataForUpdate = { ...user };
        delete dataForUpdate._id;

        data = await req.db.collection("users").updateOne({ _id: new ObjectId(user._id) }, { $set: dataForUpdate });
      } else {
        data = await req.db.collection("users").insertOne(user);
      }

      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ message: `На сервере произошла ошибка\n${error}` });
  }
});

export default handler;
