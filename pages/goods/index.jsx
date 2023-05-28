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
import style from "./goods.module.scss";
import Pagination from "@/components/pagination";

export const getServerSideProps = async (context) => {
  const mongoURL = process.env.MONGO_URL;
  const ObjectId = require("mongodb").ObjectId;
  let dataGoods = [];
  let dataCategories = [];
  const client = new MongoClient(`${mongoURL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db("energy");
  dataCategories = await db.collection("categories").find({ parent: null }).toArray();

  const { resolvedUrl, query } = context;

  if (resolvedUrl === "/goods") {
    dataGoods = await db.collection("goods").find({}).limit(20).toArray();
  }
  if ("categoryId" in query) {
    dataGoods = await db.collection("goods").find({ categoryId: query.categoryId }).toArray();
  }
  if ("goodsId" in query) {
    if (query.goodsId === "all") {
      dataGoods = await db.collection("goods").find({}).limit(20).toArray();
    } else {
      dataGoods = await db.collection("goods").findOne({ _id: new ObjectId(context.query.goodsId) });
    }
  }

  client.close();

  if (dataCategories.name === "Error" && dataGoods.name === "Error") {
    return { notFound: true };
  }

  return {
    props: {
      categories: JSON.parse(JSON.stringify(dataCategories)),
      goods: JSON.parse(JSON.stringify(dataGoods)),
    },
  };
};

const MainPage = ({ goods, categories }) => {
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
              <Link href="/goods?goodsId=all" onClick={handleClickLink}>
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
            <Pagination searchValue={searchValue} />
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
