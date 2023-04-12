import { useSelector } from "react-redux";
import LayoutSection from "../components/layoutSection";
import style from "../styles/listItemsOfSection.module.scss";
import { getNews } from "@/store/newsSlice";

const SectionNews = () => {
  const news = useSelector(getNews());
  const title = "Новости";

  const handlerCreateNews = () => {};

  return (
    <LayoutSection onCreateNewElement={handlerCreateNews} titleButtonCreate="Создать новость" titleSection={title}>
      <ul className={style.list}>
        {news.map((item) => (
          <div className={style["item-container"]} key={item._id}>
            <GoodsItem item={item} />
            <hr />
          </div>
        ))}
      </ul>
    </LayoutSection>
  );
};

export default SectionNews;
