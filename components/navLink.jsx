import Link from "next/link";
import style from "../styles/navLink.module.scss";
import { useRouter } from "next/router";

function isActive(router, href, className, children) {
  let classForLink = router.asPath === href ? `${className} ${style.active}` : `${className}`;
  let { categoryId, goodsId } = router.query;
  const { pathname } = router;
  const titleLink = children;
  const isAll = !categoryId && !goodsId;
  let isCategory = Boolean(categoryId) && href.includes(categoryId);
  const isGoods = Boolean(goodsId);

  //   router.pathname === href ? `${className} ${style.active}` : `${className}`;

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
      } // else if (isGoods) {
      //   const goods = await goodsService.getGoodsById(router.query.goodsId);
      //   if (router.query.categoryId && router.query.categoryId === goods.categoryId) {
      //     return `${className} ${style.active}`;
      //   }
      // }
    }
  }

  return classForLink;
}

const NavLink = ({ href, children, className, ...props }) => {
  const router = useRouter();
  const classLink = isActive(router, href, className, children);

  return (
    <Link href={href} className={classLink} {...props} onClick={() => console.log("---------------", { router, href })}>
      {children}
    </Link>
  );
};

export default NavLink;
