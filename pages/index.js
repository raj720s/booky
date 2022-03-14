import { connect } from "react-redux";
import HomePage from "../components/HomePage";
import Layout from "../components/layout/layout";
import { getRoomsAction } from "../redux/actions/roomsAction";
import { roomTypes } from "../redux/Actiontypes";
import { StoreWrapper } from "../redux/store";

const Home = () => {
  return (
    <Layout>
      <HomePage />
    </Layout>
  );
};

export const getServerSideProps = StoreWrapper.getServerSideProps(
  (store) =>
    async ({ req, res, query, ...etc }) => {
      await store.dispatch(
        getRoomsAction(
          req,
          query.page,
          query.location,
          query.guests,
          query.category
        )
      );
    }
);

export default Home;
