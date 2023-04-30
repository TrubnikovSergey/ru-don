// import Card from "@/components/card";
// import { MongoClient } from "mongodb";
// import newsService from "../services/news.service";
// import style from "../styles/index.module.scss";

// export const getServerSideProps = async () => {
//   const mongoURL = process.env.MONGO_URL;
//   const client = new MongoClient(`${mongoURL}`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   const req = client.db("energy");
//   let dataNews = await req.db.collection("news").find({}).toArray();

//   client.close();

//   if (!dataNews || dataNews.name === "Error") {
//     return { notFound: true };
//   }

//   return {
//     props: { news: data },
//   };
// };

// const Index = ({ news }) => {
//   return (
//     <Card>
//       <main>
//         <section className={style["slider-wrapper"]}>
//           <div className={style.slider}>
//             <div className={style.slider__content}>слайдер</div>
//           </div>
//         </section>
//         <section className={style["section-news"]}>
//           <div className={style["section-news-content"]}>
//             <h1 className={style["section-news-title"]}>Новости</h1>
//             <ul className={style["news-list"]}>
//               {news &&
//                 news.map((item) => {
//                   let { atDate, title } = item;
//                   atDate = atDate && new Date(atDate).toLocaleDateString();

//                   return (
//                     <li className={style["news-item"]} key={item._id}>
//                       <div className={style["item-title"]}>
//                         <h3>{title}</h3>
//                         <div className={style["item-atDate"]}>
//                           <h3>{atDate}</h3>
//                         </div>
//                       </div>
//                       <pre className={style["item-description"]}>{item.description}</pre>
//                     </li>
//                   );
//                 })}
//             </ul>
//           </div>
//         </section>
//       </main>
//     </Card>
//   );
// };

const Index = () => {
  return <h1>TEST</h1>;
};

export default Index;
