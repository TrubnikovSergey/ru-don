import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { ObjectId } from "mongodb";
import * as bcrypt from "bcryptjs";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const { action } = req.query;

  try {
    if (action === "fetchAll") {
      let data = await req.db.collection("users").find({}).toArray();
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ error: { code: 500, message: `Error user API (get metod) - ${JSON.stringify(error.message)}` } });
  }
});

handler.post(async (req, res) => {
  try {
    const { action } = req.query;
    const { user, userId } = req.body;

    if (action === "removeUserById") {
      const data = await req.db.collection("users").deleteOne({ _id: new ObjectId(userId) });
      return res.status(200).json(data);
    }

    if (action === "saveUser") {
      if (user._id) {
        const userBD = await req.db.collection("users").findOne({ _id: new ObjectId(user._id) });

        if (userBD) {
          if (user.password) {
            const hashPassword = await bcrypt.hash(user.password, 12);
            user.password = hashPassword;
          } else {
            user.password = userBD.password;
          }

          const dataForUpdate = { ...user };
          delete dataForUpdate._id;

          const data = await req.db.collection("users").updateOne({ _id: new ObjectId(user._id) }, { $set: dataForUpdate });
          return res.status(200).json(data);
        } else {
          return res.status(500).json({ error: { code: 500, message: `User with name ${user.title} not found` } });
        }
      } else {
        const data = await req.db.collection("users").insertOne(user);
        return res.status(200).json(data);
      }
    }
  } catch (error) {
    return res.status(500).json({ error: { code: 500, message: `Error user API (post metod) - ${JSON.stringify(error.message)}` } });
  }
});

export default handler;
