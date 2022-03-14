import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { clearErrorsAction } from "../../redux/actions/roomsAction";
import Head from "next/head";
import Image from "next/image";
import { Button, Carousel } from "react-bootstrap";
import RoomFeatures from "./RoomFeatures";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {
  checkBookingAction,
  getBookedDatesAction,
} from "../../redux/actions/bookingsActions";
import { bookingTypes, roomTypes } from "../../redux/Actiontypes";
import moment from "moment-timezone";
import getStripe from "../../utils/getStripe";
import NewReview from "../review/NewReview";

function RoomDetails() {
  const router = useRouter();
  const id = router.query.id;
  const dispatch = useDispatch();
  const { room, error } = useSelector((state) => state.roomDetails);
  const [checkInDate, setCheckinDate] = useState(new Date());
  const [checkOutDate, setCheckoutDate] = useState(new Date());
  const [stayDays, setstayDays] = useState(0);
  const [PaymentLoading, setPaymentLoading] = useState(false);
  const { dates, loading: dates_loading } = useSelector(
    (state) => state.bookedDates
  );
  const { user } = useSelector((state) => state.loadedUser);

  const { loading: checkBookingloading, available } = useSelector(
    (state) => state.checkBooking
  );

  const excludedDates = [];
  dates.forEach((date) => excludedDates.push(new Date(date)));
  // console.log(room);

  // const newBookingFunction = async () => {
  //   const bookingData = {
  //     room: router.query.id,
  //     checkInDate: checkInDate,
  //     checkOutDate: checkOutDate,
  //     daysOfStay: stayDays,
  //     amountPaid: 90,
  //     paymentInfo: {
  //       id: "STRIPE_PAYMENT_ID",
  //       status: "STRIPE_PAYMENT_STATUS",
  //     },
  //   };
  //   try {
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     };
  //     const res = await axios.post("/api/bookings", bookingData, config);
  //     console.log(res.data);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  const bookRoom = async (id, pricePerNight) => {
    setPaymentLoading(true);
    const amount = pricePerNight * stayDays;
    try {
      const link = `/api/check_out/${id}?checkInDate=${checkInDate.toISOString()}&checkOutDate=${checkOutDate.toISOString()}&daysOfStay=${stayDays}`;
      const res = await axios.get(link, {
        params: { amount },
      });
      const stripe = await getStripe();
      stripe.redirectToCheckout({ sessionId: res.data.id });
      setPaymentLoading(false);
    } catch (err) {
      setPaymentLoading(false);
      console.log(err);
      toast;
    }
  };

  // const checkoutFunction = async (id, pricePerNight) => {
  //   setPaymentLoading(true);
  //   const amount = pricePerNight * daysOfStay;
  //   try {
  //     const link = `/api/checkout_session/${id}?checkInDate=${checkInDate.toISOString()}&checkOutDate=${checkOutDate.toISOString()}&daysOfStay=${stayDays}`;
  //   } catch (error) {
  //     setPaymentLoading(false);
  //     console.log(error);
  //     toast.error(error.message);
  //   }
  // };

  const onDatechange = (dates) => {
    const [checkInDate, checkOutDate] = dates;
    setCheckinDate(checkInDate);
    setCheckoutDate(checkOutDate);
    if (checkInDate && checkOutDate) {
      console.log(available);
      const days = Math.floor(
        (new Date(checkOutDate) - new Date(checkInDate)) / 86400000 + 1
      );
      setstayDays(days);
      console.log(stayDays);
      dispatch(
        checkBookingAction(
          id,
          checkInDate.toISOString(),
          checkOutDate.toISOString()
        )
      );
    }
    // console.log(checkInDate, checkOutDate);
  };

  useEffect(() => {
    dispatch(getBookedDatesAction(id));
    // toast.error(error);
    // dispatch(clearErrorsAction());
    if (error) {
      toast.error(error);
      dispatch(clearErrorsAction());
    }
    return () => {
      dispatch({ type: bookingTypes.CHECK_BOOKING_RESET });
    };
  }, [dispatch, id]);

  // console.log(checkBooking);

  return (
    <>
      <Head>
        <title> {room.name} -booky</title>
      </Head>
      <div className="container container-fluid">
        <h2 className="mt-5">{room.name} </h2>
        <p>{room.address}</p>

        <div className="ratings mt-auto mb-3">
          <div className="rating-outer">
            <div className="rating-inner">
              <div
                className="rating-inner"
                style={{ width: `${(room.ratings / 5) * 100}%` }}
              ></div>
            </div>
          </div>
          <span id="no_of_reviews">({room.numOfReviews} Reviews)</span>
        </div>

        <Carousel hover="pause">
          {room.images &&
            room.images.map((image) => (
              <Carousel.Item key={image.public_id}>
                <div style={{ width: "100%", height: "440px" }}>
                  <Image
                    className="d-block m-auto"
                    src={image.url}
                    alt={room.name}
                    layout="fill"
                  />
                </div>
              </Carousel.Item>
            ))}
        </Carousel>

        <div className="row my-5">
          <div className="col-12 col-md-6 col-lg-8">
            <h3>Description</h3>
            <p>{room.description}</p>
            <RoomFeatures room={room} />
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="booking-card shadow-lg p-4">
              <p className="price-per-night">
                <b>{room.pricePerNight} -$</b> / night
              </p>
              <hr />
              {/* <p className="mt-5 mb-3">
                checkin date is {checkinDate ? checkinDate : "not set"}{" "}
              </p>
              <p className="mt-2 mb-3">
                checkout date is {checkoutDate ? checkoutDate : "not set"}{" "}
              </p> */}
              <p>set dates</p>
              <DatePicker
                className="w-100"
                selected={checkInDate}
                onChange={onDatechange}
                startDate={checkInDate}
                endDate={checkOutDate}
                minDate={new Date()}
                excludeDates={excludedDates}
                selectsRange
                inline
              />

              {/* <Button variant="primary" size="lg" onClick={newBookingFunction}>
                pay
              </Button> */}
              {available === true && (
                <div>
                  <div className="alert alert-success my-3 font-weight-bold">
                    Room is available. Book now.
                  </div>
                </div>
              )}

              {!available && (
                <div className="alert alert-danger my-3 font-weight-bold">
                  Room not available. Try different dates.
                </div>
              )}

              {available && !user && (
                <div className="alert alert-danger my-3 font-weight-bold">
                  Login to book room.
                </div>
              )}

              {available && user && (
                <button
                  className="btn btn-block py-3 booking-btn"
                  onClick={() =>
                    // newBookingFunction(stayDays, room.pricePerNight)
                    bookRoom(room._id, room.pricePerNight)
                  }
                  disabled={
                    checkBookingloading || PaymentLoading ? true : false
                  }
                >
                  Pay -{" "}
                  <span>
                    {room.pricePerNight * stayDays}$ for{" "}
                    <span>{stayDays} days </span>{" "}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
        <NewReview />
        <div className="reviews w-75">
          <h3>Reviews:</h3>
          <hr />
          <div className="review-card my-3">
            <div className="rating-outer">
              <div className="rating-inner"></div>
            </div>
            <p className="review_user">by John</p>
            <p className="review_comment">Good Quality</p>

            <hr />
          </div>

          <div className="review-card my-3">
            <div className="rating-outer">
              <div className="rating-inner"></div>
            </div>
            <p className="review_user">by John</p>
            <p className="review_comment">Good Quality</p>

            <hr />
          </div>
        </div>
      </div>
    </>
  );
}

export default RoomDetails;
