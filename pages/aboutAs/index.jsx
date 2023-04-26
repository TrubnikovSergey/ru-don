import { MongoClient } from "mongodb";
import style from "./about.module.scss";

export const getServerSideProps = async () => {
  const mongoURL = process.env.MONGO_URL;
  const client = new MongoClient(`${mongoURL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const req = client.db("energy");
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
    <section className={style.about}>
      <h1 className={style.title}>{data.title}</h1>
      <pre className={style.description}>{data.description}</pre>
    </section>
  );
};

export default SectionAbout;
