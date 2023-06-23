import style from "../styles/section.module.scss";
import { useEffect } from "react";
import Loading from "../../../components/loading";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, doClearError, fatchAllCategories, getCategories, getErrors, getIsLoading, removeCategory } from "../../../store/categoriesSlice";
import LayoutSection from "../components/layoutSection";
import ListItemsOfSection from "../components/listItemsOfSection";
import BlockEditCategory from "./BlockEditCategory";
import { toast } from "react-toastify";

const SectionCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories());
  const isLoading = useSelector(getIsLoading());
  const title = "Категории товаров";
  const errors = useSelector(getErrors());
  const newCategory = {
    title: "Новая категория",
    parent: null,
    children: [],
  };

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

  useEffect(() => {
    dispatch(fatchAllCategories());
  }, []);

  const handlerDeleteCategory = (item) => {
    const { _id, title } = item;
    const isConfirm = confirm(`Удалить категорию "${title}" ?`);
    if (isConfirm) {
      dispatch(removeCategory(_id));
    }
  };

  const handlerCreateCategory = () => {
    dispatch(createCategory(newCategory));
  };

  let renderCategories = null;
  if (categories.length > 0) {
    renderCategories = (
      <LayoutSection onCreateNewElement={handlerCreateCategory} titleButtonCreate="Создать категорию" titleSection={title}>
        <ListItemsOfSection listItems={categories} handlerDel={handlerDeleteCategory} errors={errors}>
          <BlockEditCategory />
        </ListItemsOfSection>
      </LayoutSection>
    );
  } else {
    if (isLoading) {
      renderCategories = (
        <>
          <h2 className={style["section-title"]}>{title}</h2>
          <Loading />
        </>
      );
    } else {
      renderCategories = <LayoutSection onCreateNewElement={handlerCreateCategory} titleButtonCreate="Создать категорию" titleSection={title}></LayoutSection>;
    }
  }

  return renderCategories;
};

export default SectionCategories;
