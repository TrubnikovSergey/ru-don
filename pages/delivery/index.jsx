import { MongoClient } from "mongodb";
import style from "./delivery.module.scss";

export const getStaticProps = async () => {
  const mongoURL = process.env.MONGO_URL;
  const client = new MongoClient(`${mongoURL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const req = client.db("energy");
  let dataDelivery = await req.collection("delivery").find({}).toArray();

  client.close();

  if (!dataDelivery || dataDelivery.length === 0 || dataDelivery.name === "Error") {
    return { notFound: true };
  }

  return {
    props: {
      delivery: JSON.parse(JSON.stringify(dataDelivery)),
    },
    revalidate: 10,
  };
};

const SectionDelivery = ({ delivery }) => {
  const data = delivery.length > 0 ? delivery[0] : {};

  return (
    <section className={style.delivery}>
      <h1 className={style.title}>{data.title}</h1>
      <pre className={style.description}>{data.description}</pre>
    </section>
  );
};

export default SectionDelivery;
