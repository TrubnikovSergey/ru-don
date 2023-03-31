import TreeNode from "./treeNode";
import style from "../styles/tree.module.scss";

const Tree = ({ treeData }) => {
  return (
    <div className={style.tree}>
      {treeData.map((node) => (
        <TreeNode node={node} key={node._id} />
      ))}
    </div>
  );
};

export default Tree;
