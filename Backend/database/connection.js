import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;

const uri = `mongodb+srv://${user}:${password}@cluster0.it0gt.mongodb.net/trendflow?retryWrites=true&w=majority&appName=Cluster0`;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, { ssl: true });
    console.log("MongoDB connected successfully 🚀");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
