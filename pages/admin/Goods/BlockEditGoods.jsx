import { useState } from "react";
import style from "./BlockEditGoods.module.scss";
import PropTypes from "prop-types";
import { useEffect } from "react";
import categoriesService from "@/services/categories.service";
import Loading from "@/components/loading";
import { useDispatch } from "react-redux";
import { updateGoods } from "@/store/goodsSlice";
import BlockUploadedImages from "../components/blockUploadedImages";
import httpService from "@/services/http.service";
import configJSON from "../../../config.json";

const HOST = configJSON.HOST;

const BlockEditGoods = ({ item, isEdit }) => {
  const [data, setData] = useState({ ...item, listCategories: [] });
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const allPromise = [categoriesService.fetchAllWithConcreteFields(["_id", "title"])];
    if (item?.images?.length > 0) {
      for (let el of item.images) {
        allPromise.push(
          httpService.get(`http://localhost:3000/upload/${el.newFilename}`, {
            responseType: "arraybuffer",
            headers: {
              "Content-Type": "application/json",
            },
          })
        );
      }
    }

    Promise.allSettled(allPromise)
      .then((result) => {
        const arrayImages = [];
        let idxImage = 0;

        for (let i = 0; i < result.length; i++) {
          const el = result[i];
          if (el.status === "rejected") continue;

          if (i === 0) {
            setData((prev) => ({ ...prev, listCategories: el.value }));
          } else {
            const fileImage = new File([new Blob([el.value.data])], item.images[idxImage].originalFilename, { type: "image/png" });
            arrayImages.push({ image: fileImage, url: URL.createObjectURL(fileImage) });
            idxImage += 1;
          }
        }
        setIsLoading(false);
        setData((prev) => ({ ...prev, images: arrayImages }));
      })
      .catch((err) => console.log("------ Error \n", err));
  }, []);

  const handlerCancel = () => {
    isEdit(false);
  };

  const handlerChange = (e) => {
    setData((prev) => {
      let { name, value, files } = e.target;

      if (name === "categoryId") {
        value = value === "" ? null : value;
      }
      if (name === "images") {
        const arrayImage = [];
        const newFiles = [...data.images];

        for (let i = 0; i < files.length; i++) {
          if (files[i].size <= 1000000) {
            const image = { image: files[i], url: URL.createObjectURL(files[i]) };

            newFiles.push(image);
          }
        }

        value = newFiles;
      }
      return { ...prev, [name]: value };
    });
  };

  const handleDelete = (item) => {
    setData((prev) => ({
      ...prev,
      images: prev.images.filter((el) => !(el.image.lastModified === item.image.lastModified && el.image.name === item.image.name && el.image.size === item.image.size)),
    }));
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    const sendData = new FormData();
    const newData = { ...data };
    delete newData.listCategories;

    Object.keys(newData).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < newData[key].length; i++) {
          sendData.append(`${key}[]`, newData[key][i].image);
        }
      } else {
        sendData.append(`${key}`, newData[key]);
      }
    });

    dispatch(updateGoods(sendData));
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
            {data.images.length > 0 ? <BlockUploadedImages list={data.images} handleDelete={handleDelete} /> : null}
            {/* {data.images.length > 0 && <img src={data.images[0].url} alt="изображение товара" />} */}
            <input className={style["btn-upload"]} type="file" name="images" accept=".jpg, .jpeg" onChange={handlerChange} multiple />
            <p>(размер изображения не более 1 мб)</p>
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
