import style from "./goods.module.scss";
import { MongoClient } from "mongodb";
import Tree from "@/components/tree";
import { useRouter } from "next/router";
import Link from "next/link";
import GoodsList from "./goodsList";
import Card from "@/components/card";
import GoodsPage from "./goodsPage";

export const getServerSideProps = async () => {
  const mongoURL = process.env.MONGO_URL;
  const client = new MongoClient(`${mongoURL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const req = client.db("energy");
  let dataCategories = await req.collection("categories").find({ parent: null }).toArray();
  let dataGoods = await req.collection("goods").find({}).toArray();

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

function filterGoodsByCategory(goodsList, categoryId) {
  const newList = goodsList.filter((item) => item.categoryId === categoryId);

  return newList;
}

const MainPage = ({ goods, categories }) => {
  const router = useRouter();
  const { categoryId, goodsId } = router.query;
  let goodsList = null;
  let goodsItem = null;

  if (goodsId) {
    goodsItem = goods.find((el) => el._id === goodsId);
  }

  if (categoryId) {
    goodsList = filterGoodsByCategory(goods, categoryId);
  } else {
    goodsList = goods;
  }

  return (
    <main className={style.main}>
      <Card moreStyle={style.categories}>
        <section>
          <div className={style.container}>
            <h1 className={style.categories__title}>Категории</h1>
            <div className={style["link-all-goods"]}>
              <Link href="/goods"> Все товары</Link>
            </div>
            <Tree treeData={categories} />
          </div>
        </section>
      </Card>
      <section className={style.goods}>
        <Card moreStyle={style["tools-bar"]}>
          <div className={style.search}>
            <input className={style.search__input} type="text" />
            <button className={style.search__button}>Поиск</button>
          </div>
          <section className={style.sort}>варианты сортировки</section>
        </Card>
        {goodsId ? goodsItem && <GoodsPage item={goodsItem} /> : goodsList && <GoodsList goodsList={goodsList} />}
      </section>
    </main>
  );
};

export default MainPage;
