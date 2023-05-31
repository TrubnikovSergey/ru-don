import style from "../styles/button.module.scss";

const Button = ({ onClick, children }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <div className={style["wrapper-button"]} onClick={handleClick}>
      <div className={style["container-button"]}>{children}</div>
    </div>
  );
};

export default Button;
