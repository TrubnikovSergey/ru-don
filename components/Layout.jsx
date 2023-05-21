import Navbar from "./Navbar";
import Card from "./card";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "./loading";
import style from "../styles/layout.module.scss";

const Layout = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = (r) => {
      if (r === "/goods") {
        setLoading(true);
      }
    };
    const end = () => {
      setLoading(false);
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <>
      <div className={style.container}>
        <div className={style.root}>
          <header>
            <Card moreStyle={style.header}>
              <Navbar />
            </Card>
          </header>
          {loading ? (
            <div className={style["wrapper-loading"]}>
              <Loading />
            </div>
          ) : (
            children
          )}
          <footer className={style.footer}>footer</footer>
        </div>
      </div>
    </>
  );
};

export default Layout;
