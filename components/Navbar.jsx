import Login from "./login";
import Menu from "./menu";
import style from "../styles/navBar.module.scss";

const Navbar = () => {
  return (
    <nav className={style.navBar}>
      <Menu />
      <Login />
    </nav>
  );
};

export default Navbar;
