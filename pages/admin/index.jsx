import Link from "next/link";
import { useRouter } from "next/router";
import SectionCategories from "./Categories/sectionCategories";
import SectionGoods from "./Goods/sectionGoods";
import SectionNews from "./News/sectionNews";
import SectionDelivery from "./delivery/sectionDelivery";
import SectionAbout from "./about/sectionAbout";
import SectionContacts from "./Contacts/sectionContacts";
import Card from "@/components/card";
import SectionUsers from "./Users/sectionUsers";
import LayoutSection from "./components/layoutSection";
import { useSelector } from "react-redux";
import { isAuth } from "@/store/authSlice";
import { useEffect } from "react";
import configJSON from "../../config.json";
import style from "./admin.module.scss";
import NavLink from "@/components/navLink";

const Admin = () => {
  const route = useRouter();
  const isLogin = useSelector(isAuth());
  const { section } = route.query;
  let renderContent = null;

  useEffect(() => {
    if (!isLogin) {
      route.push(`${configJSON.HOST}/login`);
    }
  }, []);

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
    case "users":
      renderContent = <SectionUsers />;
      break;

    default:
      renderContent = <LayoutSection titleSection="Выберите раздел" />;
      break;
  }

  return (
    isLogin && (
      <div className={style.wrapper}>
        <div className={style.container}>
          <Card moreStyle={style["left-panel"]}>
            <h2 className={style["left-panel__title"]}>Разделы</h2>
            <div className={style["left-panel__item"]}>
              <NavLink href="/admin?section=categories">Категории товаров</NavLink>
            </div>
            <div className={style["left-panel__item"]}>
              <NavLink href="/admin?section=goods">Товары и услуги</NavLink>
            </div>
            <div className={style["left-panel__item"]}>
              <NavLink href="/admin?section=news">Новости</NavLink>
            </div>
            <div className={style["left-panel__item"]}>
              <NavLink href="/admin?section=contacts">Контакты</NavLink>
            </div>
            <div className={style["left-panel__item"]}>
              <NavLink href="/admin?section=delivery">Доставка</NavLink>
            </div>
            <div className={style["left-panel__item"]}>
              <NavLink href="/admin?section=about">О нас</NavLink>
            </div>
            <div className={style["left-panel__item"]}>
              <NavLink href="/admin?section=users">Администраторы</NavLink>
            </div>
          </Card>
          <Card moreStyle={style["right-panel"]}>{renderContent}</Card>
        </div>
      </div>
    )
  );
};

export default Admin;
