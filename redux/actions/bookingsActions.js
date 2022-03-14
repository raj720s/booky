import axios from "axios";
import absoluteUrl from "next-absolute-url";
import { bookingTypes } from "../Actiontypes";

export const checkBookingAction =
  (roomId, checkInDate, checkOutDate) => async (dispatch) => {
    console.log(roomId, checkInDate, checkOutDate);
    try {
      dispatch({ type: bookingTypes.CHECK_BOOKING_REQUEST });
      let link = `/api/bookings/check?roomId=${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`;

      const res = await axios.get(link);
      // console.log(res.data);
      dispatch({
        type: bookingTypes.CHECK_BOOKING_SUCCESS,
        payload: res.data.vacancy,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: bookingTypes.CHECK_BOOKING_FAIL,
        payload: error,
      });
    }
  };

export const getBookedDatesAction = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/bookings/check_dates?roomId=${id}`);
    dispatch({
      type: bookingTypes.BOOKED_DATES_SUCCESS,
      payload: res.data.bookedDates,
    });
  } catch (error) {
    dispatch({
      type: bookingTypes.BOOKED_DATES_FAIL,
      payload: error.response.data.message,
    });
  }
};

// export const getMybookings_action = (authCookie, req) => async (dispatch) => {
//   try {
//     // console.log(authCookie, req);
//     dispatch({
//       type: bookingTypes.ADMIN_BOOKINGS_REQUEST,
//     });
//     const { origin } = absoluteUrl(req);
//     const config = {
//       headers: {
//         cookie: authCookie,
//       },
//     };

//     const res = await axios.get(`${origin}/api/bookings/my_bookings`, config);

//     dispatch({
//       type: bookingTypes.MY_BOOKINGS_SUCCESS,
//       payload: res.data.mybookings,
//     });
//   } catch (error) {
//     console.log(error);
//     dispatch({
//       type: bookingTypes.MY_BOOKINGS_FAIL,
//       payload: error.message,
//     });
//   }
// };
export const getMybookings_action = (authCookie, req) => async (dispatch) => {
  try {
    // console.log(authCookie, req);
    dispatch({
      type: bookingTypes.ADMIN_BOOKINGS_REQUEST,
    });
    const { origin } = absoluteUrl(req);
    const config = {
      headers: {
        cookie: authCookie,
      },
    };

    const res = await axios.get(`${origin}/api/bookings/my_bookings`, config);

    dispatch({
      type: bookingTypes.MY_BOOKINGS_SUCCESS,
      payload: res.data.mybookings,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: bookingTypes.MY_BOOKINGS_FAIL,
      payload: error.message,
    });
  }
};

export const getBookingDetails_action =
  (authCookie, req, id) => async (dispatch) => {
    try {
      // console.log(id);
      const { origin } = absoluteUrl(req);
      const config = {
        headers: {
          cookie: authCookie,
        },
      };
      const res = await axios.get(`${origin}/api/bookings/${id}`, config);
      console.log(res.data);
      dispatch({
        type: bookingTypes.BOOKING_DETAILS_SUCCESS,
        payload: res.data.booking,
      });
    } catch (error) {
      dispatch({
        type: bookingTypes.BOOKING_DETAILS_FAIL,
        payload: error.message,
      });
    }
  };

// Clear Errors
export const clear_booking_errors = () => async (dispatch) => {
  dispatch({
    type: bookingTypes.CLEAR_ERRORS,
  });
};
