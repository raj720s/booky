import Layout from "../../components/layout/layout";
import RoomDetails from "../../components/room/roomDetails";
import { getRoomDetailsAction } from "../../redux/actions/roomsAction";
import { StoreWrapper } from "../../redux/store";

const RoomDetailsPage = () => {
  return (
    <Layout>
      <RoomDetails title="room details" />
    </Layout>
  );
};

export const getServerSideProps = StoreWrapper.getServerSideProps(
  (store) =>
    async ({ req, res, params, ...etc }) => {
      await store.dispatch(getRoomDetailsAction(req, params.id));
    }
);

export default RoomDetailsPage;
