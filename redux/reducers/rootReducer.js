import { combineReducers } from "redux";
import {
  bookedDatesReducer,
  bookingDetailsReducer,
  bookingReducer,
  checkBookingReducer,
  MybookingsReducer,
} from "./BookingReducer";
import {
  activeRoomReducer,
  allRoomsReducer,
  checkReviewReducer,
  newReviewReducer,
  newRoomReducer,
  reviewReducer,
  roomDetailsReducer,
  roomReviewsReducer,
} from "./Roomsredcer";
import {
  allUsersReducer,
  currentuserProfileReducer,
  forgotpasswordReducer,
  loadUserReducer,
  userAuthReducer,
  userDetailsReducer,
} from "./userReducer";

const rootReducer = combineReducers({
  allRooms: allRoomsReducer,
  roomDetails: roomDetailsReducer,
  auth: userAuthReducer,
  loadedUser: loadUserReducer,
  user: currentuserProfileReducer,
  userDetails: userDetailsReducer,
  allUsers: allUsersReducer,
  forgotPassword: forgotpasswordReducer,
  checkBooking: checkBookingReducer,
  booking: bookingReducer,
  bookingDetails: bookingDetailsReducer,
  bookedDates: bookedDatesReducer,
  bookings: MybookingsReducer,
  // room reviews
  newReview: newReviewReducer,
  checkReview: checkReviewReducer,
  roomReviews: roomReviewsReducer,
  review: reviewReducer,
});

export default rootReducer;
