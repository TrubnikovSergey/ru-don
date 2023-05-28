import _ from "lodash";
import Link from "next/link";
import style from "../styles/pagination.module.scss";

const PaginationWithLink = ({ totalCount, sizePage }) => {
  const countPages = Math.ceil(totalCount / sizePage);
  const arrayNumber = _.range(1, countPages + 1);

  return (
    // <>
    //   <div className={style["wrapper-paginate"]}>
    //     <div className={style["pagination-container"]}>
    //       <div className={style["list-numbers"]}>
    //         <Link className={style["arrow-left"]} onClick={handleLeftClick}>
    //           &#9668;
    //         </Link>
    //         {arrayPagesNumber.map((item) => {
    //           const classLi = `${style.item} ${item === currentPage && style.active}`;

    //           return (
    //             <Link key={item} className={classLi} onClick={handleChangePage} value={item}>
    //               {item}
    //             </Link>
    //           );
    //         })}
    //         <Link className={style["arrow-right"]} onClick={handleRightClick}>
    //           &#9658;
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    //   {children}
    // </>
  );
};

export default PaginationWithLink;
