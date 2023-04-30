import Link from "next/link";
import style from "./goodsList.module.scss";
import Card from "@/components/card";
import Slider from "@/components/slider";
import AutoSlider from "@/components/autoSlider";

const GoodsList = ({ goodsList = [] }) => {
  const getFerstImageGoods = (images) => {
    if (images.length > 0) {
      return `/upload/${images[0].newFilename}`;
    }

    return "/images/noimg.png";
  };

  return (
    <ul className={style.goods__list}>
      {goodsList.map((item) => (
        <Card key={item._id}>
          <li className={style.goods__item}>
            <AutoSlider imageNameList={item.images.map((item) => item.newFilename)} />
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
