import style from "./contacts.module.scss";

const Contacts = () => {
  return (
    <main className={style.main}>
      <section className={style.map}>карта</section>
      <section className={style.info}>
        <div className={style.shops}>
          <h1 className={style.shops__title}>Магазины</h1>
          <div className={style.shops__description}>
            <ul className={style.shops__list}>
              <li className={style.shops__item}>
                Магазин 1, адресс, время работы, телефоны
              </li>
              <li className={style.shops__item}>
                Магазин 1, адресс, время работы, телефоны
              </li>
            </ul>
          </div>
        </div>

        <div className={style.stocks}>
          <h1 className={style.stocks__title}>Склады</h1>
          <div className={style.stocks__description}>
            <ul className={style.stocks__list}>
              <li className={style.stocks__item}>
                Склад 1, адресс, время работы, телефоны
              </li>
              <li className={style.stocks__item}>
                Склад 1, адресс, время работы, телефоны
              </li>
            </ul>
          </div>
        </div>

        <div className={style.points}>
          <h1 className={style.points__title}>Точки выдачи</h1>
          <div className={style.points__description}>
            <ul className={style.points__list}>
              <li className={style.points__item}>
                Точка 1, адресс, время работы, телефоны
              </li>
              <li className={style.points__item}>
                Точка 1, адресс, время работы, телефоны
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contacts;
