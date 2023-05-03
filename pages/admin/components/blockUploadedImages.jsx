import style from "./blockUploadedImages.module.scss";
import UploadedImage from "./uploadedImage";

const BlockUploadedImages = ({ imagesList = [], handleDelete }) => {
  return (
    <div className={style["uploaded-files"]}>
      {imagesList.map((img) => {
        return <UploadedImage key={img._id} item={img} handleDelete={handleDelete} />;
      })}
    </div>
  );
};

export default BlockUploadedImages;
