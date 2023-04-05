import style from "../styles/multiSelect.module.scss";

const MultiSelectField = ({ listItems, listChildren, toggleSelect }) => {
  const handlerMultiSelectClick = (id) => {
    toggleSelect(id);
  };

  return (
    <div className={style.multiSelect}>
      {listItems.map((item) => {
        let isSelected = false;

        if (listChildren.length > 0) {
          isSelected = Boolean(listChildren.find((el) => el._id === item._id));
        }

        const classNameOption = `${style.option} ${isSelected && style.active}`;

        return (
          <div className={classNameOption} key={item._id} onClick={() => handlerMultiSelectClick(item._id)} data-selected={isSelected} data-Value={item._id}>
            {item.title}
          </div>
        );
      })}
    </div>
  );
};

export default MultiSelectField;
