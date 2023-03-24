import Layout from "@/components/Layout";
import "@/styles/globals.scss";

const App = ({ Component, pageProps }) => {
  return (
    <div className="wrapper">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
};

export default App;
