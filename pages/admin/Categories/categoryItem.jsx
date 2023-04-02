import React from "react";
import PropTypes from "prop-types";
import style from "./categoryItem.module.scss";
import { useState } from "react";
import BlockEdit from "./blockEdit";

const CategoryItem = ({ item }) => {
  const [isEdit, setIsEdit] = useState(false);
  const { title, _id } = item;

  const handlerEdit = (id) => {
    setIsEdit(!isEdit);
  };

  const handlerDel = (id) => {};

  return (
    <>
      <div className={style.item}>
        {title}
        <div className={style["item-buttons"]}>
          <button className={style["button-edit"]} onClick={() => handlerEdit(_id)}>
            Edit
          </button>
          <button className={style["button-del"]} onClick={() => handlerDel(_id)}>
            Del
          </button>
        </div>
      </div>
      {isEdit && <BlockEdit item={item} />}
    </>
  );
};

CategoryItem.propTypes = {
  item: PropTypes.object,
};

export default CategoryItem;
