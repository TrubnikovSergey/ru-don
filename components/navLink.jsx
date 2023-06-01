import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getCategories } from "@/store/categoriesSlice";
import { getGoods } from "@/store/goodsSlice";
import configJSON from "../config.json";
import style from "../styles/navLink.module.scss";

function isActive(router, href, className, children, categoriesList, goodsList) {
  let classForLink = router.asPath === href ? `${className} ${style.active}` : `${className}`;
  let { categoryId, goodsId } = router.query;
  const { pathname } = router;
  const titleLink = children;
  const isAll = !categoryId && !goodsId;
  let isCategory = Boolean(categoryId) && href.includes(categoryId);
  const isGoods = Boolean(goodsId);

  if (pathname === "/goods") {
    if (titleLink === "Товары и услуги") {
      return `${className} ${style.active}`;
    } else {
      if (isAll) {
        if (titleLink === "Все товары") {
          return `${className} ${style.active}`;
        }
      } else if (isCategory) {
        return `${className} ${style.active}`;
      } else if (isGoods) {
        const goods = goodsList.find((item) => item._id === goodsId);
        const categoryURL = new URL(`${configJSON.HOST}${href}`);
        categoryId = categoryURL.searchParams.get("categoryId");

        if (categoryId && goods && categoryId === goods.categoryId) {
          return `${className} ${style.active}`;
        }
        return `${className}`;
      }
    }
  }

  return classForLink;
}

const NavLink = ({ href, children, className, ...props }) => {
  const router = useRouter();
  const categoriesList = useSelector(getCategories());
  const goodsList = useSelector(getGoods());
  const classLink = isActive(router, href, className, children, categoriesList, goodsList);

  return (
    <Link href={href} className={classLink} {...props}>
      {children}
    </Link>
  );
};

export default NavLink;
