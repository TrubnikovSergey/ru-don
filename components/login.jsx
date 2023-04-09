import { actionsLogin, getIsLogin } from "@/store/loginSlice";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import style from "../styles/login.module.scss";

const Login = () => {
  const isLogin = useSelector(getIsLogin());
  const dispatch = useDispatch();

  const handlerLogOut = () => {
    dispatch(actionsLogin.login(false));
  };

  let renderLogin = null;

  if (isLogin) {
    renderLogin = (
      <>
        <Link className={style["header__login-link"]} href="/admin?section=categories">
          <img className={style["setings-img"]} src="/images/gear.svg" alt="Настройки" />
        </Link>
        <Link className={style["header__login-link"]} href="/" onClick={handlerLogOut}>
          <img className={style["log-img"]} src="/images/logout.svg" alt="Выход" />
          <p>Выход</p>
        </Link>
      </>
    );
  } else {
    renderLogin = (
      <>
        <Link className={style["header__login-link"]} href="/auth">
          <img className={style["log-img"]} src="/images/login.svg" alt="Вход" />
          <p>Вход</p>
        </Link>
      </>
    );
  }

  return <div className={style.header__login}>{renderLogin}</div>;
};

export default Login;
