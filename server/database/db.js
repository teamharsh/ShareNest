import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DBConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error while connecting database:", error.message);
  }
};

export default DBConnection;
