import { useEffect } from "react";
import Loading from "@/components/loading";
import style from "./sectionAbout.module.scss";
import LayoutSection from "../components/layoutSection";
import { useState } from "react";
import aboutService from "@/services/about.service";
import { toast } from "react-toastify";

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

  const handlerSave = async () => {
    const respons = await aboutService.saveAbout(data);
    if (!respons.error) {
      toast.success(`Раздел "${data.title}" сохранен`);
    }
  };

  useEffect(() => {
    aboutService.fetchAll().then((respons) => {
      if (respons.data.length > 0) {
        setDate(respons.data[0]);
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
    <LayoutSection titleSection={title}>
      <Loading />
    </LayoutSection>
  );
};

export default SectionAbout;
