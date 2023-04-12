import { useState } from "react";
import style from "./BlockEditGood.module.scss";
import PropTypes from "prop-types";
import { useEffect } from "react";
import categoriesService from "@/services/categories.service";
import Loading from "@/components/loading";
import { useDispatch } from "react-redux";
import { updateGood } from "@/store/goodsSlice";
// import MultiSelectField from "@/components/multiSelect";

const BlockEditGood = ({ item, isEdit }) => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    categoriesService.fetchAllWithConcreteFields(["title", "_id"]).then((response) => {
      let newData = { ...item };

      newData.listCategories = response;

      setData(newData);
    });
  }, []);

  const handlerCancel = () => {
    isEdit(false);
  };

  const handlerChange = ({ target }) => {
    setData((prev) => {
      let { name, value } = target;

      if (name === "categoryId") {
        value = value === "" ? null : value;
      }

      return { ...prev, [name]: value };
    });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    const newData = { ...data };
    delete newData.listCategories;

    dispatch(updateGood(newData));
  };

  return data ? (
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

BlockEditGood.propTypes = {
  item: PropTypes.object,
  isEdit: PropTypes.func,
};

export default BlockEditGood;
