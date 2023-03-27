import newsService from "../services/news.service";
import style from "../styles/index.module.scss";

export const getStaticProps = async () => {
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
      <section className={style.news}>
        <div className={style.news__content}>
          <h1 className={style.news__title}>Новости</h1>
          <ul className={style.news__list}>
            {news &&
              news.map((item) => (
                <li className={style.news__item} key={item._id}>
                  <div dangerouslySetInnerHTML={{ __html: item.news }} />
                </li>
              ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Index;
