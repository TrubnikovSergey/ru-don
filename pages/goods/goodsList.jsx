import Card from "@/components/card";
import Slider from "@/components/slider";
import AutoSlider from "@/components/autoSlider";
import style from "./goodsList.module.scss";
import NavLink from "@/components/navLink";

const GoodsList = ({ list = [] }) => {
  return (
    <ul className={style.goods__list}>
      {list.map((item) => (
        <Card key={item._id}>
          <li className={style.goods__item}>
            <NavLink className={style.goods__link} href={`/goods?goodsId=${item._id}`}>
              <AutoSlider title={item.title} imagesList={item.images.map((item) => ({ imageBase64: item.imageBase64 }))} />
            </NavLink>
            <div className={style["wrapper-price"]}>
              <p className={style.price}>{Number(item.price).toFixed(2)} р.</p>
            </div>
          </li>
        </Card>
      ))}
    </ul>
  );
};

export default GoodsList;
