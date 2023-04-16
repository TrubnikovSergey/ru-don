import { useState } from "react";
import style from "./goodsItem.module.scss";
import { useRouter } from "next/router";
import { useEffect } from "react";
import goodsService from "@/services/goods.service";
import Loading from "@/components/loading";

const GoodsItem = ({ item }) => {
  const router = useRouter();
  const [data, setData] = useState(null);

  const handlerBack = () => {
    router.back();
  };

  useEffect(() => {
    goodsService.getGoodById(item._id).then((respons) => setData(respons.data));
  }, []);

  return data ? (
    <div className={style["goods-item"]}>
      <div className={style["button-back"]}>
        <button onClick={handlerBack}>Назад</button>
      </div>
      <div className={style["title"]}>
        <h1>{data.title}</h1>
      </div>
      <div className={style["slider"]}>Слайдер изображений товара</div>
      <div className={style["description"]}>
        <h1 className={style["description-title"]}>Описание</h1>
        <pre className={style["description-content"]}>{data.description}</pre>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default GoodsItem;
