import { useState } from "react";
import style from "./blockEditUser.module.scss";
import PropTypes from "prop-types";
import Loading from "@/components/loading";
import { useDispatch } from "react-redux";
import { updateUser } from "@/store/userSlice";
import { useRef } from "react";
import InputField from "@/components/inputField";

const BlockEditUser = ({ item, isEdit }) => {
  const [data, setData] = useState({ ...item, password: "" });
  const dispatch = useDispatch();

  const handlerCancel = () => {
    isEdit(false);
  };

  const handlerChange = ({ target }) => {
    setData((prev) => {
      let { name, value } = target;
      return { ...prev, [name]: value };
    });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUser(data));
  };

  return data ? (
    <div className={style["block-edit"]}>
      <form onSubmit={handlerSubmit}>
        <div className={style["block-edit-content"]}>
          <InputField label="Имя" type="text" name="title" required={true} onChange={handlerChange} value={data.title} />
          <InputField label="Email" type="email" name="email" required={true} onChange={handlerChange} value={data.email} />
          <InputField name="password" type="password" label="Пароль" onChange={handlerChange} required={true} value={data.password} />
        </div>
        <div className={style["buttons-save-cancel"]}>
          <button className={style["button"]} type="submit">
            Сохранить
          </button>
          <button className={style["button"]} type="button" onClick={handlerCancel}>
            Отмена
          </button>
        </div>
      </form>
    </div>
  ) : (
    <Loading />
  );
};

BlockEditUser.propTypes = {
  item: PropTypes.object,
  isEdit: PropTypes.func,
};

export default BlockEditUser;
