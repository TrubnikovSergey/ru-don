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
import Head from "next/head";
import JSONConfig from "../../config.json";
import { createNameImageWithID } from "@/utils/images";

const GoodsPage = ({ item }) => {
  const router = useRouter();
  const handlerBack = () => {
    router.back();
  };

  let renderChain = null;
  if (item?.chainCategories.length > 0) {
    renderChain = item.chainCategories
      .map((el) => (
        <span key={el._id}>
          <Link href={`/goods?categoryId=${el._id}&page=1`}>{el.title}</Link>
        </span>
      ))
      .map((el, idx, arr) => {
        const renderItem = arr.length - 1 > idx ? <span key={el.key}>{el}&nbsp;/&nbsp;</span> : <span key={el.key}>{el}</span>;
        return renderItem;
      });
  } else {
    renderChain = <Link href={`/goods?page=1`}>Все товары</Link>;
  }

  return (
    <>
      <Head>
        <title>{item?.title}</title>
        <meta name="description" content={item?.description} />
        <meta name="keywords" content={item?.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={JSONConfig.HOST} />​
        <meta property="og:title" content={item?.title} />
        <meta property="og:description" content={item?.description} />​
        {item?.images.length > 0 && (
          <>
            <meta property="og:image" content={`${JSONConfig.HOST}/images/${createNameImageWithID(item.images[0])}`} />
            <meta property="og:image:type" content="image/jpeg" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
          </>
        )}
      </Head>
      <Card moreStyle={style.wrapper}>
        <div className={style.conteiner} itemScope itemType="http://schema.org/Product">
          <div className={style["chain-wrapper"]}>
            <div className={style["chain-container"]}>{renderChain}</div>
          </div>
          <div itemProp="name" className={style["title"]}>
            <h1>{item?.title}</h1>
          </div>
          <div itemProp="description" style={{ display: "none" }}>
            {item?.description}
          </div>
          <img src={item?.images.length > 0 ? `${JSONConfig.HOST}/images/${createNameImageWithID(item.images[0])}` : ""} itemProp="image" style={{ display: "none" }} />
          {item?.images.length > 0 && <Slider imagesList={item?.images} />}
          <div className={style.offers} itemProp="offers" itemScope itemType="http://schema.org/Offer">
            <div className={style["price"]}>
              <meta itemProp="price" content={Number(item?.price).toFixed(2)} />
              <meta itemProp="priceCurrency" content="RUB" />
              <h1>{Number(item?.price).toFixed(2)} р.</h1>
            </div>

            <div itemProp="description" className={style["description"]}>
              <h1 className={style["description-title"]}>Описание</h1>
              <div className={style["description-content"]}>{item?.description}</div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default GoodsPage;
