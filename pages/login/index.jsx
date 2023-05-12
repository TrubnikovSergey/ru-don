import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Card from "@/components/card";
import InputField from "@/components/inputField";
import { isAuth, isSignInLoading, signIn } from "../../store/authSlice";
import configJSON from "../../config.json";
import style from "./auth.module.scss";
import Loading from "@/components/loading";

const Login = () => {
  const [data, setData] = useState({ login: "", password: "" });
  const isLogin = useSelector(isAuth());
  const isLoading = useSelector(isSignInLoading());
  const dispatch = useDispatch();
  const router = useRouter();

  if (isLogin) {
    router.replace(`${configJSON.HOST}/admin`);
  }

  const handlerChange = ({ target }) => {
    const { name, value } = target;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handlerSubmit = () => {
    dispatch(signIn(data));
    setData({ email: "", password: "" });
  };

  return !isLoading && !isLogin ? (
    <div className={style.auth}>
      <form onSubmit={handlerSubmit}>
        <Card moreStyle={style.container}>
          <InputField moreStyle={style.input} label="login" type="text" name="email" value={data.email} onChange={handlerChange} />
          <InputField moreStyle={style.input} label="password" type="password" name="password" value={data.password} onChange={handlerChange} />
          <div className={style["submit-auth__button"]} onClick={handlerSubmit}>
            Login
          </div>
        </Card>
      </form>
    </div>
  ) : (
    <Loading />
  );
};

export default Login;
