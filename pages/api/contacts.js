import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { ObjectId } from "mongodb";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const { action } = req.query;

  if (action === "fetchAll") {
    let data = await req.db.collection("contacts").find({}).toArray();
    res.status(200).json(data);
  }
});

handler.post(async (req, res) => {
  try {
    const { action } = req.query;
    const { contact, contactId } = req.body;

    if (action === "removeContactById") {
      const data = await req.db.collection("contacts").deleteOne({ _id: new ObjectId(contactId) });
      res.status(200).json(data);
    }

    if (action === "saveContact") {
      let data = null;
      if (contact._id) {
        const dataForUpdate = { ...contact };
        delete dataForUpdate._id;

        data = await req.db.collection("contacts").updateOne({ _id: new ObjectId(contact._id) }, { $set: dataForUpdate });
      } else {
        data = await req.db.collection("contacts").insertOne(contact);
      }

      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ message: `На сервере произошла ошибка\n${error}` });
  }
});

export default handler;
