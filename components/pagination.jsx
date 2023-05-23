import { useSelector } from "react-redux";
import _ from "lodash";
import { getGoodsPageSize, getGoodsTotalCount } from "@/store/goodsSlice";
import style from "../styles/pagination.module.scss";

const Pagination = ({ currentPage, onChangePage, children }) => {
  const totalCount = useSelector(getGoodsTotalCount());
  const pageSize = useSelector(getGoodsPageSize());

  const countPages = Math.ceil(totalCount / pageSize);
  const arrayPagesNumber = _.range(1, countPages + 1);

  const handleChangePage = (e) => {
    onChangePage(Number(e.target.value));
  };

  const handleLeftClick = () => {
    const newNumber = Number(currentPage) - 1;
    if (newNumber > 0) onChangePage(newNumber);
  };
  const handleRightClick = () => {
    const newNumber = Number(currentPage) + 1;
    if (newNumber <= countPages) onChangePage(newNumber);
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
