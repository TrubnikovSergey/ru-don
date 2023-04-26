import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { ObjectId } from "mongodb";
import formidable from "formidable";
import * as fs from "fs";

const TEMP = process.env.FOLDER_TEMP;
const UPLOAD = process.env.FOLDER_UPLOAD;
const handler = nextConnect();

handler.use(middleware);

export const config = {
  api: {
    bodyParser: false,
  },
};

handler.get(async (req, res) => {
  const { action } = req.query;

  if (action === "fetchAll") {
    let data = await req.db.collection("goods").find({}).toArray();
    res.status(200).json(data);
  }
});

handler.post(async (req, res) => {
  try {
    const configFormidable = {
      multiples: true,
      uploadDir: "./public/temp",
      keepExtensions: true,
    };
    const form = formidable(configFormidable);

    await form.parse(req, async (err, fields, files) => {
      const { action } = req.query;

      if (action === "fetchByArrayId") {
        const { arrayId } = fields;
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
        const { goodsId } = fields;

        const data = await req.db.collection("goods").deleteOne({ _id: new ObjectId(goodsId) });
        res.status(200).json(data);
      }
      if (action === "saveGoods") {
        const images = "images[]" in files ? files["images[]"] : [];
        const goods = { ...fields };
        let data = null;
        const imagesConvert = (images) => {
          let result = [];
          if (Array.isArray(images)) {
            result = images.map((item) => ({ newFilename: item.newFilename, originalFilename: item.originalFilename, size: item.size }));
          } else {
            result.push({ newFilename: images.newFilename, originalFilename: images.originalFilename, size: images.size });
          }

          return result;
        };

        if (Array.isArray(images)) {
          for (let item of images) {
            try {
              fs.copyFileSync(`${TEMP}/${item.newFilename}`, `${UPLOAD}/${item.newFilename}`);
              fs.unlinkSync(`${TEMP}/${item.newFilename}`);
            } catch (error) {
              console.log("Error Array\n", error);
            }
          }
        } else {
          try {
            fs.copyFileSync(`${TEMP}/${images.newFilename}`, `${UPLOAD}/${images.newFilename}`);
            fs.unlinkSync(`${TEMP}/${images.newFilename}`);
          } catch (error) {
            console.log("Error files\n", error);
          }
        }

        if (goods._id) {
          const { _id } = goods;

          const dataForUpdate = { ...goods };
          delete dataForUpdate._id;
          dataForUpdate.images = imagesConvert(images);

          const goodsBD = await req.db.collection("goods").findOne({ _id: new ObjectId(_id) });

          if (goodsBD?.images?.length > 0) {
            for (let img of goodsBD.images) {
              try {
                fs.unlinkSync(`${UPLOAD}/${img.newFilename}`);
              } catch (error) {}
            }
          }

          data = await req.db.collection("goods").updateOne({ _id: new ObjectId(_id) }, { $set: dataForUpdate });
          data.images = dataForUpdate.images;
        } else {
          const newGoods = { ...goods };
          newGoods.images = imagesConvert(images);

          data = await req.db.collection("goods").insertOne(goods);
          data.images = newGoods.images;
        }

        res.status(200).json(data);
      }

      // if (action === "saveGood") {
      //   let data = null;
      //   const { goods } = fields;

      //   if (goods._id) {
      //     const dataForUpdate = { ...good };
      //     delete dataForUpdate._id;

      //     data = await req.db.collection("goods").updateOne({ _id: new ObjectId(good._id) }, { $set: dataForUpdate });
      //   } else {
      //     data = await req.db.collection("goods").insertOne(good);
      //   }

      //   res.status(200).json(data);
      // }

      if (action === "getGoodById") {
        const { goodsId } = fields;
        const data = await req.db.collection("goods").findOne({ _id: new ObjectId(goodsId) });

        res.status(200).json(data);
      }

      if (action === "fetchAllWithConcreteFields") {
        const { arrayFields } = fields;
        const selectionFields = arrayFields.map((item) => ({ [item]: 1 })).reduce((item, acc) => ({ ...acc, ...item }), {});
        const data = await req.db.collection("goods").find({}).project(selectionFields).toArray();

        res.status(200).json(data);
      }
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: `На сервере произошла ошибка\n${error}` });
  }
});

export default handler;
