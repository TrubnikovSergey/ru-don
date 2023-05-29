import _ from "lodash";
import style from "../styles/pagination.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { deleteURLParams } from "@/utils/url";

const PaginationWithdiv = ({ baseUrl, totalCount, sizePage, searchValue }) => {
  const router = useRouter();
  const countPages = Math.ceil(totalCount / sizePage);
  const arrayNumber = _.range(1, countPages + 1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let url = `${baseUrl}?page=${currentPage}`;

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
      <div className={style["wrapper-paginate"]}>
        <div className={style["pagination-container"]}>
          <ul className={style["list-numbers"]}>
            <li className={style["arrow-left"]} onClick={() => handleClickArrow(-1)}>
              &#9668;
            </li>
            {arrayNumber.map((item) => {
              const classLi = `${style.item} ${item === currentPage ? style.active : ""}`;

              return (
                <li key={item} className={classLi} value={item} onClick={() => handleClickItem(item)}>
                  {item}
                </li>
              );
            })}
            <div className={style["arrow-right"]} onClick={() => handleClickArrow(1)}>
              &#9658;
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default PaginationWithdiv;
