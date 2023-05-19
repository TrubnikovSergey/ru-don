import { MongoClient } from "mongodb";
import Tree from "@/components/tree";
import { useRouter } from "next/router";
import Link from "next/link";
import GoodsList from "./goodsList";
import Card from "@/components/card";
import GoodsPage from "./goodsPage";
import style from "./goods.module.scss";
import Search from "@/components/search";
import { useState } from "react";
import Sort from "@/components/sort";
import { useDispatch, useSelector } from "react-redux";
import { getKindSort, setKindSort } from "@/store/sortSlice";
import { sortGoods } from "@/utils/sort";

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

  if (context.resolvedUrl === "/goods") {
    dataGoods = await db.collection("goods").find({}).limit(20).toArray();
  }
  if ("categoryId" in context.query) {
    dataGoods = await db.collection("goods").find({ categoryId: context.query.categoryId }).toArray();
  }
  if ("goodsId" in context.query) {
    dataGoods = await db.collection("goods").findOne({ _id: new ObjectId(context.query.goodsId) });
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

function filterGoodsByCategory(goodsList, categoryId, searchValue) {
  const newList = goodsList.filter((item) => {
    if (searchValue) {
      return item.categoryId === categoryId && (String(item.title).includes(searchValue) || String(item.description).includes(searchValue));
    } else {
      return item.categoryId === categoryId;
    }
  });

  return newList;
}

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

  const handleSearch = (searchData) => {
    setSearchValue(searchData);
  };

  const handleClickLink = () => {
    setToggle((prev) => !prev);
  };

  const handleChange = (sort) => {
    dispatch(setKindSort(sort));
  };

  if (goodsId) {
    goodsItem = goods;
  } else {
    foundGoods = goods.filter((item) => (searchValue ? String(item.title).includes(searchValue) || String(item.description).includes(searchValue) : true));

    goodsList = sortGoods(foundGoods, kindSort);
  }

  return (
    <main className={style.main}>
      <Card moreStyle={style.categories}>
        <section>
          <div className={style.container}>
            <h1 className={style.categories__title}>Категории</h1>
            <div className={style["link-all-goods"]}>
              <Link href="/goods" onClick={handleClickLink}>
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
            <Search onSearch={handleSearch} />
            <Sort onChange={handleChange} />
          </div>
        </Card>
        {goodsItem && <GoodsPage item={goodsItem} />}
        {goodsList && <GoodsList list={goodsList} />}
      </section>
    </main>
  );
};

export default MainPage;
