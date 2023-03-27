import Layout from "@/components/Layout";
import "@/styles/globals.scss";
import { Provider } from "react-redux";
import store from "../store";

const App = ({ Component, pageProps }) => {
  return (
    <div className="wrapper">
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </div>
  );
};

export default App;
