import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import style from "./BlockEditGoods.module.scss";
import PropTypes, { number } from "prop-types";
import { useEffect } from "react";
import categoriesService from "@/services/categories.service";
import Loading from "@/components/loading";
import { useDispatch, useSelector } from "react-redux";
import { doClearSuccess, getSuccess, updateGoods } from "@/store/goodsSlice";
import BlockUploadedImages from "../components/blockUploadedImages";
import httpService from "@/services/http.service";
import configJSON from "../../../config.json";
import useSuccess from "@/hooks/useSuccess";

const HOST = configJSON.HOST;

const BlockEditGoods = ({ item, isEdit }) => {
  const [data, setData] = useState({ ...item, listCategories: [] });
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const successData = useSelector(getSuccess());

  useSuccess(successData, item?._id, doClearSuccess);

  useEffect(() => {
    categoriesService.fetchAllWithConcreteFields(["_id", "title"]).then((resp) => {
      setData((prev) => ({ ...prev, listCategories: resp.data }));
      setIsLoading(false);
    });
  }, []);

  const handlerCancel = () => {
    isEdit(false);
  };

  function fileToBase64(file) {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function () {
        res(reader.result);
      };

      reader.onerror = function () {
        rej(reader.error);
      };
    });
  }

  const handlerChange = async (e) => {
    let { name, value, files } = e.target;

    if (name === "categoryId") {
      value = value === "" ? null : value;
    }
    if (name === "discountProcent" || name === "discountCount" || name === "price") {
      value = Number(value);
    }
    if (name === "images") {
      const base64Images = [];

      for (let el of files) {
        if (el.size <= 200000) {
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

  const handleDelete = (item) => {
    setData((prev) => ({
      ...prev,
      images: prev.images.filter((el) => !(el._id === item._id)),
    }));
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    const sendData = new FormData();
    const newData = { ...data };
    delete newData.listCategories;
    console.log("++++++++newData", newData);
    dispatch(updateGoods(newData));
  };

  return !isLoading ? (
    <div className={style["block-edit"]}>
      <form onSubmit={handlerSubmit}>
        <div className={style["block-edit-content"]}>
          <div>
            <p>Наименование</p>
            <input className={style.input} type="text" name="title" required={true} onChange={handlerChange} value={data.title} />
          </div>
          <div>
            <p>Описание товара</p>
            <textarea className={style.textarea} rows="10" name="description" onChange={handlerChange} value={data.description}></textarea>
          </div>
          <div>
            <p>Категория товара</p>
            <select className={style.input} name="categoryId" onChange={handlerChange} defaultValue={data.categoryId ? data.categoryId : ""}>
              <option value=""></option>
              {data.listCategories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p>Цена</p>
            <input className={style["input-number"]} type="number" name="price" required={true} onChange={handlerChange} value={data.price} />
          </div>
          <div>
            <p>Процент скидки</p>
            <input className={style["input-number"]} type="number" name="discountProcent" required={true} onChange={handlerChange} value={data.discountProcent} />
          </div>
          <div>
            <p>Сумма скидки</p>
            <input className={style["input-number"]} type="number" name="discountCount" required={true} onChange={handlerChange} value={data.discountCount} />
          </div>
          <div>
            {data.images.length > 0 ? <BlockUploadedImages imagesList={data.images} handleDelete={handleDelete} /> : null}

            <input className={style["btn-upload"]} type="file" name="images" accept=".jpg, .jpeg" onChange={handlerChange} multiple />
            <p>(размер изображения не более 200 кб)</p>
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

BlockEditGoods.propTypes = {
  item: PropTypes.object,
  isEdit: PropTypes.func,
};

export default BlockEditGoods;
