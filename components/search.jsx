import { useState } from "react";
import InputField from "./inputField";
import { useRef } from "react";
import style from "../styles/search.module.scss";

const Search = ({ onSearch, moreStyle, label }) => {
  const [value, setValue] = useState("");
  const handleSearch = () => {
    onSearch(value);
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <form className={`${style.search} ${moreStyle}`} onSubmit={handleSubmit}>
      <p>поиск товара:&nbsp;</p>
      <InputField moreStyle={style.search__input} type="text" onChange={handleChange} value={value} />
      <button className={style.search__button} onClick={handleSearch}>
        Найти
      </button>
    </form>
  );
};

export default Search;
