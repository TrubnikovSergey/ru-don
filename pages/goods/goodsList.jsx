import Link from "next/link";
import style from "./goodsList.module.scss";

const GoodsList = ({ goodsList = [] }) => {
  return (
    <ul className={style.goods__list}>
      {goodsList.map((item) => (
        <li className={style.goods__item} key={item._id}>
          <Link className={style.goods__link} href={`/goods?goodId=${item._id}`}>
            <div className={style.goods__content}>
              <img className={style.goods__img} src="/images/noimg.png" alt="изображение товара" />
              <h1 className={style.goods__title}>{item.title}</h1>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default GoodsList;
