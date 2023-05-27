import { useState } from "react";
import style from "./blockEditContacts.module.scss";
import PropTypes from "prop-types";
import Loading from "@/components/loading";
import { useDispatch, useSelector } from "react-redux";
import { doClearSuccess, getIsLoading, getSuccess, updateContacts } from "@/store/contactsSlice";
import useSuccess from "@/hooks/useSuccess";
import ButtonSave from "@/components/buttonSave";

const BlockEditContacts = ({ item, isEdit }) => {
  const [data, setData] = useState(item);
  const dispatch = useDispatch();
  const successData = useSelector(getSuccess());
  const isLoading = useSelector(getIsLoading());

  useSuccess(successData, item?._id, doClearSuccess);

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

    dispatch(updateContacts(data));
  };

  return data ? (
    <div className={style["block-edit"]}>
      <form onSubmit={handlerSubmit}>
        <div className={style["block-edit-content"]}>
          <div>
            <p>Название контакта</p>
            <input className={style.input} type="text" name="title" required={true} onChange={handlerChange} value={data.title} />
          </div>
          <div>
            <p>Описание котакта</p>
            <textarea className={style.textarea} rows="10" name="description" onChange={handlerChange} value={data.description}></textarea>
          </div>
        </div>
        <ButtonSave isSaving={isLoading} />
      </form>
    </div>
  ) : (
    <Loading />
  );
};

BlockEditContacts.propTypes = {
  item: PropTypes.object,
  isEdit: PropTypes.func,
};

export default BlockEditContacts;
