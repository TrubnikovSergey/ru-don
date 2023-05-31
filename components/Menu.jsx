import Link from "next/link";
import NavLink from "./navLink";
import style from "../styles/menu.module.scss";

const Menu = () => {
  return (
    <ul className={style.menu__list}>
      <li className={style.menu__item}>
        <NavLink className={style.menu__link} href="/">
          <img className={style.menu__home} src="/images/home.svg" alt="на главную" />
        </NavLink>
      </li>
      <li className={style.menu__sep}>|</li>
      <li className={style.menu__item}>
        <NavLink className={style.menu__link} href="/goods?page=1">
          Товары и услуги
        </NavLink>
      </li>
      <li className={style.menu__item}>
        <NavLink className={style.menu__link} href="/contacts">
          Контакты
        </NavLink>
      </li>
      <li className={style.menu__item}>
        <NavLink className={style.menu__link} href="/delivery">
          Доставка
        </NavLink>
      </li>
      <li className={style.menu__item}>
        <NavLink className={style.menu__link} href="/aboutUs">
          О нас
        </NavLink>
      </li>
    </ul>
  );
};

export default Menu;
