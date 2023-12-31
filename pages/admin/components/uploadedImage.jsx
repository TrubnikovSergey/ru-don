import { useState } from "react";
import style from "./uploadedImage.module.scss";
import DELETE_IMAGE from "../../../public/images/delete.svg";
import { createNameImageWithID } from "@/utils/images";

const UploadedImage = ({ item, handleDelete }) => {
  const [delImage, setDelImage] = useState(false);
  const classNameItem = delImage ? `${style["delete-image"]}` : "";
  const classNameContent = delImage ? `${style["opacity-content"]}` : "";
  let isBase64 = Boolean(item?.imageBase64);
  const handleMouseEnter = () => {
    setDelImage(true);
  };
  const handleMouseLeave = () => {
    setDelImage(false);
  };

  return (
    item && (
      <div className={classNameItem} key={item._id} onClick={() => handleDelete(item)}>
        <div className={classNameContent} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className={style["item-image"]}>
            <img className={style.image} src={isBase64 ? item.imageBase64 : `images/${createNameImageWithID(item)}`} alt="изображение товара" />
          </div>
          <div className={style["item-title"]}>{item.name}</div>
        </div>
      </div>
    )
  );
};

export default UploadedImage;
