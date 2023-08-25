import { MongoClient } from "mongodb";
import style from "./about.module.scss";
import Card from "@/components/card";
import Head from "next/head";

export const getServerSideProps = async () => {
  const mongoURL = process.env.MONGO_URL;
  const dbName = process.env.DBName;
  const client = new MongoClient(`${mongoURL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const req = client.db(dbName);
  let dataAbout = await req.collection("about").find({}).toArray();

  client.close();

  if (!dataAbout || dataAbout.length === 0 || dataAbout.name === "Error") {
    return { notFound: true };
  }

  return {
    props: {
      about: JSON.parse(JSON.stringify(dataAbout)),
    },
  };
};

const SectionAbout = ({ about }) => {
  const data = about.length > 0 ? about[0] : {};

  return (
    <>
      <Head>
        <title>О нас</title>
      </Head>
      <Card moreStyle={style.about}>
        <main>
          <h1 className={style.title}>{data.title}</h1>
          <div className={style.description}>{data.description}</div>
        </main>
      </Card>
    </>
  );
};

export default SectionAbout;
