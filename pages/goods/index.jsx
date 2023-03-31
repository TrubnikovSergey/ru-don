import style from "./goods.module.scss";
import categoriesService from "../../services/categories.service";
import goodsService from "../../services/goods.service";
import Tree from "@/components/tree";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";

export const getStaticProps = async () => {
  const dataCategories = await categoriesService.fetchRootCategories();
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

function filterGoodsByCategory(goodsList, categoryId) {
  const newList = goodsList.filter((item) => item.categoryId === categoryId);

  return newList;
}

const GoodsList = ({ goods, categories }) => {
  const router = useRouter();
  const { categoryId, goodId } = router.query;
  const [goodsList, setGoodsList] = useState(goods);

  useEffect(() => {
    if (categoryId) {
      const newGoodsList = filterGoodsByCategory(goods, categoryId);
      setGoodsList(newGoodsList);
    } else {
      setGoodsList(goods);
    }
  }, [categoryId]);

  return (
    <main className={style.main}>
      <section className={style.categories}>
        <div className={style.container}>
          <h1 className={style.categories__title}>Категории</h1>
          <Link href="/goods"> Все товары</Link>
          <Tree treeData={categories} />
        </div>
      </section>
      <section className={style.goods}>
        <div className={style.search}>
          <input className={style.search__input} type="text" />
          <button className={style.search__button}>Поиск</button>
        </div>
        <section className={style.sort}>варианты сортировки</section>
        <ul className={style.goods__list}>
          {goodsList &&
            goodsList.map((item) => (
              <li className={style.goods__item} key={item._id}>
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
