import Card from "@/components/card";
import { MongoClient } from "mongodb";
import newsService from "../services/news.service";
import style from "../styles/index.module.scss";
import Slider from "@/components/slider";

export const getServerSideProps = async (context) => {
  const mongoURL = process.env.MONGO_URL;
  const dbName = process.env.DBName;
  const client = new MongoClient(`${mongoURL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const req = client.db(dbName);
  let dataNews = await req.collection("news").find({}).toArray();
  dataNews = dataNews.map((item) => ({ ...item, _id: String(item._id) }));

  client.close();

  if (!dataNews || dataNews.name === "Error") {
    return { notFound: true };
  }

  return {
    props: { news: dataNews },
  };
};

const Index = ({ news }) => {
  const nowDate = Date.now();

  const imagesForSlider = news.reduce((acc, item) => {
    const itemDate = new Date(item.atDate).getTime();
    if (itemDate <= nowDate && item.forSlider) {
      return [...acc, ...item.images];
    }
    return acc;
  }, []);
  const newsWithoutSlider = news.filter((item) => {
    const itemDate = new Date(item.atDate).getTime();
    return itemDate <= nowDate && !item.forSlider;
  });

  return (
    <Card>
      <main>
        {imagesForSlider.length > 0 && (
          <section className={style["slider-wrapper"]}>
            <div className={style.slider}>
              <div className={style["slider-content"]}>
                <Slider imagesList={imagesForSlider} autoslide={true} />
              </div>
            </div>
          </section>
        )}
        <section className={style["section-news"]}>
          <div className={style["section-news-content"]}>
            <h1 className={style["section-news-title"]}>Новости</h1>
            <ul className={style["news-list"]}>
              {newsWithoutSlider &&
                newsWithoutSlider.map((item) => {
                  let { atDate, title } = item;
                  atDate = atDate && new Date(atDate).toLocaleDateString();

                  return (
                    <li itemScope itemType="https://schema.org/NewsArticle" className={style["news-item"]} key={item._id}>
                      <div className={style["item-title"]}>
                        <p itemProp="name">{title}</p>
                        <div itemProp="datePublished" className={style["item-atDate"]}>
                          <p>{atDate}</p>
                        </div>
                      </div>
                      <div itemProp="description" className={style["item-description"]}>
                        {item.description}
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </section>
      </main>
    </Card>
  );
};

export default Index;
