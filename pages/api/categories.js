import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { MongoClient, ObjectId } from "mongodb";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const { action } = req.query;
  try {
    if (action === "fetchAll") {
      let data = await req.db.collection("categories").find({}).toArray();

      return res.status(200).json(data);
    }

    if (action === "fetchRootCategories") {
      let data = await req.db.collection("categories").find({ parent: null }).toArray();

      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ error: { code: 500, message: `Error categories API (get metod) - ${JSON.stringify(error.message)}` } });
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
          .collection("categories")
          .find({ _id: { $in: arrayObjectId } })
          .toArray();

        return res.status(200).json(data);
      } else {
        return res.status(200).json([]);
      }
    }

    if (action === "removeCategoryById") {
      const goodsWithCategory = await req.db.collection("goods").count({ categoryId: categoryId });
      const categoriesWithCategory = await req.db.collection("categories").count({ parent: categoryId });

      if (goodsWithCategory > 0 || categoriesWithCategory > 0) {
        const message = `Категория не может быт удалена! \n На категорию есть ссылки: (${goodsWithCategory}) в товарах , (${categoriesWithCategory}) в категориях`;

        return res.status(409).json({ _id: categoryId, error: { code: 409, message } });
      } else {
        const data = await req.db.collection("categories").deleteOne({ _id: new ObjectId(categoryId) });

        return res.status(200).json(data);
      }
    }

    if (action === "saveCategory") {
      const { category } = req.body;
      let result = null;
      let changedCategories = [];
      if (category._id) {
        const dataForUpdate = { ...category };
        delete dataForUpdate._id;

        changedCategories = await checkParentReferens(category);
        result = await req.db.collection("categories").updateOne({ _id: new ObjectId(category._id) }, { $set: dataForUpdate });
      } else {
        result = await req.db.collection("categories").insertOne(category);
      }

      return res.status(200).json({ category: result, changedCategories });
    }

    if (action === "getCategoryById") {
      const { categoryId } = req.body;
      const data = await req.db.collection("categories").findOne({ _id: new ObjectId(categoryId) });

      return res.status(200).json(data);
    }

    if (action === "fetchAllWithConcreteFields") {
      const selectionFilds = fields.map((item) => ({ [item]: 1 })).reduce((item, acc) => ({ ...acc, ...item }), {});
      const data = await req.db.collection("categories").find({}).project(selectionFilds).toArray();

      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ error: { code: 500, message: `Error categories API (post metod) - ${JSON.stringify(error.message)}` } });
  }
});

async function checkParentReferens(category) {
  const mongoURL = process.env.MONGO_URL;
  const dbName = process.env.DBName;
  const client = new MongoClient(`${mongoURL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const req = client.db(dbName);

  const categoryFromBD = await req.collection("categories").findOne({ _id: new ObjectId(category._id) });

  const changedCategories = [];
  if (categoryFromBD && category.parent !== categoryFromBD.parent) {
    if (!category.parent && categoryFromBD.parent) {
      const changedObject = await changeParentReferens(req, categoryFromBD.parent, categoryFromBD._id, "remove");
      changedCategories.push(changedObject);
    } else if (category.parent && !categoryFromBD.parent) {
      const changedObject = await changeParentReferens(req, category.parent, category._id, "add");
      changedCategories.push(changedObject);
    } else if (category.parent && categoryFromBD.parent) {
      const changedObject = await changeParentReferens(req, categoryFromBD.parent, categoryFromBD._id, "remove");
      changedCategories.push(changedObject);

      const changedObject2 = await changeParentReferens(req, category.parent, categoryFromBD._id, "add");
      changedCategories.push(changedObject2);
    }
  }

  return changedCategories;
}

async function changeParentReferens(req, parentId, childrenId, mode) {
  const categoryParent = await req.collection("categories").findOne({ _id: new ObjectId(parentId) });

  addRemoveChildrenCategory(categoryParent, childrenId, mode);

  const dataUpdate = { ...categoryParent };
  delete dataUpdate._id;
  await req.collection("categories").updateOne({ _id: new ObjectId(categoryParent._id) }, { $set: dataUpdate });

  return categoryParent;
}

function addRemoveChildrenCategory(parent, children, mode) {
  const childrenId = String(children);
  const isExistChildren = parent.children.includes(childrenId);

  if (mode === "add") {
    if (!isExistChildren) {
      parent.children.unshift(childrenId);
    }
  }

  if (mode === "remove") {
    if (isExistChildren) {
      parent.children = parent.children.filter((item) => item !== childrenId);
    }
  }
}

export default handler;
