import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { ObjectId } from "mongodb";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const { action } = req.query;

  if (action === "fetchAll") {
    let data = await req.db.collection("categories").find({}).toArray();
    res.status(200).json(data);
  }
  if (action === "fetchRootCategories") {
    let data = await req.db.collection("categories").find({ parent: null }).toArray();
    res.status(200).json(data);
  }
});

handler.post(async (req, res) => {
  const { action } = req.query;
  const { arrayId, categoryId, fields } = req.body;

  if (action === "fetchByArrayId") {
    if (arrayId.length > 0) {
      const arrayObjectId = arrayId.map((item) => new ObjectId(item));

      const data = await req.db
        .collection("categories")
        .find({ _id: { $in: arrayObjectId } })
        .toArray();

      res.status(200).json(data);
    } else {
      res.status(200).json([]);
    }
  }
  if (action === "saveCategory") {
    const { category } = req.body;

    let data = null;
    if (category._id) {
      const { _id } = category;
      const dataUpdate = { ...category };
      delete dataUpdate._id;

      data = await req.db.collection("categories").updateOne({ _id: new ObjectId(_id) }, { $set: dataUpdate });
    } else {
      data = await req.db.collection("categories").insertOne(category);
    }

    res.status(200).json(data);
  }
  if (action === "getCategoryById") {
    const { categoryId } = req.body;
    const data = await req.db.collection("categories").find(ObjectId(categoryId));

    res.status(200).json(data);
  }
  if (action === "fetchAllWithConcreteFields") {
    const selectionFilds = fields.map((item) => ({ [item]: 1 })).reduce((item, acc) => ({ ...acc, ...item }), {});
    const data = await req.db.collection("categories").find({}).project(selectionFilds).toArray();

    res.status(200).json(data);
  }
});

export default handler;
