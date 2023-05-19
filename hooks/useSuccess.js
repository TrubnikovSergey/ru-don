import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const useSuccess = (success, id, clearFunc) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (success.length > 0) {
      const findItem = success.find((el) => el._id === id);
      if (findItem) {
        toast.success(findItem.message);
        dispatch(clearFunc(id));
      }
    }
  }, [success]);
};

export default useSuccess;
