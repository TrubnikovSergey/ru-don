import { useState } from "react";
import style from "../styles/autoSlider.module.scss";
import { useEffect } from "react";
import { useRef } from "react";

const AutoSlider = ({ imagesList, moreStyle }) => {
  const [toggle, setToggle] = useState(true);
  const idxImageRef = useRef(0);
  const intervalRef = useRef(null);

  const calculateIdxImage = () => {
    setToggle((prev) => !prev);
    if (imagesList.length > 0) {
      if (idxImageRef.current === imagesList.length - 1) {
        idxImageRef.current = 0;
      } else {
        idxImageRef.current += 1;
      }
    }
  };
  const handleMouseEnter = () => {
    intervalRef.current = setInterval(calculateIdxImage, 1000);
  };

  const handleMouseLeave = () => {
    idxImageRef.current = 0;
    setToggle((prev) => !prev);
    clearInterval(intervalRef.current);
  };

  return (
    <div className={style.wrapper}>
      {imagesList.length > 0 && (
        <img className={style.image} src={imagesList[idxImageRef.current].imageBase64} alt="Изображение товара" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}></img>
      )}
    </div>
  );
};

export default AutoSlider;
