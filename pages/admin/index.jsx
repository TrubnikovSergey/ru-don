import Link from "next/link";
import style from "./admin.module.scss";
import { useRouter } from "next/router";
import SectionCategories from "./Categories/sectionCategories";
import SectionGoods from "./Goods/sectionGoods";
import SectionNews from "./News/sectionNews";
import SectionDelivery from "./delivery/sectionDelivery";
import SectionAbout from "./about/sectionAbout";
import SectionContacts from "./Contacts/sectionContacts";
import Card from "@/components/card";

const Admin = () => {
  const route = useRouter();
  const { section } = route.query;
  let renderContent = null;

  switch (section) {
    case "categories":
      renderContent = <SectionCategories />;
      break;
    case "goods":
      renderContent = <SectionGoods />;
      break;
    case "news":
      renderContent = <SectionNews />;
      break;
    case "delivery":
      renderContent = <SectionDelivery />;
      break;
    case "about":
      renderContent = <SectionAbout />;
      break;
    case "contacts":
      renderContent = <SectionContacts />;
      break;

    default:
      break;
  }

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <Card moreStyle={style["left-panel"]}>
          <h2 className={style["left-panel__title"]}>Разделы</h2>
          <div className={style["left-panel__item"]}>
            <Link href="/admin?section=categories">Категории товаров</Link>
          </div>
          <div className={style["left-panel__item"]}>
            <Link href="/admin?section=goods">Товары</Link>
          </div>
          <div className={style["left-panel__item"]}>
            <Link href="/admin?section=news">Новости</Link>
          </div>
          <div className={style["left-panel__item"]}>
            <Link href="/admin?section=delivery">Доставка</Link>
          </div>
          <div className={style["left-panel__item"]}>
            <Link href="/admin?section=about">О нас</Link>
          </div>
          <div className={style["left-panel__item"]}>
            <Link href="/admin?section=contacts">Контакты</Link>
          </div>
          <div className={style["left-panel__item"]}>
            <Link href="/admin?section=users">Пользователи</Link>
          </div>
        </Card>
        <Card moreStyle={style["right-panel"]}>{renderContent}</Card>
      </div>
    </div>
  );
};

export default Admin;
