import { useState } from "react";
import style from "./blockEdit.module.scss";
import PropTypes from "prop-types";
import { useEffect } from "react";
import categoriesService from "@/services/categories.service";
import Loading from "@/components/loading";
import { useDispatch } from "react-redux";
import { updateCategory } from "@/store/categoriesSlice";
// import MultiSelectField from "@/components/multiSelect";

const BlockEdit = ({ item, isEdit }) => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    categoriesService.fetchAllWithConcreteFields(["title", "_id"]).then((response) => {
      let newData = {
        title: item.title,
        _id: item._id,
        parent: item.parent,
      };

      if (item.children.length > 0) {
        newData.children = response.filter((el) => item.children.includes(el._id));
      } else {
        newData.children = [];
      }

      newData.listCategories = response;

      setData(newData);
    });
  }, []);

  const handlerCancel = () => {
    isEdit(false);
  };

  const handlerChange = ({ target }) => {
    setData((prev) => {
      const { name } = target;
      const value = target.name === "parent" && target.value === "" ? null : target.value;

      return { ...prev, [name]: value };
    });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    const newData = { ...data };

    delete newData.listCategories;
    newData.children = data.children.map((item) => item._id);

    dispatch(updateCategory(newData));
  };

  const toggleChildren = (id) => {
    const isExist = Boolean(data.children.find((item) => item._id === id));

    let newData = { ...data };
    if (isExist) {
      newData.children = data.children.filter((item) => item._id !== id);
    } else {
      const findItem = data.listCategories.find((item) => item._id === id);
      newData.children.push(findItem);
    }

    setData(newData);
  };

  const handlerMultiSelectClick = (e) => {
    toggleChildren(e.target.value);
    console.dir(data.children);
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
            <select className={style.input} name="parent" onChange={handlerChange} defaultValue={data.parent ? data.parent : ""}>
              <option value=""></option>
              {data.listCategories.map((item) => {
                return (
                  item._id !== data._id && (
                    <option key={item._id} value={item._id}>
                      {item.title}
                    </option>
                  )
                );
              })}
            </select>
          </div>
          <div className={style.subcategories}>
            <div className={style["list-subcategories"]}>
              <p>Подкатегории:&nbsp;</p>
              <div className={style.listChildren}>
                {data.children.length > 0 ? data.children.map((item, idx) => <i key={item._id}>{idx === 0 ? item.title : `, ${item.title}`}</i>) : <i>отсутствуют</i>}
              </div>
            </div>
            {/* <div className={style["multiselect-subcategories"]}>
              <MultiSelectField listItems={data.listCategories} listChildren={data.children} toggleSelect={toggleChildren} />
            </div> */}
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

BlockEdit.propTypes = {
  item: PropTypes.object,
  isEdit: PropTypes.func,
};

export default BlockEdit;
