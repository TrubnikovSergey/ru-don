import style from "../styles/layout.module.scss";
import Navbar from "./Navbar";
import Card from "./card";

const Layout = ({ children }) => {
  return (
    <>
      <div className={style.container}>
        <div className={style.root}>
          <header>
            <Card moreStyle={style.header}>
              <Navbar />
            </Card>
          </header>
          {children}
          <footer className={style.footer}>footer</footer>
        </div>
      </div>
    </>
  );
};

export default Layout;
