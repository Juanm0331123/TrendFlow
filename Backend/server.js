import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/connection.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT} ✈️`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
};

startServer();
