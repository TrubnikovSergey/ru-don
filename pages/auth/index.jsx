import { useState } from "react";
import style from "./auth.module.scss";
import { useDispatch } from "react-redux";
import { actionsLogin } from "@/store/loginSlice";
import { useRouter } from "next/router";
import Card from "@/components/card";

const Login = () => {
  const [data, setData] = useState({ login: "", password: "" });
  const dispatch = useDispatch();
  const router = useRouter();

  const handlerChange = ({ target }) => {
    const { name, value } = target;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handlerSubmit = () => {
    setData({ login: "", password: "" });
    if (data.login === "admin" && data.password === "admin") {
      dispatch(actionsLogin.login(true));
      router.push("/");
    }
  };

  return (
    <div className={style.auth}>
      <div>
        <Card moreStyle={style.container}>
          <p>login</p>
          <input className={style.input} type="text" name="login" value={data.login} onChange={handlerChange} />
          <p>password</p>
          <input className={style.input} type="password" name="password" value={data.password} onChange={handlerChange} />
          <div className={style["submit-auth__button"]} onClick={handlerSubmit}>
            Login
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
