import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { fatchAllGoods, getGoodsPageSize, getGoodsTotalCount } from "@/store/goodsSlice";
import { useState } from "react";
import { useEffect } from "react";
import { getIsLoading } from "@/store/categoriesSlice";
import configJSON from "../config.json";
import style from "../styles/pagination.module.scss";
import { calculatePaginateRange } from "@/utils/pagination";

const Pagination = ({ searchValue, categoryId, children }) => {
  const dispatch = useDispatch();
  const totalCount = useSelector(getGoodsTotalCount());
  const pageSize = useSelector(getGoodsPageSize());
  const paginationSize = configJSON.paginationSize;
  const [currentPage, setCurrentPage] = useState(1);
  const countPages = Math.ceil(totalCount / pageSize);
  const { start, end } = calculatePaginateRange(currentPage, paginationSize, countPages);
  const arrayPagesNumber = _.range(start, end);

  const changePage = (numberPage) => {
    setCurrentPage(numberPage);
    dispatch(fatchAllGoods({ numberPage, searchValue, categoryId }));
  };

  const handleChangePage = (e) => {
    changePage(Number(e.target.value));
  };

  const handleLeftClick = () => {
    const newNumber = Number(currentPage) - 1;
    if (newNumber > 0) changePage(newNumber);
  };
  const handleRightClick = () => {
    const newNumber = Number(currentPage) + 1;
    if (newNumber <= countPages) changePage(newNumber);
  };
  return (
    <>
      <div className={style["wrapper-paginate"]}>
        <div className={style["pagination-container"]}>
          <ul className={style["list-numbers"]}>
            {currentPage > paginationSize && "..."}
            <li className={style["arrow-left"]} onClick={handleLeftClick}>
              &#9668;
            </li>
            {arrayPagesNumber.map((item) => {
              const classLi = `${style.item} ${item === currentPage ? style.active : ""}`;

              return (
                <li key={item} className={classLi} onClick={handleChangePage} value={item}>
                  {item}
                </li>
              );
            })}
            <li className={style["arrow-right"]} onClick={handleRightClick}>
              &#9658;
            </li>
            {currentPage < countPages && countPages > paginationSize && "..."}
          </ul>
        </div>
      </div>
      {children}
    </>
  );
};

export default Pagination;
