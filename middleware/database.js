import { MongoClient } from "mongodb";
import nextConnect from "next-connect";
import cors from "cors";

const mongoURL = process.env.MONGO_URL;
const dbName = process.env.DBName;
const client = new MongoClient(`${mongoURL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res, next) {
  if (!client) await client.connect();
  req.dbClient = client;
  req.db = client.db(dbName);
  return next();
}

const middleware = nextConnect();
const host = process.env.API_HOST;
const corsOptions = {
  origin: `${host}`,
};
middleware.use(cors(corsOptions));

middleware.use(database);

export default middleware;
