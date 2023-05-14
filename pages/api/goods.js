import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { Binary, ObjectId } from "mongodb";
import * as fs from "fs";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const { action } = req.query;

  try {
    if (action === "fetchAll") {
      let data = await req.db.collection("goods").find({}).toArray();
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ error: { code: 500, message: `Error goods API (get metod) - ${JSON.stringify(error)}` } });
  }
});

handler.post(async (req, res) => {
  try {
    const { action } = req.query;

    if (action === "fetchByArrayId") {
      const { arrayId } = req.body;
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
      const { goodsId } = req.body;

      const data = await req.db.collection("goods").deleteOne({ _id: new ObjectId(goodsId) });
      res.status(200).json(data);
    }
    if (action === "saveGoods") {
      const { goods } = req.body;
      let data = null;

      if (goods._id) {
        const dataForUpdate = { ...goods };
        delete dataForUpdate._id;

        data = await req.db.collection("goods").updateOne({ _id: new ObjectId(goods._id) }, { $set: dataForUpdate });
      } else {
        data = await req.db.collection("goods").insertOne(goods);
      }

      res.status(200).json(data);
    }

    if (action === "getGoodsById") {
      const { goodsId } = req.body;
      const data = await req.db.collection("goods").findOne({ _id: new ObjectId(goodsId) });

      res.status(200).json(data);
    }

    if (action === "fetchAllWithConcreteFields") {
      const { arrayFields } = req.body;
      const selectionFields = arrayFields.map((item) => ({ [item]: 1 })).reduce((item, acc) => ({ ...acc, ...item }), {});
      const data = await req.db.collection("goods").find({}).project(selectionFields).toArray();

      res.status(200).json(data);
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: { code: 500, message: `Error goods API (post metod) - ${JSON.stringify(error)}` } });
  }
});

export default handler;
