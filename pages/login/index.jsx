import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Card from "@/components/card";
import InputField from "@/components/inputField";
import { isAuth, isSignInLoading, signIn } from "../../store/authSlice";
import configJSON from "../../config.json";
import { toast } from "react-toastify";
import style from "./auth.module.scss";
import Loading from "@/components/loading";
import { getErrors } from "@/store/authSlice";
import { useEffect } from "react";
import Head from "next/head";

const Login = () => {
  const [data, setData] = useState({ login: "", password: "" });
  const isLogin = useSelector(isAuth());
  const errors = useSelector(getErrors());
  const isLoading = useSelector(isSignInLoading());
  const dispatch = useDispatch();
  const router = useRouter();

  if (isLogin) {
    router.replace(`${configJSON.HOST}/admin`);
  }

  useEffect(() => {
    if (errors.length > 0) {
      toast.error(errors[0].message);
    }
  }, [errors]);

  const handlerChange = ({ target }) => {
    const { name, value } = target;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handlerSubmit = () => {
    dispatch(signIn(data));
  };

  return (
    <>
      <Head>
        <title>Страница входа</title>
      </Head>
      {!isLoading && !isLogin ? (
        <div className={style.auth}>
          <form onSubmit={handlerSubmit}>
            <Card moreStyle={style.container}>
              <InputField moreStyle={style.input} label="login" type="text" name="email" value={data.email} onChange={handlerChange} />
              <InputField moreStyle={style.input} label="password" type="password" name="password" value={data.password} onChange={handlerChange} />
              <button className={style["submit-auth__button"]} type="submit">
                Login
              </button>
            </Card>
          </form>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Login;
