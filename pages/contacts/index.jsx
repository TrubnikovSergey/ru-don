import { MongoClient } from "mongodb";
import Card from "@/components/card";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import style from "./contacts.module.scss";
import Head from "next/head";

export const getServerSideProps = async () => {
  const mongoURL = process.env.MONGO_URL;
  const dbName = process.env.DBName;
  const client = new MongoClient(`${mongoURL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const req = client.db(dbName);
  let dataContacts = await req.collection("contacts").find({}).toArray();

  client.close();

  if (!dataContacts || dataContacts.name === "Error") {
    dataContacts = [];
  }

  return {
    props: { contacts: JSON.parse(JSON.stringify(dataContacts)) },
  };
};

const Contacts = ({ contacts }) => {
  return (
    <>
      <Head>
        <title>Контакты</title>
      </Head>
      <YMaps>
        <Card moreStyle={style.main}>
          <main>
            <h1 className={style["title-section"]}>Контакты</h1>
            <div className={style.content}>
              <section className={style["wrapper-list"]}>
                <div className={style["list-contacts"]}>
                  {contacts &&
                    contacts.map((item) => (
                      <div className={style["item-contact"]} itemProp="seller" itemScope itemType="http://schema.org/Person" key={item._id}>
                        <p className={style.title} itemProp="name">
                          {item.title}
                        </p>
                        <p className={style.description} itemProp="address">
                          {item.description}
                        </p>
                      </div>
                    ))}
                </div>
              </section>
              <section className={style.map}>
                <Map
                  className={style["yandex-map"]}
                  defaultState={{ center: ["48.015884", "37.80285"], zoom: 9, controls: ["zoomControl", "fullscreenControl"] }}
                  modules={["control.ZoomControl", "control.FullscreenControl"]}
                >
                  {contacts &&
                    contacts.map((item) => (
                      <Placemark
                        modules={["geoObject.addon.balloon"]}
                        key={item._id}
                        defaultGeometry={[item.latitude, item.longitude]}
                        properties={{
                          balloonContentBody: item.title,
                        }}
                      />
                    ))}
                </Map>
              </section>
            </div>
          </main>
        </Card>
      </YMaps>
    </>
  );
};

export default Contacts;
