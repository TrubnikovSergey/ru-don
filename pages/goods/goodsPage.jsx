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
import Link from "next/link";

const GoodsPage = ({ item }) => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [chainCategories, setChainCategories] = useState(null);

  const handlerBack = () => {
    router.back();
  };

  useEffect(() => {
    goodsService.getGoodsById(item._id).then((respons) => setData(respons.data));
    goodsService.getChainCategories(item.categoryId).then((respons) => setChainCategories(respons.data));
  }, []);

  console.log("----------chainCategories", chainCategories);
  console.log("----------data", data);

  let renderChain = null;
  if (chainCategories) {
    if (chainCategories.length > 0) {
      let newChain = chainCategories.map((item) => (
        <Link href={`/goods?categoryId=${item._id}&page=1`} key={item._id}>
          {item.title}
        </Link>
      ));
      newChain.reverse();

      renderChain = (
        <div className={style.chain}>
          {newChain.map((item, idx, arr) => {
            const renderItem = arr.length - 1 > idx ? <span>{item}&nbsp;/&nbsp;</span> : item;
            return renderItem;
          })}
        </div>
      );

      // renderChain = newChain.reduce((acc, item, idx, arr)=>{
      //   if(arr.length - 1 > idx){

      //     acc += `/goods?categoryId=${item._id}&page=1`
      //   }
      // },``);
    } else {
      renderChain = <Link href={`/goods?page=1`}>Все товары</Link>;
    }
  }

  return data && chainCategories ? (
    <Card moreStyle={style.wrapper}>
      <div className={style.conteiner}>
        {renderChain}
        <div className={style["button-back"]}>
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
