import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "../redux/store";
import Layout from "../components/Layout";
import { loadCartFromStorage } from "../redux/cartSlice";
import "../styles/globals.css";

// Custom wrapper to load cart from localStorage
const CartInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedCart = localStorage.getItem("pizza_cart");
    if (savedCart) {
      dispatch(loadCartFromStorage(JSON.parse(savedCart)));
    }
  }, []);

  return children;
};

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <CartInitializer>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartInitializer>
    </Provider>
  );
}

export default MyApp;
