import { useState } from "react";
import style from "./blockEdit.module.scss";
import PropTypes from "prop-types";
import { useEffect } from "react";
import categoriesService from "@/services/categories.service";
import Loading from "@/components/loading";
import { useDispatch } from "react-redux";
import { updateCategory } from "@/store/categoriesSlice";

const BlockEdit = ({ item }) => {
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

  const handlerSave = () => {};

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
          <div>
            <p>Подкатегории</p>
            <div className={style.listChildren}>
              {data.children.length > 0 ? data.children.map((item, idx) => <i key={item._id}>{idx === 0 ? item.title : `, ${item.title}`}</i>) : <i>отсутствуют</i>}
            </div>
          </div>
        </div>
        <div className={style.save}>
          <button className={style["button-save"]} type="submit" onClick={handlerSave}>
            save
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
};

export default BlockEdit;
