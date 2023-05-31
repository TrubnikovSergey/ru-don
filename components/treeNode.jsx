import { useState } from "react";
import Tree from "./tree";
import { useEffect } from "react";
import categoriesService from "@/services/categories.service";
import Loading from "./loading";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getSearchValue, setSearchValue } from "@/store/searchSlice";
import { deleteURLParams } from "@/utils/url";
import { setUpKindSort } from "@/store/sortSlice";
import { useRouter } from "next/router";
import style from "../styles/treeNode.module.scss";

const TreeNode = ({ node }) => {
  const router = useRouter();
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

  return (
    <>
      <div className={style.treeNode}>
        {isChildren ? expand : noExpand}
        <Link href={`/goods?categoryId=${_id}&page=1`}>{title}</Link>
      </div>
      {renderChildren}
    </>
  );
};

export default TreeNode;
