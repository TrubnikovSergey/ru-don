import { useDispatch } from "react-redux";
import style from "./errorBlock.module.scss";
import { doCloseError } from "@/store/categoriesSlice";

const ErrorBlock = ({ error = {} }) => {
  const dispatch = useDispatch();

  const handlerClose = () => {
    dispatch(doCloseError(error._id));
  };

  return (
    <div className={style.error}>
      {error.message}
      <div className={style["close-button"]} onClick={handlerClose}>
        X
      </div>
    </div>
  );
};

export default ErrorBlock;
