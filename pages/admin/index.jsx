import style from "./admin.module.scss";

const Admin = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style["left-panel"]}>
          <h2 className={style["left-panel__title"]}>Разделы</h2>
        </div>
        <div className={style["right-panel"]}></div>
      </div>
    </div>
  );
};

export default Admin;
