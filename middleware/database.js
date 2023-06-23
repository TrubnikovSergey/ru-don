import { MongoClient } from "mongodb";
import nextConnect from "next-connect";
// import fs from "fs";
// import path from "path";
import cors from "cors";

// const sslPath = path.join(__dirname, "../../../../", `ssl/${process.env.ssl}`);

// const ca = [fs.readFileSync(path.join(sslPath, "ca.pem"))];
// const cert = fs.readFileSync(path.join(sslPath, `${process.env.ssl}.pem`));
// const key = fs.readFileSync(path.join(sslPath, `${process.env.ssl}.pem`));

const mongoURL = process.env.MONGO_URL;
const dbName = process.env.DBName;
const client = new MongoClient(`${mongoURL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ,ssl: true,
// sslValidate: false,
// sslCA: ca,
// sslKey: key,
// sslCert: cert,
// },
// function (err, db) {
// console.log("---MONGO SSL connect callback error---", err);
// db.close();
// }

async function database(req, res, next) {
  try {
    await client.connect();
    req.dbClient = client;
    req.db = client.db(dbName);
  } catch (error) {
    console.log("---MONGO connect error---", error);
    client.close();
  }
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
