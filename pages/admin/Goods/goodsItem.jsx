import React from "react";
import PropTypes from "prop-types";
import style from "./goodsItem.module.scss";
import { useState } from "react";
import BlockEdit from "./BlockEditGoods";
import { useDispatch } from "react-redux";
import { removeGoods } from "../../../store/goodsSlice";

const GoodsItem = ({ item = {} }) => {
  const [isEdit, setIsEdit] = useState(false);
  const { title, _id } = item;
  const dispatch = useDispatch();

  const handlerEdit = (id) => {
    setIsEdit(!isEdit);
  };

  const handlerDel = (id) => {
    dispatch(removeGoods(id));
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

GoodsItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default GoodsItem;
