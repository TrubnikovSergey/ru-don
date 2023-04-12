import React from "react";
import PropTypes from "prop-types";
import style from "./itemOfSection.module.scss";
import { useState } from "react";
import BlockEditCategory from "../Categories/BlockEditCategory";
import BlockEditGood from "../Goods/BlockEditGood";

const ItemOfSection = ({ item = {}, handlerDel, children }) => {
  const [isEdit, setIsEdit] = useState(false);
  const { title, _id } = item;

  const handlerEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <>
      <div className={style.item}>
        {title}
        <div className={style["item-buttons"]}>
          <div className={style["button"]} onClick={handlerEdit}>
            <img className={style["button-img"]} src="/images/edit.svg" alt="Редактировать" />
          </div>
          <div className={style["button"]} onClick={() => handlerDel(_id)}>
            <img className={style["button-img"]} src="/images/delete.svg" alt="Удалить" />
          </div>
        </div>
      </div>
      {isEdit &&
        React.Children.map(children, (child) => {
          if (child.type === BlockEditCategory || child.type === BlockEditGood) {
            console.log("React.Children", child);
            return React.cloneElement(child, { item, isEdit: setIsEdit });
          }
          return child;
        })}
    </>
  );
};
// <BlockEdit item={item} isEdit={setIsEdit} />}

ItemOfSection.propTypes = {
  item: PropTypes.object.isRequired,
  handlerDel: PropTypes.func.isRequired,
};

export default ItemOfSection;
