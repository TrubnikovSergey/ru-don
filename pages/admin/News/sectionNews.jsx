import { useDispatch, useSelector } from "react-redux";
import LayoutSection from "../components/layoutSection";
import { createNews, fetchAllNews, getIsLoading, getNews } from "@/store/newsSlice";
import { getErrors } from "@/store/newsSlice";
import ListItemsOfSection from "../components/listItemsOfSection";
import BlockEditNews from "./blockEditNews";
import { useEffect } from "react";
import Loading from "@/components/loading";
import style from "./sectionNews.module.scss";

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
  const handlerDeleteNews = () => {};

  return news.length > 0 ? (
    <LayoutSection onCreateNewElement={handlerCreateNews} titleButtonCreate="Создать новость" titleSection={title}>
      <ListItemsOfSection listItems={news} handlerDel={handlerDeleteNews} errors={errors}>
        <BlockEditNews />
      </ListItemsOfSection>
    </LayoutSection>
  ) : (
    <>
      <h2 className={style["section-title"]}>{title}</h2>
      <Loading />
    </>
  );
};

export default SectionNews;
