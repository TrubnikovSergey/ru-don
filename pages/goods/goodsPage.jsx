import { useState } from "react";
import style from "./goodsPage.module.scss";
import { useRouter } from "next/router";
import { useEffect } from "react";
import goodsService from "@/services/goods.service";
import Loading from "@/components/loading";
import Card from "@/components/card";
import httpService from "@/services/http.service";
import Slider from "../../components/slider";
import Button from "@/components/button";

const GoodsPage = ({ item }) => {
  const router = useRouter();
  const [data, setData] = useState(null);

  const handlerBack = () => {
    router.back();
  };

  useEffect(() => {
    goodsService.getGoodsById(item._id).then((respons) => setData(respons.data));
  }, []);

  return data ? (
    <Card moreStyle={style.wrapper}>
      <div className={style.conteiner}>
        <div className={style["button-back"]}>
          {/* <button onClick={handlerBack}>Назад</button> */}
          <Button onClick={handlerBack}>&lt;</Button>
        </div>
        <div className={style["title"]}>
          <h1>{data.title}</h1>
        </div>
        {data.images.length > 0 && <Slider imagesList={data.images.map((item) => ({ imageBase64: item.imageBase64 }))} />}
        <div className={style["price"]}>
          <h1>{data.price} р.</h1>
        </div>

        <div className={style["description"]}>
          <h1 className={style["description-title"]}>Описание</h1>
          <div className={style["description-content"]}>{data.description}</div>
        </div>
      </div>
    </Card>
  ) : (
    <>
      <br />
      <br />
      <Loading />
    </>
  );
};

export default GoodsPage;
