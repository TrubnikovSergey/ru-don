import { useEffect, useState } from "react";
import Loading from "../../../components/loading";
import { useDispatch, useSelector } from "react-redux";
import LayoutSection from "../components/layoutSection";
import { createGoods, doClearError, fatchAllGoods, getErrors, getGoods, getIsLoading, removeGoods } from "../../../store/goodsSlice";
import ListItemsOfSection from "../components/listItemsOfSection";
import BlockEditGoods from "./BlockEditGoods";
import Search from "@/components/search";
import { filterGoodsByCategoryId, filterGoodsBySearchValue } from "@/utils/filterGoods";
import CategorySelection from "@/components/categorySelection";
import styleSectionGoods from "./sectionGoods.module.scss";
import style from "../styles/section.module.scss";
import Pagination from "@/components/pagination";
import { getSearchValue, setSearchValue } from "@/store/searchSlice";
import { toast } from "react-toastify";

const SectionGoods = () => {
  const dispatch = useDispatch();
  let goods = useSelector(getGoods());
  const errors = useSelector(getErrors());
  const searchValue = useSelector(getSearchValue());
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
    dispatch(fatchAllGoods({ numberPage: 1, searchValue, categoryId: selectedCategory }));
  }, [searchValue, selectedCategory]);

  useEffect(() => {
    if (errors.length > 0) {
      for (let i = 0; i < errors.length; i++) {
        toast.error(errors[i].message);
      }
      for (let i = 0; i < errors.length; i++) {
        dispatch(doClearError(errors[i]._id));
      }
    }
  }, [errors]);

  if (selectedCategory) {
    goods = filterGoodsByCategoryId(goods, selectedCategory);
  }

  if (searchValue) {
    goods = filterGoodsBySearchValue(goods, searchValue);
  }

  const handlerDeleteGoods = (id) => {
    dispatch(removeGoods(id));
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
          <Search />
          <CategorySelection onChange={handleSelectedCategory} value={selectedCategory} />
        </div>
        <Pagination searchValue={searchValue} categoryId={selectedCategory}>
          <ListItemsOfSection listItems={goods} handlerDel={handlerDeleteGoods} errors={errors} isLoading={isLoading}>
            <BlockEditGoods />
          </ListItemsOfSection>
        </Pagination>
      </LayoutSection>
    );
  } else {
    renderGoods = (
      <LayoutSection onCreateNewElement={handlerCreateGoods} titleButtonCreate="Создать товар" titleSection={title}>
        <div className={styleSectionGoods["tools-bar"]}>
          <Search />
          <CategorySelection onChange={handleSelectedCategory} value={selectedCategory} />
        </div>
      </LayoutSection>
    );
  }

  return renderGoods;
};

export default SectionGoods;
