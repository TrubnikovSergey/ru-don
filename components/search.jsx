import style from "../styles/search.module.scss";
import { useState } from "react";
import InputField from "./inputField";
import { useRef } from "react";

const Search = ({ onSearch }) => {
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
    <form className={style.search} onSubmit={handleSubmit}>
      <InputField moreStyle={style.search__input} type="text" onChange={handleChange} value={value} />
      <button className={style.search__button} onClick={handleSearch}>
        Поиск
      </button>
    </form>
  );
};

export default Search;
