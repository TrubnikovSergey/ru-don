import { MongoClient } from "mongodb";
import nextConnect from "next-connect";

const mongoURL = process.env.MONGO_URL;
const client = new MongoClient(`${mongoURL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res, next) {
  if (!client) await client.connect();
  req.dbClient = client;
  req.db = client.db("energy");
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
