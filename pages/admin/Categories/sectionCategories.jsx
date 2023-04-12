import style from "../styles/listItemsOfSection.module.scss";
import { useEffect } from "react";
import Loading from "../../../components/loading";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, fatchAllCategories, getCategories, getIsLoading, removeCategory } from "../../../store/categoriesSlice";
import LayoutSection from "../components/layoutSection";
import ListItemsOfSection from "../components/listItemsOfSection";
import BlockEditCategory from "./BlockEditCategory";

const SectionCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories());
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
  if (!isLoading) {
    renderSection = (
      <LayoutSection onCreateNewElement={handlerCreateCategory} titleButtonCreate="Создать категорию" titleSection={title}>
        <ListItemsOfSection listItems={categories} handlerDel={handlerDeleteCategory}>
          <BlockEditCategory />
        </ListItemsOfSection>
      </LayoutSection>
    );

    /**        {/* <ul className={style.list}>
          {categories.map((item) => (
            <div className={style["item-container"]} key={item._id}>
              <CategoryItem item={item} />
              <hr />
            </div>
          ))}
        </ul> */
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
