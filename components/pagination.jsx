import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { fatchAllGoods, getGoodsPageSize, getGoodsTotalCount } from "@/store/goodsSlice";
import style from "../styles/pagination.module.scss";
import { useState } from "react";
import { useEffect } from "react";
import { getIsLoading } from "@/store/categoriesSlice";

const Pagination = ({ searchValue, categoryId, children }) => {
  const dispatch = useDispatch();
  const totalCount = useSelector(getGoodsTotalCount());
  const pageSize = useSelector(getGoodsPageSize());
  const [currentPage, setCurrentPage] = useState(1);
  const countPages = Math.ceil(totalCount / pageSize);
  const arrayPagesNumber = _.range(1, countPages + 1);

  useEffect(() => {
    changePage(1);
  }, [searchValue, categoryId]);

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
            <li className={style["arrow-left"]} onClick={handleLeftClick}>
              &#9668;
            </li>
            {arrayPagesNumber.map((item) => {
              const classLi = `${style.item} ${item === currentPage && style.active}`;

              return (
                <li key={item} className={classLi} onClick={handleChangePage} value={item}>
                  {item}
                </li>
              );
            })}
            <li className={style["arrow-right"]} onClick={handleRightClick}>
              &#9658;
            </li>
          </ul>
        </div>
      </div>
      {children}
    </>
  );
};

export default Pagination;
