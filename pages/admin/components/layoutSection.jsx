import style from "./layoutSection.module.scss";

const LayoutSection = ({ children, titleSection, onCreateNewElement, titleButtonCreate, ...props }) => {
  const isShowCreateButton = onCreateNewElement && titleButtonCreate;
  
  return (
    <div className={style["section"]}>
      <h2 className={style["section-title"]}>{titleSection}</h2>
      {isShowCreateButton && (
        <button className={style["create-element"]} onClick={onCreateNewElement}>
          {titleButtonCreate}
        </button>
      )}
      <div className={style["section-content"]}>{children}</div>
    </div>
  );
};

export default LayoutSection;
