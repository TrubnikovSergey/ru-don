import { useState } from "react";
import InputField from "./inputField";
import { useRef } from "react";
import style from "../styles/search.module.scss";
import { useDispatch } from "react-redux";
import { setSearchValue } from "@/store/searchSlice";
import { useEffect } from "react";

const Search = ({ moreStyle, value }) => {
  const dispatch = useDispatch();
  const [localValue, setLocalValue] = useState(value);
  const [timer, setTimer] = useState(true);

  useEffect(() => {
    if (timer) {
      dispatch(setSearchValue(localValue));
    }
  }, [timer]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e) => {
    setLocalValue(e.target.value);
    if (timer) {
      setTimer(false);
      setTimeout(() => {
        setTimer(true);
      }, 500);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className={`${style.search} ${moreStyle}`} onSubmit={handleSubmit}>
      <p>поиск товара:&nbsp;</p>
      <InputField moreStyle={style.search__input} type="text" onChange={handleChange} value={localValue} />
    </form>
  );
};

export default Search;
