import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { ObjectId, MongoClient } from "mongodb";

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

        res.status(200).json(data);
      } else {
        res.status(200).json([]);
      }
    }

    if (action === "removeCategoryById") {
      const goodsWithCategory = await req.db.collection("goods").count({ categoryId: categoryId });
      const categoriesWithCategory = await req.db.collection("categories").count({ parent: categoryId });

      if (goodsWithCategory > 0 || categoriesWithCategory > 0) {
        const message = `На удаляемую категорию есть ссылки: (${goodsWithCategory}) в товарах , (${categoriesWithCategory}) в категориях`;

        res.status(409).json({
          message,
        });
      } else {
        const data = await req.db.collection("categories").deleteOne({ _id: new ObjectId(categoryId) });

        res.status(200).json(data);
      }
    }

    if (action === "saveCategory") {
      const { category } = req.body;

      let data = null;
      if (category._id) {
        const dataForUpdate = { ...category };
        delete dataForUpdate._id;

        data = await req.db.collection("categories").updateOne({ _id: new ObjectId(category._id) }, { $set: dataForUpdate });
      } else {
        data = await req.db.collection("categories").insertOne(category);
      }

      res.status(200).json(data);
    }

    if (action === "getCategoryById") {
      const { categoryId } = req.body;
      const data = await req.db.collection("categories").findOne({ _id: new ObjectId(categoryId) });

      res.status(200).json(data);
    }

    if (action === "fetchAllWithConcreteFields") {
      const selectionFilds = fields.map((item) => ({ [item]: 1 })).reduce((item, acc) => ({ ...acc, ...item }), {});
      const data = await req.db.collection("categories").find({}).project(selectionFilds).toArray();

      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ message: `На сервере произошла ошибка\n${error}` });
  }
});

/////////////////////////////////////////////////////
async function checkParentReferens(category) {
  const respons = await categoriesService.getCategoryById(category._id);
  const categoryFromBD = respons.data;

  const changedCategories = [];
  if (categoryFromBD && category.parent !== categoryFromBD.parent) {
    if (!category.parent && categoryFromBD.parent) {
      const changedObject = await changeParentReferens(categoryFromBD.parent, categoryFromBD._id, "remove");
      changedCategories.push(changedObject);
    } else if (category.parent && !categoryFromBD.parent) {
      const changedObject = await changeParentReferens(category.parent, category._id, "add");
      changedCategories.push(changedObject);
    } else if (category.parent && categoryFromBD.parent) {
      const changedObject = await changeParentReferens(categoryFromBD.parent, categoryFromBD._id, "remove");
      changedCategories.push(changedObject);

      const changedObject2 = await changeParentReferens(category.parent, categoryFromBD._id, "add");
      changedCategories.push(changedObject2);
    }
  }

  return changedCategories;
}

async function changeParentReferens(parentId, childrenId, mode) {
  const respons = await categoriesService.getCategoryById(parentId);
  const categoryParent = respons.data;

  addRemoveChildrenCategory(categoryParent, childrenId, mode);
  await categoriesService.saveCategory(categoryParent);

  return categoryParent;
}

function addRemoveChildrenCategory(parent, childrenId, mode) {
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

async function test(data) {
  const client = new MongoClient("mongodb://82.148.28.101:27017", {
    // const client = new MongoClient("mongodb://127.0.0.1:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const req = client.db("energy");
  let dataCategories = await req.collection("categories").find({ parent: null }).toArray();
  let dataGoods = await req.collection("goods").find({}).toArray();

  console.log("------dataCategories", dataCategories);
  console.log("------dataGoods", dataGoods);
  console.log("------data", data);
}

//////////////////////////////////////////////

export default handler;
