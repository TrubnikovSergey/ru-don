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
import { getSearchValue, setSearchValue } from "@/store/searchSlice";
import { sortGoods } from "@/utils/sort";
import Loading from "@/components/loading";
import { filterGoodsBySearchValue } from "@/utils/filterGoods";
import PaginationWithLink from "@/components/paginationWithLink";
import configJSON from "../../config.json";
import style from "./goods.module.scss";
import { deleteURLParams } from "@/utils/url";

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
    console.log("----------else");
    page = Number(query.page);
    skip = (page - 1) * pageSize;

    dataGoods = await db.collection("goods").find({}).skip(skip).limit(pageSize).toArray();
    console.log("----------dataGoods", dataGoods);
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
  let resultUrl = deleteURLParams(url, "page");
  resultUrl = deleteURLParams(resultUrl, "search");
  console.log("---------resultUrl", resultUrl);
  return resultUrl;
}

const MainPage = ({ goods, categories, baseUrl, totalCount, pageSize }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchValue = useSelector(getSearchValue());
  const { categoryId, goodsId } = router.query;
  const [kindSort, setKindSort] = useState("");
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
      dispatch(setSearchValue(""));
    };
  }, []);

  const handleSearch = (searchData) => {
    dispatch(setSearchValue(searchData));
  };

  const handleClickLink = () => {
    setToggle((prev) => !prev);
  };

  const handleChangeSort = (sort) => {
    setKindSort(sort);
  };

  if (!goodsId) {
    goodsList = goods;
  } else {
    goodsItem = goods;
  }

  let hrefAll = `/goods?&page=1`;
  const newURL = deleteURLParams(hrefAll, "search");
  if (searchValue) {
    hrefAll = `${newURL}&search=${searchValue}`;
  }

  return (
    <main className={style.main}>
      <Card moreStyle={style.categories}>
        <section>
          <div className={style.container}>
            <h1 className={style.categories__title}>Категории</h1>
            <div className={style["link-all-goods"]}>
              <Link href={hrefAll} onClick={handleClickLink}>
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
            <Sort onChange={handleChangeSort} />
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
