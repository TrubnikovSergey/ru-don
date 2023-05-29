import { MongoClient } from "mongodb";
import Tree from "@/components/tree";
import { useRouter } from "next/router";
import Link from "next/link";
import GoodsList from "./goodsList";
import Card from "@/components/card";
import GoodsPage from "./goodsPage";
import Search from "@/components/search";
import { useEffect, useState } from "react";
import Sort from "@/components/sort";
import { useDispatch, useSelector } from "react-redux";
import { getKindSort, setKindSort } from "@/store/sortSlice";
import { sortGoods } from "@/utils/sort";
import Loading from "@/components/loading";
import { filterGoodsBySearchValue } from "@/utils/filterGoods";
import PaginationWithLink from "@/components/paginationWithLink";
import configJSON from "../../config.json";
import style from "./goods.module.scss";

export const getServerSideProps = async (context) => {
  const mongoURL = process.env.MONGO_URL;
  const ObjectId = require("mongodb").ObjectId;
  const pageSize = Number(process.env.pageSize);
  let dataGoods = [];
  let dataCategories = [];
  let totalCount = 0;
  let page = 1;
  let skip = 0;

  const client = new MongoClient(`${mongoURL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db("energy");
  dataCategories = await db.collection("categories").find({ parent: null }).toArray();

  const { resolvedUrl, query } = context;
  console.log("----------query", query);
  if ("categoryId" in query) {
    page = Number(query.page);
    skip = (page - 1) * pageSize;

    dataGoods = await db.collection("goods").find({ categoryId: query.categoryId }).skip(skip).limit(pageSize).toArray();
    totalCount = await db.collection("goods").find({ categoryId: query.categoryId }).count();
  } else if ("goodsId" in query) {
    if (query.goodsId === "all") {
      dataGoods = await db.collection("goods").find({}).limit(pageSize).toArray();
      totalCount = await db.collection("goods").find({}).count();
    } else {
      dataGoods = await db.collection("goods").findOne({ _id: new ObjectId(context.query.goodsId) });
    }
  } else {
    page = Number(query.page);
    skip = (page - 1) * pageSize;

    dataGoods = await db.collection("goods").find({}).skip(skip).limit(pageSize).toArray();
    totalCount = await db.collection("goods").find({}).count();
  }

  client.close();

  if (dataCategories.name === "Error" && dataGoods.name === "Error") {
    return { notFound: true };
  }

  return {
    props: {
      categories: JSON.parse(JSON.stringify(dataCategories)),
      goods: JSON.parse(JSON.stringify(dataGoods)),
      baseUrl: resolvedUrl,
      totalCount,
      pageSize,
    },
  };
};

function createBaseUrl(url) {
  const objURL = new URL(`${configJSON.HOST}/${url}`);
  objURL.searchParams.delete("page");
  const pathName = objURL.pathname;
  const search = objURL.search;

  const resultUrl = `${pathName}${search}`.replace("//", "/");

  return resultUrl;
}

const MainPage = ({ goods, categories, baseUrl, totalCount, pageSize }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const kindSort = useSelector(getKindSort());
  const { categoryId, goodsId } = router.query;
  const [searchValue, setSearchValue] = useState("");
  const [toggle, setToggle] = useState(true);
  let goodsList = null;
  let goodsItem = null;
  let foundGoods = null;

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, []);

  const handleSearch = (searchData) => {
    setSearchValue(searchData);
  };

  const handleClickLink = () => {
    setToggle((prev) => !prev);
  };

  const handleChange = (sort) => {
    dispatch(setKindSort(sort));
  };

  if (goodsId && goodsId !== "all") {
    goodsItem = goods;
  } else {
    foundGoods = filterGoodsBySearchValue(goods, searchValue);

    goodsList = sortGoods(foundGoods, kindSort);
  }

  return (
    <main className={style.main}>
      <Card moreStyle={style.categories}>
        <section>
          <div className={style.container}>
            <h1 className={style.categories__title}>Категории</h1>
            <div className={style["link-all-goods"]}>
              <Link href="/goods?page=1" onClick={handleClickLink}>
                Все товары
              </Link>
            </div>
            <Tree treeData={categories} />
          </div>
        </section>
      </Card>
      <section className={style.goods}>
        <Card>
          <div className={style["tools-bar"]}>
            <Search onSearch={handleSearch} moreStyle={style["tools-search"]} />
            <Sort onChange={handleChange} />
          </div>
          <div className={style["wrapper-pagination"]}>
            <PaginationWithLink baseUrl={createBaseUrl(baseUrl)} searchValue={searchValue} totalCount={totalCount} sizePage={pageSize} />
          </div>
        </Card>
        {loading ? (
          <div className={style.loadingGoodsContent}>
            <Loading />
          </div>
        ) : (
          <>
            {goodsItem && <GoodsPage item={goodsItem} />}
            {goodsList && <GoodsList list={goodsList} />}
          </>
        )}
      </section>
    </main>
  );
};

export default MainPage;
