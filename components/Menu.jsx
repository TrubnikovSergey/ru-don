import Link from "next/link";
import style from "../styles/menu.module.scss";

const Menu = () => {
  return (
    <ul className={style.menu__list}>
      <li className={style.menu__item}>
        <Link className={style.menu__link} href="/">
          <img className={style.menu__home} src="/images/home.svg" alt="на главную" />
        </Link>
      </li>
      <li className={style.menu__sep}>|</li>
      <li className={style.menu__item}>
        <Link className={style.menu__link} href="/goods?page=1">
          Товары и услуги
        </Link>
      </li>
      <li className={style.menu__item}>
        <Link className={style.menu__link} href="contacts">
          Контакты
        </Link>
      </li>
      <li className={style.menu__item}>
        <Link className={style.menu__link} href="delivery">
          Доставка
        </Link>
      </li>
      <li className={style.menu__item}>
        <Link className={style.menu__link} href="aboutUs">
          О нас
        </Link>
      </li>
    </ul>
  );
};

export default Menu;
