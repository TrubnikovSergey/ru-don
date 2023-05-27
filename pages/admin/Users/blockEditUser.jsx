import { useState } from "react";
import style from "./blockEditUser.module.scss";
import PropTypes from "prop-types";
import Loading from "@/components/loading";
import { useDispatch, useSelector } from "react-redux";
import { doClearSuccess, getIsLoading, getSuccess, updateUser } from "@/store/userSlice";
import { useRef } from "react";
import InputField from "@/components/inputField";
import useSuccess from "@/hooks/useSuccess";
import ButtonSave from "@/components/buttonSave";

const BlockEditUser = ({ item, isEdit }) => {
  const [data, setData] = useState({ ...item, password: "" });
  const dispatch = useDispatch();
  const successData = useSelector(getSuccess());
  const isLoading = useSelector(getIsLoading());

  useSuccess(successData, item?._id, doClearSuccess);

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
          <InputField name="password" type="password" label="Пароль" onChange={handlerChange} value={data.password} />
        </div>
        <ButtonSave isSaving={isLoading} />
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
