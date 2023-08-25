import { useState } from "react";
import style from "../styles/slider.module.scss";
import { useEffect } from "react";
import { useRef } from "react";
import { createNameImageWithID } from "@/utils/images";

const Slider = ({ imagesList = [], autoslide = false }) => {
  const [idxImage, setIdxImage] = useState(0);
  const idxImageRef = useRef(idxImage);

  useEffect(() => {
    if (autoslide) {
      const intervalAutoSlide = setInterval(() => {
        if (idxImageRef.current + 1 < imagesList.length) {
          setIdxImage((prev) => {
            idxImageRef.current = prev + 1;
            return prev + 1;
          });
        } else {
          setIdxImage(0);
          idxImageRef.current = 0;
        }
      }, 2000);

      return () => clearInterval(intervalAutoSlide);
    }
  }, []);

  const getClassNameDot = (idx) => {
    if (idx === idxImage) return `${style.dot} ${style["dot-active"]}`;

    return `${style.dot}`;
  };

  const handleClickDot = (idx) => {
    setIdxImage(idx);
  };

  const handleClickRightArrow = () => {
    if (idxImage + 1 < imagesList.length) {
      setIdxImage((prev) => {
        idxImageRef.current = prev + 1;
        return prev + 1;
      });
    } else {
      setIdxImage(0);
      idxImageRef.current = 0;
    }
  };

  const handleClickLeftArrow = () => {
    if (idxImage - 1 >= 0) {
      setIdxImage((prev) => {
        idxImageRef.current = prev - 1;
        return prev - 1;
      });
    } else {
      setIdxImage(imagesList.length - 1);
      idxImageRef.current = 0;
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
                <img
                  className={style["image"]}
                  src={idxImage < imagesList.length ? `images/${createNameImageWithID(imagesList[idxImage])}` : `${createNameImageWithID(imagesList[0])}`}
                  alt="Изображение товара"
                />
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
