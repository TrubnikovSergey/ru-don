import { useState } from "react";
import style from "../styles/slider.module.scss";

const Slider = ({ imageNameList }) => {
  const [idxImage, setIdxImage] = useState(0);

  const classNameDot = (idx) => {
    if (idx === idxImage) return `${style.dot} ${style["dot-active"]}`;

    return `${style.dot}`;
  };

  const handleClickDot = (idx) => {
    setIdxImage(idx);
  };

  const handleClickRightArrow = () => {
    if (idxImage + 1 < imageNameList.length) {
      setIdxImage((prev) => prev + 1);
    } else {
      setIdxImage(0);
    }
  };

  const handleClickLeftArrow = () => {
    if (idxImage - 1 >= 0) {
      setIdxImage((prev) => prev - 1);
    } else {
      setIdxImage(imageNameList.length - 1);
    }
  };

  return (
    imageNameList.length > 0 && (
      <div className={style.slider}>
        <div className={style["images"]}>
          <div className={style["arrow-left"]} onClick={handleClickLeftArrow}>
            &#9668;
          </div>
          {imageNameList.length > 0 && (
            <div className={style["image-block"]}>
              <img className={style["image"]} src={`/upload/${imageNameList[idxImage]}`} alt="Изображение товара" />
            </div>
          )}

          <div className={style["arrow-right"]} onClick={handleClickRightArrow}>
            &#9658;
          </div>
        </div>
        <div className={style["dots"]}>{imageNameList.length > 0 && imageNameList.map((item, idx) => <div className={classNameDot(idx)} key={item} onClick={() => handleClickDot(idx)}></div>)}</div>
      </div>
    )
  );
};

export default Slider;
