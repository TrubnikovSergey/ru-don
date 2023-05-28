import { MongoClient } from "mongodb";
import style from "./contacts.module.scss";
import Card from "@/components/card";

export const getServerSideProps = async () => {
  const mongoURL = process.env.MONGO_URL;
  const client = new MongoClient(`${mongoURL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const req = client.db("energy");
  let dataContacts = await req.collection("contacts").find({}).toArray();

  client.close();

  if (!dataContacts || dataContacts.length === 0 || dataContacts.name === "Error") {
    return { notFound: true };
  }

  return {
    props: { contacts: JSON.parse(JSON.stringify(dataContacts)) },
  };
};

const Contacts = ({ contacts }) => {
  return (
    <Card moreStyle={style.main}>
      <main>
        <h1 className={style["title-section"]}>Контакты</h1>
        <div className={style.content}>
          <section className={style["wrapper-list"]}>
            <div className={style["list-contacts"]}>
              {contacts &&
                contacts.map((item) => (
                  <div className={style["item-contact"]} key={item._id}>
                    <p className={style.title}>{item.title}</p>
                    <p className={style.description}>{item.description}</p>
                  </div>
                ))}
            </div>
          </section>
          <section className={style.map}>карта</section>
        </div>
      </main>
    </Card>
  );
};

export default Contacts;
