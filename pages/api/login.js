import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { ObjectId } from "mongodb";
import * as bcrypt from "bcryptjs";

const handler = nextConnect();
// async function auth(req, res, next) {
//   console.log("--------\n");
//   console.log("--------req.query\n", req.query);
//   console.log("--------req.body\n", req.body);
//   console.log("--------next\n", next);
//   console.log("--------\n");

//   return next();
// }

handler.use(middleware);
// handler.use(auth);

handler.post(async (req, res) => {
  try {
    const { action } = req.query;
    const { email, password } = req.body;

    if (action === "signIn") {
      const isExistUser = await req.db.collection("users").findOne({ email });

      if (!isExistUser) {
        res.status(400).json({ error: { code: 400, message: `User with this email not found` } });
      }

      const isPasswordEqvl = await bcrypt.compare(password, isExistUser.password);

      if (!isPasswordEqvl) {
        res.status(400).json({ error: { code: 400, message: `Wrong password` } });
      }

      res.status(200).json({ _id: isExistUser._id, title: isExistUser.title, email: isExistUser.email });
    }
  } catch (error) {
    res.status(500).json({ error: { code: 500, message: `Error login API (post metod) - ${JSON.stringify(error)}` } });
  }
});

export default handler;
