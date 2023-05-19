import { useState } from "react";
import style from "./BlockEditCategory.module.scss";
import PropTypes from "prop-types";
import { useEffect } from "react";
import categoriesService from "@/services/categories.service";
import Loading from "@/components/loading";
import { useDispatch, useSelector } from "react-redux";
import { doClearSuccess, getSuccess, updateCategory } from "@/store/categoriesSlice";
import { getResponsError } from "@/utils/errors";
import { toast } from "react-toastify";
import useSuccess from "@/hooks/useSuccess";

const createState = (setData, item) => {
  categoriesService.fetchAllWithConcreteFields(["title", "_id"]).then((response) => {
    if (!response.error) {
      let newData = {
        title: item.title,
        _id: item._id,
        parent: item.parent,
      };

      if (item.children.length > 0) {
        newData.children = response.data.filter((el) => item.children.includes(el._id));
      } else {
        newData.children = [];
      }

      newData.listCategories = response.data;

      setData(newData);
    }
  });
};

const BlockEditCategory = ({ item, isEdit }) => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const successData = useSelector(getSuccess());
  useSuccess(successData, item._id, doClearSuccess);

  useEffect(() => {
    createState(setData, item);
  }, []);

  const handlerCancel = () => {
    isEdit(false);
  };

  const handlerChange = ({ target }) => {
    setData((prev) => {
      let { name, value } = target;

      if (name === "parent") {
        value = value === "" ? null : value;
      }

      return { ...prev, [name]: value };
    });
  };
  const handlerFocus = () => {
    createState(setData, item);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    const newData = { ...data };

    delete newData.listCategories;
    newData.children = data.children.map((item) => item._id);
    dispatch(updateCategory(newData));
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
            <p>Родительская категория</p>
            <select className={style.input} name="parent" onChange={handlerChange} onFocus={handlerFocus} defaultValue={data.parent ? data.parent : ""}>
              <option value=""></option>
              {data.listCategories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <div className={style.subcategories}>
            <div className={style["list-subcategories"]}>
              <p>Подкатегории:&nbsp;</p>
              <div className={style.listChildren}>
                {data.children.length > 0 ? data.children.map((item, idx) => <i key={item._id}>{idx === 0 ? item.title : `, ${item.title}`}</i>) : <i>отсутствуют</i>}
              </div>
            </div>
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

BlockEditCategory.propTypes = {
  item: PropTypes.object,
  isEdit: PropTypes.func,
};

export default BlockEditCategory;
