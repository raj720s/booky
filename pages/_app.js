import { StoreWrapper } from "../redux/store";
import withRedux from "next-redux-wrapper";
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default StoreWrapper.withRedux(MyApp);
