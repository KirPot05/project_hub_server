import mongoose from "mongoose";

export default async function connectDB() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DB_URL);
    console.log(`MongoDB Connected`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
