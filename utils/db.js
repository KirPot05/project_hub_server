import mongoose from "mongoose";

export default function connectDB() {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DB_URL);
    console.log(`MongoDB Connected`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
