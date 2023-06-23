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

  let renderChain = null;
  if (chainCategories) {
    if (chainCategories.length > 0) {
      let newChain = chainCategories.map((item) => (
        <span key={item._id}>
          <Link href={`/goods?categoryId=${item._id}&page=1`}>
            {item.title}
          </Link>
        </span>
      ));
      newChain.reverse();

      renderChain = newChain.map((item, idx, arr) => {
        const renderItem = arr.length - 1 > idx ? <span key={item._id}>{item}&nbsp;/&nbsp;</span> : <span key={item._id}>{item}</span>;
        return renderItem;
      });
    } else {
      renderChain = <Link href={`/goods?page=1`}>Все товары</Link>;
    }
  }

  return data && chainCategories ? (
    <Card moreStyle={style.wrapper}>
      <div className={style.conteiner} itemScope="" itemType="http://schema.org/Product">
        <div className={style["chain-wrapper"]}>
          <div className={style["chain-container"]}>{renderChain}</div>
        </div>
        <div itemProp="name" className={style["title"]}>
          <h1>{data.title}</h1>
        </div>
        <span itemProp="image">{data.images.length > 0 && <Slider imagesList={data.images.map((item) => ({ imageBase64: item.imageBase64 }))} />}</span>
        <div itemProp="offers" itemScope="" itemType="http://schema.org/Offer">
          <div className={style["price"]}>
            <meta itemProp="price" content={Number(data.price).toFixed(2)} />
            <meta itemProp="priceCurrency" content="RUB" />
            <h1>{Number(data.price).toFixed(2)} р.</h1>
          </div>

          <div itemProp="description" className={style["description"]}>
            <h1 className={style["description-title"]}>Описание</h1>
            <div className={style["description-content"]}>{data.description}</div>
          </div>
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
