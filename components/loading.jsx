import { useState } from "react";
import style from "../styles/loading.module.scss";

const Loading = () => {
  return (
    <div className={style.container}>
      <div className={style.loading}></div>
      <div className={style.loading}></div>
      <div className={style.loading}></div>
    </div>
  );
};

export default Loading;
