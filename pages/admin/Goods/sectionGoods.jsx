import style from "../styles/section.module.scss";
import { useEffect } from "react";
import Loading from "../../../components/loading";
import { useDispatch, useSelector } from "react-redux";
import LayoutSection from "../components/layoutSection";
import { createGoods, fatchAllGoods, getErrors, getGoods, getIsLoading, removeGoods } from "../../../store/goodsSlice";
import ListItemsOfSection from "../components/listItemsOfSection";
import BlockEditGoods from "./BlockEditGoods";

const SectionGoods = () => {
  const dispatch = useDispatch();
  const goods = useSelector(getGoods());
  const errors = useSelector(getErrors());
  const isLoading = useSelector(getIsLoading());
  const title = "Товары";
  const newGoods = {
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

  const handlerDeleteGoods = (id) => {
    dispatch(removeGoods(id));
  };

  const handlerCreateGoods = () => {
    dispatch(createGoods(newGoods));
  };

  let renderGoods = null;
  if (goods.length > 0) {
    renderGoods = (
      <LayoutSection onCreateNewElement={handlerCreateGoods} titleButtonCreate="Создать товар" titleSection={title}>
        <ListItemsOfSection listItems={goods} handlerDel={handlerDeleteGoods} errors={errors}>
          <BlockEditGoods />
        </ListItemsOfSection>
      </LayoutSection>
    );
  } else {
    if (isLoading) {
      renderGoods = (
        <>
          <h2 className={style["section-title"]}>{title}</h2>
          <Loading />
        </>
      );
    } else {
      renderGoods = <LayoutSection onCreateNewElement={handlerCreateGoods} titleButtonCreate="Создать товар" titleSection={title}></LayoutSection>;
    }
  }

  return renderGoods;
};

export default SectionGoods;
