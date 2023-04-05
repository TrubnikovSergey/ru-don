import { ObjectId } from "mongodb";

export async function getObjectCollactionById(req, collactionName, id) {
  const data = await req.db
    .collaction(collactionName)
    .find({ _id: new ObjectId(id) })
    .toArray();

  return data;
}
