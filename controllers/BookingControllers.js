import bookingModel from "../models/bookingModel";
import ErrorHandler from "../utils/ErrorHandler";
import catchAsync from "../middlewares/asyncError";
import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

const newBookingController = catchAsync(async (req, res) => {
  const {
    room,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
  } = req.body;

  const booking = await bookingModel.create({
    room,
    user: req.user._id,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
    paidAt: Date.now(),
  });
  res.status(200).json({
    msg: "booking created",
    booking,
  });
});

const checkBookingAvaliability = catchAsync(async (req, res) => {
  let { roomId, checkInDate, checkOutDate } = req.query;
  checkInDate = new Date(checkInDate);
  checkOutDate = new Date(checkOutDate);
  const bookings = await bookingModel.find({
    room: roomId,
    $and: [
      {
        checkInDate: {
          $lte: checkOutDate,
        },
      },
      {
        checkOutDate: {
          $gte: checkInDate,
        },
      },
    ],
  });
  let Room_vacancy;
  if (bookings && bookings.length === 0) {
    // bookings of the room is zero .. means. it is avaliable
    Room_vacancy = true;
  } else {
    Room_vacancy = false;
    // ie.. this room is booked under the new queried dates .. and   is not available
  }
  res.status(200).json({
    msg: "ok",
    vacancy: Room_vacancy,
  });
});

// pia/bookings /check_dates
const checkBookedDates_controller = catchAsync(async (req, res) => {
  const { roomId } = req.query;
  const bookings = await bookingModel.find({ room: roomId });
  let bookedDates = [];
  const timeDifferences = moment().utcOffset() / 60; // offset gives time in minutes
  bookings.forEach((booking) => {
    const checkInDate = moment(booking.checkInDate).add(
      timeDifferences,
      "hours"
    );
    const checkOutDate = moment(booking.checkOutDate).add(
      timeDifferences,
      "hours"
    );
    const range = moment.range(moment(checkInDate), moment(checkOutDate));
    const dates = Array.from(range.by("day"));
    bookedDates = bookedDates.concat(dates);
  });
  res.status(200).json({
    msg: "ok",
    bookedDates,
  });
});

const getUserBookingsController = catchAsync(async (req, res) => {
  const mybookings = await bookingModel.find({ user: req.user._id }).populate({
    path: "user",
    select: "name email",
  });

  res.status(200).json({
    msg: "ok",
    mybookings,
  });
});

const getBookiongDetailsbyId_controller = catchAsync(async (req, res) => {
  const booking = await bookingModel
    .findById(req.query.id)
    .populate({
      path: "room",
      select: "name pricePerNight images",
    })
    .populate({
      path: "user",
      select: "name email",
    });
  if (booking) {
    res.status(200).json({
      msg: "ok",
      booking: booking,
    });
  } else {
    res.status(400).json({
      msg: "room id problem at details controler",
    });
  }
});

// const bookingDetailsController = catchAsync(async (req, res) => {
//   const details = bookingModel
//     .findById(req.query.id)
//     .populate({
//       path: "room",
//       select: "name pricePerNight images",
//     })
//     .populate({
//       path: "user",
//       select: "name email",
//     });
//   res.status(200).json({
//     msg: "ok",
//     details,
//   });
// });

// const getAllBookingsController = catchAsync(async (req, res) => {
//   const bookings = bookingModel
//     .find({})
//     .populate({
//       path: "room",
//       select: "name pricePerNight images",
//     })
//     .populate({
//       path: "user",
//       select: "name email",
//     });
//   res.status(200).json({
//     msg: "ok",
//     bookings: bookings,
//   });
// });

// const deleteBookingController = catchAsync(async (req, res, nxt) => {
//   const booking = bookingModel.findById(req.query.id);
//   if (!booking) {
//     return nxt(new ErrorHandler("booking not found with this id", 400));
//   }
//   await booking.remove();
//   res.status(200).json({
//     msg: "deleted",
//   });
// });

export {
  newBookingController,
  checkBookingAvaliability,
  checkBookedDates_controller,
  getUserBookingsController,
  getBookiongDetailsbyId_controller,
};
