import ItemOfSection from "./itemOfSection";
import style from "./listItemsOfSection.module.scss";

const ListItemsOfSection = ({ listItems = [], handlerDel, children, errors }) => {
  const errorsForItem = (id) => {
    return errors.filter((item) => item._id === id);
  };

  return (
    <ul className={style.list}>
      {listItems.map((item) => (
        <div className={style["item-container"]} key={item._id}>
          <ItemOfSection item={item} handlerDel={handlerDel} errors={errorsForItem(item._id)}>
            {children}
          </ItemOfSection>
          <hr />
        </div>
      ))}
    </ul>
  );
};

export default ListItemsOfSection;
