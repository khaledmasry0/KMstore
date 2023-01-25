import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Header from "../components/Header";
import { ProductsContextProvider } from "../components/ProductContext";
import Head from "next/head";
import Footer from "../components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <ProductsContextProvider>
      <Head>
        <title>DMstore</title>
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ProductsContextProvider>
  );
}
