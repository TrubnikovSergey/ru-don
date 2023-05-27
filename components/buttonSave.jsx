import Loading from "./loading";
import style from "../styles/buttonSave.module.scss";

const ButtonSave = ({ isSaving }) => {
  return (
    <div className={style["wrapper-save"]}>
      {isSaving && <Loading />}
      <button className={style["button-save"]} type="submit">
        Сохранить
      </button>
    </div>
  );
};

export default ButtonSave;
