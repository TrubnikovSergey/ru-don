import { useState } from "react";
import style from "../styles/slider.module.scss";

const Slider = ({ imagesList = [] }) => {
  const [idxImage, setIdxImage] = useState(0);

  const getClassNameDot = (idx) => {
    if (idx === idxImage) return `${style.dot} ${style["dot-active"]}`;

    return `${style.dot}`;
  };
  const handleClickDot = (idx) => {
    setIdxImage(idx);
  };

  const handleClickRightArrow = () => {
    if (idxImage + 1 < imagesList.length) {
      setIdxImage((prev) => prev + 1);
    } else {
      setIdxImage(0);
    }
  };

  const handleClickLeftArrow = () => {
    if (idxImage - 1 >= 0) {
      setIdxImage((prev) => prev - 1);
    } else {
      setIdxImage(imagesList.length - 1);
    }
  };

  return (
    imagesList.length > 0 && (
      <div className={style["wrapper-slider"]}>
        <div className={style.slider}>
          <div className={style["images"]}>
            <div className={style["arrow-left"]} onClick={handleClickLeftArrow}>
              &#9668;
            </div>
            {imagesList.length > 0 && (
              <div className={style["image-block"]}>
                <img className={style["image"]} src={imagesList[idxImage].imageBase64} alt="Изображение товара" />
              </div>
            )}

            <div className={style["arrow-right"]} onClick={handleClickRightArrow}>
              &#9658;
            </div>
          </div>
          <div className={style["dots"]}>{imagesList.length > 0 && imagesList.map((item, idx) => <div className={getClassNameDot(idx)} key={idx} onClick={() => handleClickDot(idx)}></div>)}</div>
        </div>
      </div>
    )
  );
};

export default Slider;
