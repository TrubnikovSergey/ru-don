import { MongoClient } from "mongodb";
import style from "./delivery.module.scss";
import Card from "@/components/card";

export const getServerSideProps = async () => {
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
  };
};

const SectionDelivery = ({ delivery }) => {
  const data = delivery.length > 0 ? delivery[0] : {};

  return (
    <Card>
      <main className={style.delivery}>
        <h1 className={style.title}>{data.title}</h1>
        <div className={style.description}>{data.description}</div>
      </main>
    </Card>
  );
};

export default SectionDelivery;
