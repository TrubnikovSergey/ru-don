import Layout from "@/components/Layout";
import "@/styles/globals.scss";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "../store";

const App = ({ Component, pageProps }) => {
  return (
    <div className="wrapper">
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
