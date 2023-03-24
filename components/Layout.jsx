import style from "../styles/layout.module.scss";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <div className={style.container}>
        <div className={style.root}>
          <header className={style.header}>
            <Navbar />
          </header>
          {children}
          <footer className={style.footer}>footer</footer>
        </div>
      </div>
    </>
  );
};

export default Layout;
