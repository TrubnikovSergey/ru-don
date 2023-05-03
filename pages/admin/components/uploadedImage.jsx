import { useState } from "react";
import style from "./uploadedImage.module.scss";
import DELETE_IMAGE from "../../../public/images/delete.svg";

const UploadedImage = ({ item, handleDelete }) => {
  const [delImage, setDelImage] = useState(false);
  const classNameItem = delImage ? `${style["delete-image"]}` : "";
  const classNameContent = delImage ? `${style["opacity-content"]}` : "";

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
            <img className={style.image} src={item.imageBase64} alt="изображение товара" />
          </div>
          <div className={style["item-title"]}>{item.name}</div>
        </div>
      </div>
    )
  );
};

export default UploadedImage;
