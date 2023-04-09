import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { ObjectId } from "mongodb";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const { action } = req.query;

  if (action === "fetchAll") {
    let data = await req.db.collection("goods").find({}).toArray();
    res.status(200).json(data);
  }
});

handler.post(async (req, res) => {
  try {
    const { action } = req.query;
    const { arrayId, categoryId, fields } = req.body;

    if (action === "fetchByArrayId") {
      if (arrayId.length > 0) {
        const arrayObjectId = arrayId.map((item) => new ObjectId(item));

        const data = await req.db
          .collection("goods")
          .find({ _id: { $in: arrayObjectId } })
          .toArray();

        res.status(200).json(data);
      } else {
        res.status(200).json([]);
      }
    }

    if (action === "removeGoodsById") {
      const data = await req.db.collection("goods").deleteOne({ _id: new ObjectId(goodsId) });

      res.status(200).json(data);
    }

    if (action === "saveGood") {
      const { good } = req.body;

      let data = null;
      if (good._id) {
        const dataForUpdate = { ...good };
        delete dataForUpdate._id;

        data = await req.db.collection("goods").updateOne({ _id: new ObjectId(good._id) }, { $set: dataForUpdate });
      } else {
        data = await req.db.collection("goods").insertOne(good);
      }

      res.status(200).json(data);
    }

    if (action === "getGoodById") {
      const { goodId } = req.body;
      const data = await req.db.collection("goods").findOne({ _id: new ObjectId(goodId) });

      res.status(200).json(data);
    }

    if (action === "fetchAllWithConcreteFields") {
      const selectionFields = fields.map((item) => ({ [item]: 1 })).reduce((item, acc) => ({ ...acc, ...item }), {});
      const data = await req.db.collection("goods").find({}).project(selectionFields).toArray();

      res.status(200).json(data);
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: `На сервере произошла ошибка\n${error}` });
  }
});

export default handler;
