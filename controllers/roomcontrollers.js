import asyncCatch from "../middlewares/asyncError";
import Room from "../models/roomsModel";
import bookingModel from "../models/bookingModel";
import ErrorHandler from "../utils/ErrorHandler";
import APIFeatures from "../utils/Features";

///
const getAllRoomsctrl = asyncCatch(async (req, res, nxt) => {
  const elpp = 4;
  const roomCount = await Room.countDocuments(); // total no. of rooms in the db

  // const rooms = await Room.find();
  const apiFeatures = new APIFeatures(Room.find(), req.query)
    .search()
    .filter()
    .pagination(elpp);
  let rooms = await apiFeatures.query;
  let filteredRoomsCount = rooms.length;

  // apiFeatures.pagination(elpp);
  // rooms = await apiFeatures.query;

  res
    .status(200)
    .json({ count: roomCount, elpp, filteredRoomsCount, rooms: rooms });
});

////
const getOneRoomDatabyId = asyncCatch(async (req, res, nxt) => {
  const id = req.query.roomId; // not params here

  // try {
  const room = await Room.findById(id);
  if (!room) {
    return nxt(new ErrorHandler("couldnt get the room data by id", 404));
  }
  res.status(200).json({ room: room });
  // } catch (err) {
  //   // if (err) return res.status(400).json({ error: err });
  //   nxt(new ErrorHandler("couldnt get the room data by id", 404));
  // }
});

//
const updateRoombyIdController = asyncCatch(async (req, res, nxt) => {
  const id = req.query.roomId; // not params here
  const room = await Room.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ updated: room });

  if (!room) {
    nxt(new ErrorHandler("couldnt get the room data by id", 404));
  }
});

///

const addNewRoomController = asyncCatch(async (req, res, nxt) => {
  const room = await Room.create(req.body);
  res.status(200).json({
    msg: "new room addded",
    room: room,
  });
});

//  admin
const getAllRoomsCOntroller = asyncCatch(async (req, res) => {
  const rooms = await Room.find();
  res.status(200).json({
    msg: "ok ",
    rooms,
  });
});

////
const deleteRoombyIdController = asyncCatch(async (req, res, nxt) => {
  const id = req.query.roomId; // not params here

  const room = await Room.findById(id);
  await room.remove();
  res.status(200).json({ removed: room });

  if (!room) {
    nxt(new ErrorHandler("couldnt get the room", 404));
  }
});

// -----------------------   reviews

const getRoomReviewsController = asyncCatch(async (req, res) => {
  const room = await Room.findById(req.query.id);
  res.status(200).json({
    msg: "ok",
    reviews: room.reviews,
  });
});

const checkReviewAvailabilityController = asyncCatch(async (req, res) => {
  const { roomId } = req.query;

  const bookings = await bookingModel.find({
    user: req.user._id,
    room: roomId,
  });

  let isReviewAvailable = false;
  if (bookings.length > 0) isReviewAvailable = true;

  res.status(200).json({
    success: true,
    isReviewAvailable,
  });
});

const create_reviewController = asyncCatch(async (req, res) => {
  const { rating, comment, roomId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  // console.log(review);
  // const room = await Room.findById(roomId);
  // const isReviewed = room.reviews.find(
  //   (r) => r.user.toString() === req.user._id.toString()
  // );
  // if (isReviewed) {
  //   room.reviews.forEach((rv) => {
  //     if (rv.user.toString() === req.user._is.toString()) {
  //       rv.comment = comment;
  //       rv.rating = rating;
  //     }
  //   });
  // } else {
  //   room.reviews.push(review);
  //   room.numofReviews = room.reviews.length;
  // }
  // room.ratings =
  //   room.reviews.reduce((acc, item) => item.rating + acc, 0) / numofReviews;
  // await room.save({ validateBeforeSave: false });
  // res.status(200).json({
  //   success: "review added",
  // });
  const room = await Room.findById(roomId);

  const isReviewed = room.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    room.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    room.reviews.push(review);
    room.numOfReviews = room.reviews.length;
  }

  room.ratings =
    room.reviews.reduce((acc, item) => item.rating + acc, 0) /
    room.reviews.length;

  await room.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

const deleteRoomReviewController = asyncCatch(async (req, res) => {
  const room = await Room.findById(req.query.roomId);
  const reviews = room.review.filter(
    (rev) => rev._id.toString() !== req.query.id.toString
  );
  // the aabove gives the array of the reviews of the room where the reviews id is not same as the current review id
  // helps in only deleting the req.user based review
  const numofReviews = reviews.length;
  const ratings =
    room.reviews.reduce((acc, item) => item.rating + acc, 0) / numofReviews;
  await Room.findByIdAndUpdate(
    req.query.roomId,
    {
      reviews,
      ratings,
      numofReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    msg: "ok",
  });
});

module.exports = {
  getAllRoomsctrl,
  addNewRoomController,
  getOneRoomDatabyId,
  updateRoombyIdController,
  deleteRoombyIdController,
  create_reviewController,
  getAllRoomsCOntroller,
  deleteRoomReviewController,
  checkReviewAvailabilityController,
  getRoomReviewsController,
};
