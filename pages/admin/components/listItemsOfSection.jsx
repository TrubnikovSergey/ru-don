import ItemOfSection from "./itemOfSection";
import style from "./listItemsOfSection.module.scss";

const ListItemsOfSection = ({ listItems = [], handlerDel, children }) => {
  return (
    <ul className={style.list}>
      {listItems.map((item) => (
        <div className={style["item-container"]} key={item._id}>
          <ItemOfSection item={item} handlerDel={handlerDel}>
            {children}
          </ItemOfSection>
          <hr />
        </div>
      ))}
    </ul>
  );
};

export default ListItemsOfSection;
