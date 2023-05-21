import React from "react";
import PropTypes from "prop-types";
import style from "./categoryItem.module.scss";
import { useState } from "react";
import BlockEdit from "./BlockEditCategory";
import { useDispatch, useSelector } from "react-redux";
import { removeCategory } from "../../../store/categoriesSlice";

const CategoryItem = ({ item = {} }) => {
  const [isEdit, setIsEdit] = useState(false);
  const { title, _id } = item;
  const dispatch = useDispatch();

  const handlerEdit = (id) => {
    setIsEdit(!isEdit);
  };

  const handlerDel = (id) => {
    dispatch(removeCategory(id));
  };

  return (
    <>
      <div className={style.item}>
        {title}
        <div className={style["item-buttons"]}>
          <div className={style["button"]} onClick={() => handlerEdit(_id)}>
            <img className={style["button-img"]} src="/images/edit.svg" alt="Редактировать" />
          </div>
          <div className={style["button"]} onClick={() => handlerDel(_id)}>
            <img className={style["button-img"]} src="/images/delete.svg" alt="Удалить" />
          </div>
        </div>
      </div>
      {isEdit && <BlockEdit item={item} isEdit={setIsEdit} />}
    </>
  );
};

CategoryItem.propTypes = {
  item: PropTypes.object,
};

export default CategoryItem;
