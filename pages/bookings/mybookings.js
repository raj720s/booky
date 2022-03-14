import { getSession } from "next-auth/client";
import React, { useEffect } from "react";
import MyBookings from "../../components/Bookings/MyBookings";
import Layout from "../../components/layout/layout";

import { getMybookings_action } from "../../redux/actions/bookingsActions";

import { StoreWrapper } from "../../redux/store";

function mybookings() {
  return (
    <Layout>
      <MyBookings />
    </Layout>
  );
}

export const getServerSideProps = StoreWrapper.getServerSideProps(
  (store) =>
    async ({ req, res, params, ...etc }) => {
      // await store.dispatch(getRoomDetailsAction(req, params.id));
      const session = await getSession({ req });

      if (!session) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }
      await store.dispatch(getMybookings_action(req.headers.cookie, req));
    }
);

export default mybookings;
