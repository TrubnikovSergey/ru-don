import newsService from "../services/news.service";
import style from "../styles/index.module.scss";

export const getServerSideProps = async () => {
  const data = await newsService.fetchAll();

  if (!data) {
    return { notFound: true };
  }

  return {
    props: { news: data },
  };
};

const Index = ({ news }) => {
  return (
    <main>
      <section className={style.slider}>
        <div className={style.slider__content}>слайдер</div>
      </section>
      <section className={style["section-news"]}>
        <div className={style["section-news-content"]}>
          <h1 className={style["section-news-title"]}>Новости</h1>
          <ul className={style["news-list"]}>
            {news &&
              news.map((item) => {
                let { atDate, title } = item;
                atDate = atDate && new Date(atDate).toLocaleDateString();

                return (
                  <li className={style["news-item"]} key={item._id}>
                    <div className={style["item-title"]}>
                      <h3>{title}</h3>
                      <div className={style["item-atDate"]}>
                        <h3>{atDate}</h3>
                      </div>
                    </div>
                    <pre className={style["item-description"]}>{item.description}</pre>
                  </li>
                );
              })}
          </ul>
        </div>
      </section>
    </main>
  );
};

// <div dangerouslySetInnerHTML={{ __html: item.news }} />

export default Index;
