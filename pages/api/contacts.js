import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { ObjectId } from "mongodb";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const { action } = req.query;

  try {
    if (action === "fetchAll") {
      let data = await req.db.collection("contacts").find({}).toArray();
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ error: { code: 500, message: `Error contacts API (get metod) - ${JSON.stringify(error.message)}` } });
  }
});

handler.post(async (req, res) => {
  try {
    const { action } = req.query;
    const { contact, contactId } = req.body;

    if (action === "removeContactById") {
      const data = await req.db.collection("contacts").deleteOne({ _id: new ObjectId(contactId) });
      return res.status(200).json(data);
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

      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ error: { code: 500, message: `Error contacts API (post metod) - ${JSON.stringify(error.message)}` } });
  }
});

export default handler;
