import style from "./goods.module.scss";

export const getStaticProps = async () => {
  let respons = await fetch(`${process.env.API_HOST}/goods`);
  const dataGoods = await respons.json();

  respons = await fetch(`${process.env.API_HOST}/categories`);
  const dataCategories = await respons.json();

  if (!dataGoods && !dataCategories) {
    return { notFound: true };
  }

  return {
    props: {
      goods: dataGoods,
      categories: dataCategories,
    },
  };
};

const GoodsList = ({ goods, categories }) => {
  return (
    <main className={style.main}>
      <section className={style.categories}>
        <h1 className={style.categories__title}>Категории</h1>
        <ul className={style.categories__list}>
          <li className={style.categories__item}>
            <a className={style.categories__link} href="#">
              категория 1
            </a>
          </li>
          <li className={style.categories__item}>
            <a className={style.categories__link} href="#">
              категория 2
            </a>
          </li>
          <li className={style.categories__item}>
            <a className={style.categories__link} href="#">
              категория 3
            </a>
          </li>
          <li className={style.categories__item}>
            <a className={style.categories__link} href="#">
              категория 4
            </a>
          </li>
          <li className={style.categories__item}>
            <a className={style.categories__link} href="#">
              категория 5
            </a>
          </li>
          <li className={style.categories__item}>
            <a className={style.categories__link} href="#">
              категория 6
            </a>
          </li>
          <li className={style.categories__item}>
            <a className={style.categories__link} href="#">
              категория 7
            </a>
          </li>
          <li className={style.categories__item}>
            <a className={style.categories__link} href="#">
              категория 8
            </a>
          </li>
          <li className={style.categories__item}>
            <a className={style.categories__link} href="#">
              категория 9
            </a>
          </li>
          <li className={style.categories__item}>
            <a className={style.categories__link} href="#">
              категория 10
            </a>
          </li>
        </ul>
      </section>
      <section className={style.goods}>
        <div className={style.search}>
          <input className={style.search__input} type="text" />
          <button className={style.search__button}>Поиск</button>
        </div>
        <section className={style.sort}>варианты сортировки</section>
        <ul className={style.goods__list}>
          <li className={style.goods__item}>
            <a className={style.goods__link} href="./goodsItem.html">
              <div className={style.goods__content}>
                <img
                  className={style.goods__img}
                  src="./noimg.png"
                  alt="изображение товара"
                />
                <h1 className={style.goods__title}>Товар 1</h1>
              </div>
            </a>
          </li>
          <li className={style.goods__item}>
            <a className={style.goods__link} href="./goodsItem.html">
              <div className={style.goods__content}>
                <img
                  className={style.goods__img}
                  src="./noimg.png"
                  alt="изображение товара"
                />
                <h1 className={style.goods__title}>Товар 2</h1>
              </div>
            </a>
          </li>
          <li className={style.goods__item}>
            <a className={style.goods__link} href="./goodsItem.html">
              <div className={style.goods__content}>
                <img
                  className={style.goods__img}
                  src="./noimg.png"
                  alt="изображение товара"
                />
                <h1 className={style.goods__title}>Товар 3</h1>
              </div>
            </a>
          </li>
          <li className={style.goods__item}>
            <a className={style.goods__link} href="./goodsItem.html">
              <div className={style.goods__content}>
                <img
                  className={style.goods__img}
                  src="./noimg.png"
                  alt="изображение товара"
                />
                <h1 className={style.goods__title}>Товар 4</h1>
              </div>
            </a>
          </li>
          <li className={style.goods__item}>
            <a className={style.goods__link} href="./goodsItem.html">
              <div className={style.goods__content}>
                <img
                  className={style.goods__img}
                  src="./noimg.png"
                  alt="изображение товара"
                />
                <h1 className={style.goods__title}>Товар 5</h1>
              </div>
            </a>
          </li>
          <li className={style.goods__item}>
            <a className={style.goods__link} href="./goodsItem.html">
              <div className={style.goods__content}>
                <img
                  className={style.goods__img}
                  src="./noimg.png"
                  alt="изображение товара"
                />
                <h1 className={style.goods__title}>Товар 6</h1>
              </div>
            </a>
          </li>
          <li className={style.goods__item}>
            <a className={style.goods__link} href="./goodsItem.html">
              <div className={style.goods__content}>
                <img
                  className={style.goods__img}
                  src="./noimg.png"
                  alt="изображение товара"
                />
                <h1 className={style.goods__title}>Товар 7</h1>
              </div>
            </a>
          </li>
          <li className={style.goods__item}>
            <a className={style.goods__link} href="./goodsItem.html">
              <div className={style.goods__content}>
                <img
                  className={style.goods__img}
                  src="./noimg.png"
                  alt="изображение товара"
                />
                <h1 className={style.goods__title}>Товар 8</h1>
              </div>
            </a>
          </li>
          <li className={style.goods__item}>
            <a className={style.goods__link} href="./goodsItem.html">
              <div className={style.goods__content}>
                <img
                  className={style.goods__img}
                  src="./noimg.png"
                  alt="изображение товара"
                />
                <h1 className={style.goods__title}>Товар 9</h1>
              </div>
            </a>
          </li>
          <li className={style.goods__item}>
            <a className={style.goods__link} href="./goodsItem.html">
              <div className={style.goods__content}>
                <img
                  className={style.goods__img}
                  src="./noimg.png"
                  alt="изображение товара"
                />
                <h1 className={style.goods__title}>Товар 10</h1>
              </div>
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default GoodsList;
