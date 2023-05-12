import style from "../styles/inputField.module.scss";
import { useState } from "react";

const InputField = ({ moreStyle = null, type = "", name = "", label = "", required = false, onChange = null, value = "" }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const calcType = (type) => {
    if (type === "password") {
      return showPassword ? "text" : "password";
    }

    return type;
  };
  const handleClickShowHide = (e) => {
    setShowPassword((prev) => !prev);
  };

  const handlerChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div>
      <p>{label}</p>
      <div className={style.wrapperInput}>
        <input className={`${style.input} ${moreStyle}`} type={calcType(type)} name={name} required={required} onChange={handlerChange} value={value} />
        {isPassword && (
          <div className={style.wrapperEye} onClick={handleClickShowHide}>
            <img className={style.eye} src={showPassword ? "/images/open_eye.svg" : "/images/close_eye.svg"} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;
