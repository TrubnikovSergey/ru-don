import { useState } from "react";
import style from "./blockEditContacts.module.scss";
import PropTypes from "prop-types";
import Loading from "@/components/loading";
import { useDispatch } from "react-redux";
import { updateContacts } from "@/store/contactsSlice";

const BlockEditContacts = ({ item, isEdit }) => {
  const [data, setData] = useState(item);
  const dispatch = useDispatch();

  const handlerCancel = () => {
    isEdit(false);
  };

  const handlerChange = ({ target }) => {
    setData((prev) => {
      let { name, value } = target;
      return { ...prev, [name]: value };
    });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    dispatch(updateContacts(data));
  };

  return data ? (
    <div className={style["block-edit"]}>
      <form onSubmit={handlerSubmit}>
        <div className={style["block-edit-content"]}>
          <div>
            <p>Название контакта</p>
            <input className={style.input} type="text" name="title" required={true} onChange={handlerChange} value={data.title} />
          </div>
          <div>
            <p>Описание котакта</p>
            <textarea className={style.textarea} rows="10" name="description" onChange={handlerChange} value={data.description}></textarea>
          </div>
        </div>
        <div className={style["buttons-save-cancel"]}>
          <button className={style["button"]} type="submit">
            Сохранить
          </button>
          <button className={style["button"]} type="button" onClick={handlerCancel}>
            Отмена
          </button>
        </div>
      </form>
    </div>
  ) : (
    <Loading />
  );
};

BlockEditContacts.propTypes = {
  item: PropTypes.object,
  isEdit: PropTypes.func,
};

export default BlockEditContacts;
