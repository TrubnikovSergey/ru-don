import style from "../styles/listItemsOfSection.module.scss";
import { useEffect } from "react";
import Loading from "../../../components/loading";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, fatchAllCategories, getCategories, getErrors, getIsLoading, removeCategory } from "../../../store/categoriesSlice";
import LayoutSection from "../components/layoutSection";
import ListItemsOfSection from "../components/listItemsOfSection";
import BlockEditCategory from "./BlockEditCategory";

const SectionCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories());
  const errors = useSelector(getErrors());
  const isLoading = useSelector(getIsLoading());
  const title = "Категории товаров";
  const newCategory = {
    title: "Новая категория",
    parent: null,
    children: [],
  };

  useEffect(() => {
    dispatch(fatchAllCategories());
  }, []);

  const handlerDeleteCategory = (id) => {
    dispatch(removeCategory(id));
  };

  const handlerCreateCategory = () => {
    dispatch(createCategory(newCategory));
  };

  let renderSection = null;
  if (categories.length > 0) {
    renderSection = (
      <LayoutSection onCreateNewElement={handlerCreateCategory} titleButtonCreate="Создать категорию" titleSection={title}>
        <ListItemsOfSection listItems={categories} handlerDel={handlerDeleteCategory} errors={errors}>
          <BlockEditCategory />
        </ListItemsOfSection>
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

export default SectionCategories;
