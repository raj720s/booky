const mongoose = require("mongoose");
// import Room from "../models/roomsModel";
const Room = require("../models/roomsModel");
// import dbConnect from "./dBconnect";
const roomData = require("./roomsData.json");

const dbConnect = () => {
  mongoose
    .connect(
      "mongodb+srv://raj:booky@bookycluster.2f8o7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then((res) => {
      console.log("connected to booky");
    })
    .catch((err) => {
      console.log("errorin dvb copnmnect");
    });
};

dbConnect();

const seeder = async () => {
  try {
    await Room.deleteMany();
    console.log("rooms deleted");
    await Room.insertMany(roomData);
    console.log("rooms created");
    process.exit();
  } catch (err) {
    console.log("seed failed", err);
    process.exit();
  }
};

const unseed = async () => {
  try {
    await Room.deleteMany();
    console.log("rooms deleted");
    process.exit();
  } catch (err) {
    console.log("unseed failed");
    process.exit();
  }
};

if (process.argv[2] === "-d") {
  unseed();
} else {
  seeder();
}
