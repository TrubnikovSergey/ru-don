import { getIsLogin, actionsLogin } from "@/store/loginSlice";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import style from "../styles/login.module.scss";

const Login = () => {
  const isLogin = useSelector(getIsLogin());
  const dispatch = useDispatch();

  const handlerLogInLogOut = () => {
    dispatch(actionsLogin.login(!isLogin));
  };

  let renderLogin = null;

  if (isLogin) {
    renderLogin = (
      <>
        <Link className={style["header__login-link"]} href="/admin">
          <img className={style["setings-img"]} src="/images/gear.svg" alt="Настройки" />
        </Link>
        <Link className={style["header__login-link"]} href="/" onClick={handlerLogInLogOut}>
          <img className={style["log-img"]} src="/images/logout.svg" alt="Выход" />
          <p>Выход</p>
        </Link>
      </>
    );
  } else {
    renderLogin = (
      <>
        <Link className={style["header__login-link"]} href="/auth" onClick={handlerLogInLogOut}>
          <img className={style["log-img"]} src="/images/login.svg" alt="Вход" />
          <p>Вход</p>
        </Link>
      </>
    );
  }

  return <div className={style.header__login}>{renderLogin}</div>;
};

export default Login;
