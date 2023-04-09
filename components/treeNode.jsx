import { useState } from "react";
import Tree from "./tree";
import style from "../styles/treeNode.module.scss";
import { useEffect } from "react";
import categoriesService from "@/services/categories.service";
import Loading from "./loading";
import Link from "next/link";

const TreeNode = ({ node }) => {
  const { children, title, _id } = node;
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
      categoriesService.fetchByArrayId(children).then((data) => setTreeData(data));
    }
  }, []);

  function handlerExpand() {
    setShowChildren(!showChildren);
  }

  function handlerClickNode() {}

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
        <Link href={`/goods?categoryId=${_id}`}>{title}</Link>
      </div>
      {renderChildren}
    </>
  );
};

export default TreeNode;
