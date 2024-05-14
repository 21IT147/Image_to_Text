import mongoose from "mongoose";

const connectDB = (DB) => {
  mongoose
    .connect(DB)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
};

export default connectDB;
