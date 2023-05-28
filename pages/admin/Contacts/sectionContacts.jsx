import { useDispatch, useSelector } from "react-redux";
import LayoutSection from "../components/layoutSection";
import { createContacts, fetchAllContacts, getContacts, getIsLoading, removeContacts } from "@/store/contactsSlice";
import { getErrors } from "@/store/newsSlice";
import ListItemsOfSection from "../components/listItemsOfSection";
import BlockEditContacts from "./blockEditContacts";
import { useEffect } from "react";
import Loading from "@/components/loading";
import style from "../styles/section.module.scss";

const SectionContacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts());
  const errors = useSelector(getErrors());
  const isLoading = useSelector(getIsLoading());
  const title = "Контакты";
  const newContact = {
    title: "Новый контакт",
    description: "Описание контакта",
    latitude: 0,
    longitude: 0,
  };

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, []);

  const handlerCreateContacts = () => {
    dispatch(createContacts(newContact));
  };
  const handlerDeleteContacts = (id) => {
    dispatch(removeContacts(id));
  };

  let renderContacts = null;

  if (contacts.length > 0) {
    renderContacts = (
      <LayoutSection onCreateNewElement={handlerCreateContacts} titleButtonCreate="Создать контакт" titleSection={title}>
        <ListItemsOfSection listItems={contacts} handlerDel={handlerDeleteContacts} errors={errors}>
          <BlockEditContacts />
        </ListItemsOfSection>
      </LayoutSection>
    );
  } else {
    if (isLoading) {
      renderContacts = (
        <>
          <h2 className={style["section-title"]}>{title}</h2>
          <Loading />
        </>
      );
    } else {
      renderContacts = <LayoutSection onCreateNewElement={handlerCreateContacts} titleButtonCreate="Создать контакт" titleSection={title}></LayoutSection>;
    }
  }

  return renderContacts;
};

export default SectionContacts;
