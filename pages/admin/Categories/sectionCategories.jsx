import categoriesService from "@/services/categories.service";
import style from "./sectionCategories.module.scss";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../../../components/loading";
import CategoryItem from "./categoryItem";

const SectionCategories = ({ title }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    categoriesService.fetchAll().then((data) => {
      setCategories(data);
      setIsLoading(false);
    });
  }, []);

  let renderSection = null;
  if (!isLoading) {
    renderSection = (
      <>
        <h2 className={style["section-title"]}>{title}</h2>
        <div className={style["section-content"]}>
          <ul className={style.list}>
            {categories.map((item) => (
              <div className={style["item-container"]} key={item._id}>
                <CategoryItem item={item} />
                <hr className={style.hr} />
              </div>
            ))}
          </ul>
        </div>
      </>
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
