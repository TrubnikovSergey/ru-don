import Link from "next/link";
import style from "./goodsList.module.scss";
import Card from "@/components/card";
import Slider from "@/components/slider";
import AutoSlider from "@/components/autoSlider";

const GoodsList = ({ goodsList = [] }) => {
  return (
    <ul className={style.goods__list}>
      {goodsList.map((item) => (
        <Card key={item._id}>
          <li className={style.goods__item}>
            <AutoSlider imagesList={item.images.map((item) => ({ imageBase64: item.imageBase64 }))} />
            <Link className={style.goods__link} href={`/goods?goodsId=${item._id}`}>
              <p className={style.goods__title}>{item.title}</p>
            </Link>
            <div className={style["wrapper-price"]}>
              <p className={style.price}>{item.price} р.</p>
            </div>
          </li>
        </Card>
      ))}
    </ul>
  );
};

export default GoodsList;
