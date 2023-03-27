import { useState } from "react";
import style from "./auth.module.scss";

const Login = () => {
  const [data, setData] = useState({ login: "", password: "" });
  console.log("---data---", data);

  const handlerChange = ({ target }) => {
    const { name, value } = target;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handlerSubmit = () => {
    setData({ login: "", password: "" });
    console.log("submit");
  };

  return (
    <div className={style.auth}>
      <div className={style.container}>
        <p>login</p>
        <input className={style.input} type="text" name="login" value={data.login} onChange={handlerChange} />
        <p>password</p>
        <input className={style.input} type="password" name="password" value={data.password} onChange={handlerChange} />
        <div className={style["submit-auth__button"]} onClick={handlerSubmit}>
          Login
        </div>
      </div>
    </div>
  );
};

export default Login;
