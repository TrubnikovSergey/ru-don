import style from "./goods.module.scss";
import categoriesService from "../../services/categories.service";
import goodsService from "../../services/goods.service";

export const getStaticProps = async () => {
  const dataCategories = await categoriesService.fetchAll();
  const dataGoods = await goodsService.fetchAll();

  if (!dataCategories && !dataGoods) {
    return { notFound: true };
  }

  return {
    props: {
      categories: dataCategories,
      goods: dataGoods,
    },
  };
};

const GoodsList = ({ goods, categories }) => {
  return (
    <main className={style.main}>
      <section className={style.categories}>
        <div className={style.container}>
          <h1 className={style.categories__title}>Категории</h1>
          <ul className={style.categories__list}>
            {categories &&
              categories.map((item) => (
                <li className={style.categories__item}>
                  <a className={style.categories__link} href="#">
                    {item.title}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </section>
      <section className={style.goods}>
        <div className={style.search}>
          <input className={style.search__input} type="text" />
          <button className={style.search__button}>Поиск</button>
        </div>
        <section className={style.sort}>варианты сортировки</section>
        <ul className={style.goods__list}>
          {goods &&
            goods.map((item) => (
              <li className={style.goods__item}>
                <a className={style.goods__link} href="./goodsItem.html">
                  <div className={style.goods__content}>
                    <img className={style.goods__img} src="/images/noimg.png" alt="изображение товара" />
                    <h1 className={style.goods__title}>{item.title}</h1>
                  </div>
                </a>
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
};

export default GoodsList;
