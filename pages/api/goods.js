import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { Binary, ObjectId } from "mongodb";
import * as fs from "fs";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const { action, limit, page, search, categoryId } = req.query;

  try {
    if (action === "fetchAll") {
      let dataPaginate = [];
      let totalCount = 0;
      let skip = (Number(page) - 1) * Number(limit);

      if (search && categoryId) {
        const regExpSearch = new RegExp(`${search}`, "i");
        dataPaginate = await req.db
          .collection("goods")
          .find({ $or: [{ title: regExpSearch }, { description: regExpSearch }], categoryId })
          .skip(skip)
          .limit(Number(limit))
          .toArray();
        totalCount = await req.db
          .collection("goods")
          .find({ $or: [{ title: regExpSearch }, { description: regExpSearch }], categoryId })
          .count();
      } else if (search) {
        const regExpSearch = new RegExp(`${search}`, "i");
        dataPaginate = await req.db
          .collection("goods")
          .find({ $or: [{ title: regExpSearch }, { description: regExpSearch }] })
          .skip(skip)
          .limit(Number(limit))
          .toArray();
        totalCount = await req.db
          .collection("goods")
          .find({ $or: [{ title: regExpSearch }, { description: regExpSearch }] })
          .count();
      } else if (categoryId) {
        dataPaginate = await req.db.collection("goods").find({ categoryId }).skip(skip).limit(Number(limit)).toArray();
        totalCount = await req.db.collection("goods").find({ categoryId }).count();
      } else {
        totalCount = await req.db.collection("goods").count();

        dataPaginate = await req.db.collection("goods").find().skip(skip).limit(Number(limit)).toArray();
      }

      return res.status(200).json({ dataPaginate, totalCount });
    }
  } catch (error) {
    return res.status(500).json({ error: { code: 500, message: `Error goods API (get metod) - ${JSON.stringify(error)}` } });
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

        return res.status(200).json(data);
      } else {
        return res.status(200).json([]);
      }
    }

    if (action === "removeGoodsById") {
      const { goodsId } = req.body;

      const data = await req.db.collection("goods").deleteOne({ _id: new ObjectId(goodsId) });
      return res.status(200).json(data);
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

      return res.status(200).json(data);
    }

    if (action === "getGoodsById") {
      const { goodsId } = req.body;
      const data = await req.db.collection("goods").findOne({ _id: new ObjectId(goodsId) });

      return res.status(200).json(data);
    }

    if (action === "fetchAllWithConcreteFields") {
      const { arrayFields } = req.body;
      const selectionFields = arrayFields.map((item) => ({ [item]: 1 })).reduce((item, acc) => ({ ...acc, ...item }), {});
      const data = await req.db.collection("goods").find({}).project(selectionFields).toArray();

      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ error: { code: 500, message: `Error goods API (post metod) - ${JSON.stringify(error)}` } });
  }
});

export default handler;
