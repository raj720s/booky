import asyncCatch from "../middlewares/asyncError";
import Room from "../models/roomsModel";
import ErrorHandler from "../utils/ErrorHandler";

///
const getAllRoomsctrl = asyncCatch(async (req, res, nxt) => {
  const rooms = await Room.find();
  res.status(200).json({ count: rooms.length, rooms: rooms });
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

////
const deleteRoombyIdController = asyncCatch(async (req, res, nxt) => {
  const id = req.query.roomId; // not params here

  // try {
  const room = await Room.findById(id);
  await room.remove();
  res.status(200).json({ removed: room });

  if (!room) {
    nxt(new ErrorHandler("couldnt get the room", 404));
  }
  // } catch (err) {
  // if (err) return res.status(400).json({ error: err });
  // nxt(new ErrorHandler("couldnt dedlete the rooms", 400));
  // }
});

///

const addNewRoomController = asyncCatch(async (req, res, nxt) => {
  // try {
  // const room = await Room.create(req.body, (err, room) => {
  // if (err) {
  //   // return res.status(400).json({ error: err });
  //   nxt(new ErrorHandler("couldnt add the room", 400));
  // }
  // if (room) return res.status(200).json({ room: room });
  // });
  const room = await Room.create(req.body);
  res.status(200).json({
    msg: "new room addded",
    room: room,
  });
  // } catch (err) {
  //   return res.status(400).json({ msg: "error adding", err });
  // }
});
module.exports = {
  getAllRoomsctrl,
  addNewRoomController,
  getOneRoomDatabyId,
  updateRoombyIdController,
  deleteRoombyIdController,
};
