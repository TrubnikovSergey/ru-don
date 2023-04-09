import Link from "next/link";
import style from "./admin.module.scss";
import { useRouter } from "next/router";
import SectionCategories from "./Categories/sectionCategories";
import SectionGoods from "./Goods/sectionGoods";

const Admin = () => {
  const route = useRouter();
  const { section } = route.query;
  let renderContent = null;

  if (section === "categories") {
    renderContent = <SectionCategories />;
  }
  if (section === "goods") {
    renderContent = <SectionGoods />;
  }

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style["left-panel"]}>
          <h2 className={style["left-panel__title"]}>Разделы</h2>
          <div className={style["left-panel__item"]}>
            <Link href="/admin?section=categories">Категории товаров</Link>
          </div>
          <div className={style["left-panel__item"]}>
            <Link href="/admin?section=goods">Товары</Link>
          </div>
          <div className={style["left-panel__item"]}>
            <Link href="/admin?section=users">Пользователи</Link>
          </div>
        </div>
        <div className={style["right-panel"]}>{renderContent}</div>
      </div>
    </div>
  );
};

export default Admin;
