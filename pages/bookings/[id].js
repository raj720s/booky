import { getSession } from "next-auth/client";
import React from "react";
import BookingDetails from "../../components/Bookings/BookingDetails";
import Layout from "../../components/layout/layout";
import { getBookingDetails_action } from "../../redux/actions/bookingsActions";
import { StoreWrapper } from "../../redux/store";

function bookingDetails_id() {
  return (
    <Layout title="booking Details">
      <BookingDetails />
    </Layout>
  );
}

export const getServerSideProps = StoreWrapper.getServerSideProps(
  (store) =>
    async ({ req, res, params, ...etc }) => {
      const session = await getSession({ req });
      if (!session) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }
      await store.dispatch(
        getBookingDetails_action(req.headers.cookie, req, params.id)
      );
    }
);

export default bookingDetails_id;
