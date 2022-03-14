import { bookingTypes } from "../Actiontypes";

export const checkBookingReducer = (state = { avaliable: null }, action) => {
  switch (action.type) {
    case bookingTypes.CHECK_BOOKING_REQUEST:
      return {
        loading: true,
      };

    case bookingTypes.CHECK_BOOKING_SUCCESS:
      return {
        loading: false,
        available: action.payload,
      };

    case bookingTypes.CHECK_BOOKING_RESET:
      return {
        loading: false,
        available: null,
      };

    case bookingTypes.CHECK_BOOKING_FAIL:
      return {
        loading: false,
        error: action.payload,
        avaliable: null,
      };

    case bookingTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Get all booked dates
export const bookedDatesReducer = (state = { dates: [] }, action) => {
  switch (action.type) {
    case bookingTypes.BOOKED_DATES_SUCCESS:
      return {
        loading: false,
        dates: action.payload,
      };

    case bookingTypes.BOOKED_DATES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case bookingTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
// get all my bookings and  admin  bookings reducer
export const MybookingsReducer = (state = { bookings: [] }, action) => {
  // console.log(action.type);
  switch (action.type) {
    case bookingTypes.ADMIN_BOOKINGS_REQUEST:
      return {
        loading: true,
      };

    case bookingTypes.MY_BOOKINGS_SUCCESS:
      // case bookingTypes.ADMIN_BOOKINGS_SUCCESS:
      return {
        loading: false,
        bookings: action.payload,
      };

    case bookingTypes.MY_BOOKINGS_FAIL:
    case bookingTypes.ADMIN_BOOKINGS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case bookingTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const bookingDetailsReducer = (state = { booking: {} }, action) => {
  switch (action.type) {
    case bookingTypes.BOOKING_DETAILS_SUCCESS:
      return {
        loading: false,
        booking: action.payload,
      };

    case bookingTypes.BOOKING_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case bookingTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const bookingReducer = (state = {}, action) => {
  switch (action.type) {
    case bookingTypes.DELETE_BOOKING_REQUEST:
      return {
        loading: true,
      };

    case bookingTypes.DELETE_BOOKING_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case bookingTypes.DELETE_BOOKING_RESET:
      return {
        loading: false,
        isDeleted: false,
      };

    case bookingTypes.DELETE_BOOKING_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case bookingTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
