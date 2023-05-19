import style from "../styles/sort.module.scss";

const Sort = ({ list = [], onChange }) => {
  const selectedList = [
    { title: "Наименование от А до Я", value: "title asc" },
    { title: "Наименование от Я до А", value: "title desc" },
    { title: "Цена от меньшего к большему", value: "price asc" },
    { title: "Цена от большего к меньшему", value: "price desc" },
    ...list,
  ];

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className={style.sort}>
      <p>сортировка:</p>
      <select className={style["selected-list"]} onChange={handleChange}>
        {selectedList.map((item, idx) => (
          <option key={item.title + String(idx)} value={item.value}>
            {item.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Sort;
