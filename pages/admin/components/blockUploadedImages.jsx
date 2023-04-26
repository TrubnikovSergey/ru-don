import style from "./blockUploadedImages.module.scss";
import UploadedImage from "./uploadedImage";

const BlockUploadedImages = ({ list, handleDelete }) => {
  return (
    <div className={style["uploaded-files"]}>
      {list.map((item) => {
        return <UploadedImage key={item.url} item={item} handleDelete={handleDelete} />;
      })}
    </div>
  );
};

export default BlockUploadedImages;
