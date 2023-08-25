import _ from "lodash";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { deleteURLParams } from "@/utils/url";
import { calculatePaginateRange } from "@/utils/pagination";
import configJSON from "../config.json";
import style from "../styles/pagination.module.scss";
import { useSelector } from "react-redux";
import { getGoodsPageSize } from "@/store/goodsSlice";

const PaginationWithdiv = ({ baseUrl, totalCount, sizePage, searchValue }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const paginationSize = configJSON.paginationSize;
  const pageSize = useSelector(getGoodsPageSize());
  const countPages = Math.ceil(totalCount / pageSize);
  const { start, end } = calculatePaginateRange(currentPage, paginationSize, countPages);
  const arrayPagesNumber = _.range(start, end);

  useEffect(() => {
    let url = baseUrl.includes("?") ? `${baseUrl}&page=${currentPage}` : `${baseUrl}?page=${currentPage}`;

    if (searchValue) {
      url += `&search=${searchValue}`;
    }
    router.push(url);
  }, [currentPage, searchValue]);

  const handleClickArrow = (page) => {
    const newPage = currentPage + page;

    if (newPage <= countPages && newPage >= 1) {
      setCurrentPage(newPage);
    }
  };
  const handleClickItem = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {countPages > 0 && (
        <div className={style["wrapper-paginate"]}>
          <div className={style["pagination-container"]}>
            <ul className={style["list-numbers"]}>
              {currentPage > paginationSize && "..."}
              <li className={style["arrow-left"]} onClick={() => handleClickArrow(-1)}>
                &#9668;
              </li>
              {arrayPagesNumber.map((item) => {
                const classLi = `${style.item} ${item === currentPage ? style.active : ""}`;

                return (
                  <li key={item} className={classLi} value={item} onClick={() => handleClickItem(item)}>
                    {item}
                  </li>
                );
              })}
              <li className={style["arrow-right"]} onClick={() => handleClickArrow(1)}>
                &#9658;
              </li>
              {currentPage < countPages && countPages > paginationSize && "..."}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default PaginationWithdiv;
