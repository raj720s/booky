import mongoose from "mongoose";

const dbConnect = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => {
      console.log("connected to booky");
    })
    .catch((err) => {
      console.log("errorin dvb copnmnect");
    });
};

export default dbConnect;
