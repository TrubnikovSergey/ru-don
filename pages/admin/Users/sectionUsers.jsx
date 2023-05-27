import { useDispatch, useSelector } from "react-redux";
import LayoutSection from "../components/layoutSection";
import { createUser, fetchAllUser, getIsLoading, getUsers, removeUser } from "@/store/userSlice";
import { getErrors } from "@/store/userSlice";
import ListItemsOfSection from "../components/listItemsOfSection";
import BlockEditUser from "./blockEditUser";
import { useEffect } from "react";
import Loading from "@/components/loading";
import style from "../styles/section.module.scss";

const SectionUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector(getUsers());
  const errors = useSelector(getErrors());
  const isLoading = useSelector(getIsLoading());
  const title = "Администраторы";
  const newUser = {
    title: "Новый администратор",
    email: "",
    password: "",
  };

  useEffect(() => {
    dispatch(fetchAllUser());
  }, []);

  const handlerCreateUser = () => {
    dispatch(createUser(newUser));
  };
  const handlerDeleteUser = (id) => {
    dispatch(removeUser(id));
  };

  let renderUser = null;
  if (users.length > 0) {
    renderUser = (
      <LayoutSection onCreateNewElement={handlerCreateUser} titleButtonCreate="Создать администратора" titleSection={title}>
        <ListItemsOfSection listItems={users} handlerDel={handlerDeleteUser} errors={errors}>
          <BlockEditUser />
        </ListItemsOfSection>
      </LayoutSection>
    );
  } else {
    if (isLoading) {
      renderUser = (
        <>
          <h2 className={style["section-title"]}>{title}</h2>
          <Loading />
        </>
      );
    } else {
      renderUser = <LayoutSection onCreateNewElement={handlerCreateUser} titleButtonCreate="Создать администратора" titleSection={title}></LayoutSection>;
    }
  }

  return renderUser;
};

export default SectionUsers;
