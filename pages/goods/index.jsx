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
import { getKindSort, setUpKindSort } from "@/store/sortSlice";

const getSortSplit = (str) => {
  const arraySort = str.split("-");
  const field = arraySort[0];
  const sort = arraySort[1] === "asc" ? 1 : -1;

  return { field, sort };
};

const searchAndSortForCategory = async (db, query, skip, pageSize) => {
  const regExpSearch = new RegExp(`${query.search}`, "i");
  const { field, sort } = getSortSplit(query.sort);

  const dataGoods = await db
    .collection("goods")
    .find({ $or: [{ title: regExpSearch }, { description: regExpSearch }], categoryId: query.categoryId })
    .skip(skip)
    .limit(Number(pageSize))
    .sort({ [field]: sort })
    .toArray();
  const totalCount = await db
    .collection("goods")
    .find({ $or: [{ title: regExpSearch }, { description: regExpSearch }], categoryId: query.categoryId })
    .count();

  return { dataGoods, totalCount };
};

const searchForCategory = async (db, query, skip, pageSize) => {
  const regExpSearch = new RegExp(`${query.search}`, "i");
  const dataGoods = await db
    .collection("goods")
    .find({ $or: [{ title: regExpSearch }, { description: regExpSearch }], categoryId: query.categoryId })
    .skip(skip)
    .limit(Number(pageSize))
    .toArray();
  const totalCount = await db
    .collection("goods")
    .find({ $or: [{ title: regExpSearch }, { description: regExpSearch }], categoryId: query.categoryId })
    .count();

  return { dataGoods, totalCount };
};

const sortForCategory = async (db, query, skip, pageSize) => {
  const { field, sort } = getSortSplit(query.sort);
  const dataGoods = await db
    .collection("goods")
    .find({ categoryId: query.categoryId })
    .skip(skip)
    .limit(pageSize)
    .sort({ [field]: sort })
    .toArray();
  const totalCount = await db.collection("goods").find({ categoryId: query.categoryId }).count();

  return { dataGoods, totalCount };
};

const searchAndSortForGoods = async (db, query, skip, pageSize) => {
  const regExpSearch = new RegExp(`${query.search}`, "i");
  const { field, sort } = getSortSplit(query.sort);

  const dataGoods = await db
    .collection("goods")
    .find({ $or: [{ title: regExpSearch }, { description: regExpSearch }] })
    .skip(skip)
    .limit(Number(pageSize))
    .sort({ [field]: sort })
    .toArray();
  const totalCount = await db
    .collection("goods")
    .find({ $or: [{ title: regExpSearch }, { description: regExpSearch }] })
    .count();

  return { dataGoods, totalCount };
};

const searchForGoods = async (db, query, skip, pageSize) => {
  const regExpSearch = new RegExp(`${query.search}`, "i");
  const dataGoods = await db
    .collection("goods")
    .find({ $or: [{ title: regExpSearch }, { description: regExpSearch }] })
    .skip(skip)
    .limit(Number(pageSize))
    .toArray();
  const totalCount = await db
    .collection("goods")
    .find({ $or: [{ title: regExpSearch }, { description: regExpSearch }] })
    .count();

  return { dataGoods, totalCount };
};

const sortForGoods = async (db, query, skip, pageSize) => {
  const { field, sort } = getSortSplit(query.sort);
  const dataGoods = await db
    .collection("goods")
    .find({})
    .skip(skip)
    .limit(Number(pageSize))
    .sort({ [field]: sort })
    .toArray();
  const totalCount = await db.collection("goods").find({}).count();

  return { dataGoods, totalCount };
};

const getDataForGoods = async (db, query, skip, pageSize) => {
  let dataGoods = [];
  let totalCount = 0;

  if ("search" in query && "sort" in query) {
    const result = await searchAndSortForGoods(db, query, skip, pageSize);
    dataGoods = result.dataGoods;
    totalCount = result.totalCount;
  } else if ("search" in query) {
    const result = await searchForGoods(db, query, skip, pageSize);
    dataGoods = result.dataGoods;
    totalCount = result.totalCount;
  } else if ("sort" in query) {
    const result = await sortForGoods(db, query, skip, pageSize);
    dataGoods = result.dataGoods;
    totalCount = result.totalCount;
  } else {
    dataGoods = await db.collection("goods").find({}).skip(skip).limit(Number(pageSize)).toArray();
    totalCount = await db.collection("goods").find({}).count();
  }

  return { dataGoods, totalCount };
};

const getDataForCategory = async (db, query, skip, pageSize) => {
  let dataGoods = [];
  let totalCount = 0;

  if ("search" in query && "sort" in query) {
    const result = await searchAndSortForCategory(db, query, skip, pageSize);
    dataGoods = result.dataGoods;
    totalCount = result.totalCount;
  } else if ("search" in query) {
    const result = await searchForCategory(db, query, skip, pageSize);
    dataGoods = result.dataGoods;
    totalCount = result.totalCount;
  } else if ("sort" in query) {
    const result = await sortForCategory(db, query, skip, pageSize);
    dataGoods = result.dataGoods;
    totalCount = result.totalCount;
  } else {
    dataGoods = await db.collection("goods").find({ categoryId: query.categoryId }).skip(skip).limit(pageSize).toArray();
    totalCount = await db.collection("goods").find({ categoryId: query.categoryId }).count();
  }

  return { dataGoods, totalCount };
};
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

  if ("categoryId" in query) {
    page = Number(query.page);
    skip = (page - 1) * pageSize;

    const result = await getDataForCategory(db, query, skip, pageSize);
    dataGoods = result.dataGoods;
    totalCount = result.totalCount;
  } else if ("goodsId" in query) {
    dataGoods = await db.collection("goods").findOne({ _id: new ObjectId(context.query.goodsId) });
  } else {
    page = Number(query.page);
    skip = (page - 1) * pageSize;

    const result = await getDataForGoods(db, query, skip, pageSize);
    dataGoods = result.dataGoods;
    totalCount = result.totalCount;
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
  return resultUrl;
}

const MainPage = ({ goods, categories, baseUrl, totalCount, pageSize }) => {
  const router = useRouter();

  const dispatch = useDispatch();
  const searchValue = useSelector(getSearchValue());
  const { categoryId, goodsId } = router.query;
  const kindSort = useSelector(getKindSort());
  let goodsList = [];
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

  useEffect(() => {
    dispatch(setSearchValue(""));
    dispatch(setUpKindSort("title-asc"));
  }, [categoryId]);

  const handleChangeSort = (sort) => {
    dispatch(setUpKindSort(sort));

    const { asPath } = router;
    let newPath = deleteURLParams(asPath, "sort");
    newPath += newPath.includes("?") ? `&sort=${sort}` : `?sort=${sort}`;

    router.push(newPath);
  };

  if (!goodsId) {
    goodsList = goods;
  } else {
    goodsItem = goods;
  }

  return (
    <main className={style.main}>
      <Card moreStyle={style.categories}>
        <section>
          <div className={style.container}>
            <h1 className={style.categories__title}>Категории</h1>
            <div className={style["link-all-goods"]}>
              <Link href={`/goods?page=1`}>Все товары</Link>
            </div>
            <Tree treeData={categories} />
          </div>
        </section>
      </Card>
      <section className={style.goods}>
        <Card>
          <div className={style["tools-bar"]}>
            <Search moreStyle={style["tools-search"]} value={searchValue} />
            <Sort onChange={handleChangeSort} value={kindSort} />
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
            {goodsList.length > 0 && <GoodsList list={goodsList} />}
          </>
        )}
      </section>
    </main>
  );
};

export default MainPage;
