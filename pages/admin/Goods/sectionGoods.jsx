import style from "./sectionGoods.module.scss";
import { useEffect } from "react";
import Loading from "../../../components/loading";
import { useDispatch, useSelector } from "react-redux";
import LayoutSection from "../Section/layoutSection";
import { createGood, fatchAllGoods, getGoods, getIsLoading } from "../../../store/goodsSlice";
import GoodsItem from "./goodsItem";

const SectionGoods = () => {
  const dispatch = useDispatch();
  const goods = useSelector(getGoods());
  const isLoading = useSelector(getIsLoading());
  const title = "Товары";
  const newGood = {
    title: "Новый товар",
    description: "",
    categoryId: null,
    price: 1000,
    discountProcent: 0,
    discountCount: 0,
  };

  useEffect(() => {
    dispatch(fatchAllGoods());
  }, []);

  const handlerCreateGoods = () => {
    dispatch(createGood(newGood));
  };

  let renderSection = null;
  if (!isLoading) {
    renderSection = (
      <LayoutSection onCreateNewElement={handlerCreateGoods} titleButtonCreate="Создать товар" titleSection={title}>
        <ul className={style.list}>
          {goods.map((item) => (
            <div className={style["item-container"]} key={item._id}>
              <GoodsItem item={item} />
              <hr />
            </div>
          ))}
        </ul>
      </LayoutSection>
    );
  } else {
    renderSection = (
      <>
        <h2 className={style["section-title"]}>{title}</h2>
        <Loading />
      </>
    );
  }

  return renderSection;
};

export default SectionGoods;
