import { useEffect } from "react";
import Loading from "@/components/loading";
import style from "./sectionAbout.module.scss";
import LayoutSection from "../components/layoutSection";
import { useState } from "react";
import aboutService from "@/services/about.service";

const SectionAbout = () => {
  const [data, setDate] = useState(null);
  const title = "О нас";
  const newAbout = {
    title: "О нас",
    description: "",
  };

  const handlerChange = ({ target }) => {
    const { name, value } = target;

    setDate((prev) => ({ ...prev, [name]: value }));
  };

  const handlerSave = () => {
    // console.log("Save", data);
    aboutService.saveAbout(data);
  };

  useEffect(() => {
    aboutService.fetchAll().then((respons) => {
      console.log(respons);
      if (respons.length > 0) {
        setDate(respons[0]);
      } else {
        setDate(newAbout);
      }
    });
  }, []);

  return data ? (
    <LayoutSection titleSection={title}>
      <div className={style.container}>
        <p>Информация о нас</p>
        <textarea className={style.description} rows="10" name="description" value={data.description} onChange={handlerChange} />
        <div className={style["button-save"]}>
          <button onClick={handlerSave}>Сохранить</button>
        </div>
      </div>
    </LayoutSection>
  ) : (
    <>
      <h2 className={style["section-title"]}>{title}</h2>
      <Loading />
    </>
  );
};

export default SectionAbout;
