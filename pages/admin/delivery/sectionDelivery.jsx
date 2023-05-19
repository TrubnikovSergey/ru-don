import { useEffect } from "react";
import Loading from "@/components/loading";
import LayoutSection from "../components/layoutSection";
import { useState } from "react";
import deliveryService from "@/services/delivery.service";
import style from "./sectionDelivery.module.scss";
import { toast } from "react-toastify";

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

  const handlerSave = async () => {
    const respons = await deliveryService.saveDelivery(data);
    if (!respons.error) {
      toast.success(`Раздел "${data.title}" сохранен`);
    }
  };

  useEffect(() => {
    deliveryService.fetchAll().then((respons) => {
      if (respons.data.length > 0) {
        setDate(respons.data[0]);
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
    <LayoutSection titleSection={title}>
      <Loading />
    </LayoutSection>
  );
};

export default SectionDelivery;
