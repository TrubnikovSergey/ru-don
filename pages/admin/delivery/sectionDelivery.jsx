import { useEffect } from "react";
import Loading from "@/components/loading";
import style from "./sectionDelivery.module.scss";
import LayoutSection from "../components/layoutSection";
import { useState } from "react";
import deliveryService from "@/services/delivery.service";

const SectionDelivery = () => {
  const [data, setDate] = useState(null);
  const title = "Доставка";
  const newDelivery = {
    title: "Доставка",
    description: "",
  };

  const handlerChange = ({ target }) => {
    const { name, value } = target;

    setDate((prev) => ({ ...prev, [name]: value }));
  };

  const handlerSave = () => {
    // console.log("Save", data);
    deliveryService.saveDelivery(data);
  };

  useEffect(() => {
    deliveryService.fetchAll().then((respons) => {
      if (respons.length > 0) {
        setDate(respons[0]);
      } else {
        setDate(newDelivery);
      }
    });
  }, []);

  return data ? (
    <LayoutSection titleSection={title}>
      <div className={style.container}>
        <p>Описание доставки</p>
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

export default SectionDelivery;
