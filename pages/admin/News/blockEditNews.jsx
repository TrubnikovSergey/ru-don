import { useState } from "react";
import style from "./blockEditNews.module.scss";
import PropTypes from "prop-types";
import Loading from "@/components/loading";
import { useDispatch } from "react-redux";
import { updateNews } from "@/store/newsSlice";

const BlockEditNews = ({ item, isEdit }) => {
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

    dispatch(updateNews(data));
  };

  return data ? (
    <div className={style["block-edit"]}>
      <form onSubmit={handlerSubmit}>
        <div className={style["block-edit-content"]}>
          <div>
            <p>Заголовок новости</p>
            <input className={style.input} type="text" name="title" required={true} onChange={handlerChange} value={data.title} />
          </div>
          <div>
            <p>Сдержание новости</p>
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

BlockEditNews.propTypes = {
  item: PropTypes.object,
  isEdit: PropTypes.func,
};

export default BlockEditNews;
