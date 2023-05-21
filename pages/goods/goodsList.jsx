import Link from "next/link";
import Card from "@/components/card";
import Slider from "@/components/slider";
import AutoSlider from "@/components/autoSlider";
import style from "./goodsList.module.scss";

const GoodsList = ({ list = [] }) => {
  return (
    <ul className={style.goods__list}>
      {list.map((item) => (
        <Card key={item._id}>
          <li className={style.goods__item}>
            <Link className={style.goods__link} href={`/goods?goodsId=${item._id}`}>
              <AutoSlider title={item.title} imagesList={item.images.map((item) => ({ imageBase64: item.imageBase64 }))} />
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
