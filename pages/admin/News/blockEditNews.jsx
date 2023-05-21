import { useState } from "react";
import style from "./blockEditNews.module.scss";
import PropTypes from "prop-types";
import Loading from "@/components/loading";
import { useDispatch, useSelector } from "react-redux";
import { doClearSuccess, getSuccess, updateNews } from "@/store/newsSlice";
import useSuccess from "@/hooks/useSuccess";

const dateToFormaForValueInput = (value) => {
  if (value) {
    const date = new Date(value);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const dayStr = day <= 9 ? `0${String(day)}` : String(day);
    const monthStr = month <= 9 ? `0${String(month)}` : String(month);

    return `${year}-${monthStr}-${dayStr}`;
  }

  return "";
};

const BlockEditNews = ({ item, isEdit }) => {
  const [data, setData] = useState(item);
  const dispatch = useDispatch();
  const successData = useSelector(getSuccess());

  useSuccess(successData, item?._id, doClearSuccess);

  let atDateNews = dateToFormaForValueInput(data?.atDate);

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
          <div>
            <p>Дата публикации</p>
            <input type="date" name="atDate" value={atDateNews} onChange={handlerChange} />
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
