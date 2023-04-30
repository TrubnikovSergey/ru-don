import style from "../styles/card.module.scss";

const Card = ({ moreStyle, children }) => {
  return <div className={`${style.card} ${moreStyle}`}>{children}</div>;
};

export default Card;
