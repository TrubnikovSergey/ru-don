import { useDispatch, useSelector } from "react-redux";
import LayoutSection from "../components/layoutSection";
import { createNews, fetchAllNews, getIsLoading, getNews, removeNews } from "@/store/newsSlice";
import { getErrors } from "@/store/newsSlice";
import ListItemsOfSection from "../components/listItemsOfSection";
import BlockEditNews from "./blockEditNews";
import { useEffect } from "react";
import Loading from "@/components/loading";
import style from "../styles/section.module.scss";

const SectionNews = () => {
  const dispatch = useDispatch();
  const news = useSelector(getNews());
  const errors = useSelector(getErrors());
  const isLoading = useSelector(getIsLoading());
  const title = "Новости";
  const newNews = {
    title: "Новая новость",
    description: "Содержимое новости",
  };

  useEffect(() => {
    dispatch(fetchAllNews());
  }, []);

  const handlerCreateNews = () => {
    dispatch(createNews(newNews));
  };
  const handlerDeleteNews = (id) => {
    dispatch(removeNews(id));
  };

  let renderNews = null;
  if (news.length > 0) {
    renderNews = (
      <LayoutSection onCreateNewElement={handlerCreateNews} titleButtonCreate="Создать новость" titleSection={title}>
        <ListItemsOfSection listItems={news} handlerDel={handlerDeleteNews} errors={errors}>
          <BlockEditNews />
        </ListItemsOfSection>
      </LayoutSection>
    );
  } else {
    if (isLoading) {
      renderNews = (
        <>
          <h2 className={style["section-title"]}>{title}</h2>
          <Loading />
        </>
      );
    } else {
      renderNews = <LayoutSection onCreateNewElement={handlerCreateNews} titleButtonCreate="Создать новость" titleSection={title}></LayoutSection>;
    }
  }

  return renderNews;
};

export default SectionNews;
