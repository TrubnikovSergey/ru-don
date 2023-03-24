import style from "../styles/index.module.scss";

export const getStaticProps = async () => {
  const respons = await fetch(`${process.env.API_HOST}/news`);
  const data = await respons.json();

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
                <li className={style.news__item} key={item.id}>
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
