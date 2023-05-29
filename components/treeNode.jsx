import { useState } from "react";
import Tree from "./tree";
import style from "../styles/treeNode.module.scss";
import { useEffect } from "react";
import categoriesService from "@/services/categories.service";
import Loading from "./loading";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getSearchValue, setSearchValue } from "@/store/searchSlice";
import { deleteURLParams } from "@/utils/url";

const TreeNode = ({ node }) => {
  const { children, title, _id } = node;
  const searchValue = useSelector(getSearchValue());
  const dispatch = useDispatch();
  const [treeData, setTreeData] = useState([]);
  const [showChildren, setShowChildren] = useState(false);
  const isChildren = children.length > 0;
  const className = isChildren ? "expand-symbol" : "";
  const noExpand = <span>&nbsp;&nbsp;&nbsp;</span>;
  const expand = showChildren ? (
    <div className={style[className]} onClick={handlerExpand}>
      -&nbsp;
    </div>
  ) : (
    <div className={style[className]} onClick={handlerExpand}>
      +&nbsp;
    </div>
  );

  useEffect(() => {
    if (children.length > 0) {
      categoriesService.fetchByArrayId(children).then((resp) => setTreeData(resp.data));
    }
  }, []);

  function handlerExpand() {
    setShowChildren(!showChildren);
  }

  function handlerClickNode() {
    dispatch(setSearchValue(""));
  }

  let renderChildren = null;
  if (showChildren) {
    if (treeData.length > 0) {
      renderChildren = (
        <div className={style["treeNode-children"]}>
          <Tree treeData={treeData} />
        </div>
      );
    } else {
      renderChildren = <Loading />;
    }
  }

  let href = `/goods?categoryId=${_id}&page=1`;
  const newURL = deleteURLParams(href, "search");
  if (searchValue) {
    href = `${newURL}&search=${searchValue}`;
  }

  return (
    <>
      <div className={style.treeNode}>
        {isChildren ? expand : noExpand}
        <Link href={href} onClick={handlerClickNode}>
          {title}
        </Link>
      </div>
      {renderChildren}
    </>
  );
};

export default TreeNode;
