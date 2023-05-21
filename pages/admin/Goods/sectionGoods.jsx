import { useEffect, useState } from "react";
import Loading from "../../../components/loading";
import { useDispatch, useSelector } from "react-redux";
import LayoutSection from "../components/layoutSection";
import { createGoods, fatchAllGoods, getErrors, getGoods, getIsLoading, removeGoods } from "../../../store/goodsSlice";
import ListItemsOfSection from "../components/listItemsOfSection";
import BlockEditGoods from "./BlockEditGoods";
import Search from "@/components/search";
import { filterGoodsByCategoryId, filterGoodsBySearchValue } from "@/utils/filterGoods";
import CategorySelection from "@/components/categorySelection";
import styleSectionGoods from "./sectionGoods.module.scss";
import style from "../styles/section.module.scss";

const SectionGoods = () => {
  const dispatch = useDispatch();
  let goods = useSelector(getGoods());
  const errors = useSelector(getErrors());
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const isLoading = useSelector(getIsLoading());
  const title = "Товары";
  const newGoods = {
    title: "Новый товар",
    description: "",
    images: [],
    categoryId: null,
    price: 0,
    discountProcent: 0,
    discountCount: 0,
  };

  useEffect(() => {
    dispatch(fatchAllGoods());
  }, []);

  if (searchValue) {
    goods = filterGoodsBySearchValue(goods, searchValue);
  }

  if (selectedCategory) {
    goods = filterGoodsByCategoryId(goods, null, selectedCategory);
  }

  const handlerDeleteGoods = (id) => {
    dispatch(removeGoods(id));
  };

  const handleSearch = (data) => {
    setSearchValue(data);
  };

  const handlerCreateGoods = () => {
    dispatch(createGoods(newGoods));
  };

  const handleSelectedCategory = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  let renderGoods = null;
  if (goods.length > 0) {
    renderGoods = (
      <LayoutSection onCreateNewElement={handlerCreateGoods} titleButtonCreate="Создать товар" titleSection={title}>
        <div className={styleSectionGoods["tools-bar"]}>
          <Search onSearch={handleSearch} />
          <CategorySelection onChange={handleSelectedCategory} />
        </div>
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
      renderGoods = (
        <LayoutSection onCreateNewElement={handlerCreateGoods} titleButtonCreate="Создать товар" titleSection={title}>
          <Search onSearch={handleSearch} />
          <div className={styleSectionGoods["tools-bar"]}>
            <CategorySelection onChange={handleSelectedCategory} />
          </div>
        </LayoutSection>
      );
    }
  }

  return renderGoods;
};

export default SectionGoods;
