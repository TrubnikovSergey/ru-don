import { fatchAllCategories, getCategories } from "@/store/categoriesSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "../styles/categorySelection.module.scss";

const CategorySelection = ({ onChange }) => {
  const dispatch = useDispatch();
  const listCategories = useSelector(getCategories());

  useEffect(() => {
    dispatch(fatchAllCategories());
  }, []);

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    listCategories && (
      <div className={style["wrapper-select"]}>
        <p>отбор по категории:&nbsp;</p>
        <select className={style.select} onChange={handleChange}>
          <option defaultValue=""></option>
          {listCategories.map((item) => (
            <option key={item._id} value={item._id}>
              {item.title}
            </option>
          ))}
        </select>
      </div>
    )
  );
};

export default CategorySelection;
