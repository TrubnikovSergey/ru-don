import { useState } from "react";
import style from "./blockEdit.module.scss";
import PropTypes from "prop-types";
import { useEffect } from "react";
import categoriesService from "@/services/categories.service";
import Loading from "@/components/loading";

const BlockEdit = ({ item }) => {
  //   const [childrenCategories, setChildrenCategories] = useState(null);
  //   const [allCategories, setAllCategories] = useState(null);
  const [data, setData] = useState(null);

  console.log("----data", data);

  useEffect(() => {
    categoriesService.fetchAllWithConcreteFields(["title", "_id"]).then((response) => {
      let newData = {
        title: item.title,
      };

      if (item.children.length > 0) {
        newData.children = response.filter((el) => item.children.includes(el._id));
      } else {
        newData.children = [];
      }

      if (item.parent) {
        newData.parent = response.find((el) => {
          return el._id == item.parent;
        });
      } else {
        newData.parent = null;
      }

      setData(newData);
      //   setAllCategories(data);
    });
    // if(item.children.length > 0){
    //     categoriesService.fetchByArrayId(item.children).then(data=>setChildrenCategories(data))
    // }
  }, []);

  return data ? (
    <div className={style["block-edit"]}>
      <div className={style["block-edit-content"]}>
        <div>
          <p>Наименование</p>
          <input type="text" />
        </div>
        <div>
          <p>Родительская категория</p>
          <input type="text" />
        </div>
        <div>
          <p>Подкатегории</p>
          {data.children.map((item) => (
            <i key={item._id}>{item.title}</i>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

BlockEdit.propTypes = {
  item: PropTypes.object,
};

export default BlockEdit;
