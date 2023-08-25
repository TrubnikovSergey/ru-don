import { useState } from "react";
import PropTypes from "prop-types";
import Loading from "@/components/loading";
import { useDispatch, useSelector } from "react-redux";
import { doClearSuccess, getIsLoading, getSuccess, updateNews } from "@/store/newsSlice";
import useSuccess from "@/hooks/useSuccess";
import ButtonSave from "@/components/buttonSave";
import BlockUploadedImages from "../components/blockUploadedImages";
import { v4 as uuidv4 } from "uuid";
import style from "./blockEditNews.module.scss";
import { fileToBase64 } from "@/utils/files";

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
  const isLoading = useSelector(getIsLoading());

  useSuccess(successData, item?._id, doClearSuccess);

  let atDateNews = dateToFormaForValueInput(data?.atDate);

  const handlerCancel = () => {
    isEdit(false);
  };

  const handlerChange = async (e) => {
    let { name, value, files, checked } = e.target;

    if (name === "forSlider") {
      value = checked;
    } else if (name === "images") {
      const base64Images = [];

      for (let el of files) {
        if (el.size <= 300000) {
          const imageBase64 = await fileToBase64(el);
          const img = { name: el.name, size: el.size, type: el.type, imageBase64, _id: uuidv4() };
          base64Images.push(img);
        }
      }

      value = base64Images;
    }

    setData((prev) => {
      return { ...prev, [name]: name === "images" ? [...prev.images, ...value] : value };
    });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    dispatch(updateNews(data));
  };

  const handleDelete = (item) => {
    setData((prev) => ({
      ...prev,
      images: prev.images.filter((el) => !(el._id === item._id)),
    }));
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
          <div className={style["slider-news"]}>
            <p>новость для слайдера</p>
            <input type="checkbox" name="forSlider" checked={data.forSlider} onChange={handlerChange} />
          </div>
          <div>
            <p>Изображение для слайдера</p>
            <input className={style["btn-upload"]} type="file" name="images" accept=".jpg, .jpeg" onChange={handlerChange} multiple />
            <BlockUploadedImages imagesList={data.images} handleDelete={handleDelete} />
          </div>
        </div>
        <ButtonSave isSaving={isLoading} />
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
