import style from "./sectionCategories.module.scss";
import { useEffect } from "react";
import Loading from "../../../components/loading";
import CategoryItem from "./categoryItem";
import { useDispatch, useSelector } from "react-redux";
import { fatchAllCategories, getCategories, getIsLoading } from "../../../store/categoriesSlice";

const SectionCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories());
  const isLoading = useSelector(getIsLoading());
  const title = "Категории товаров";

  useEffect(() => {
    dispatch(fatchAllCategories());
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
