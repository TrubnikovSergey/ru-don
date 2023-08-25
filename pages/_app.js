import Layout from "@/components/Layout";
import "@/styles/globals.scss";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "../store";
import Head from "next/head";

const App = ({ Component, pageProps }) => {
  return (
    <div className="wrapper">
      <Head>
        <title>Ру-Дон - поставки оборудования</title>
        <meta name="description" content="Комплексные поставки промышленного и электротехнического оборудования, расходных и сопутствующих товаров." />
        <meta name="keywords" content="Комплексные поставки промышленного и электротехнического оборудования, расходных и сопутствующих товаров." />
      </Head>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
      </Provider>
    </div>
  );
};

export default App;
