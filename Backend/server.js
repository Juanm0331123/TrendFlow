import express from "express";

import reportRoutes from "./routes/reportRoutes.js";
import currencyRoutes from "./routes/currencyRoutes.js";

import dotenv from "dotenv";
import connectDB from "./database/connection.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());

app.use("/", reportRoutes);
app.use("/", currencyRoutes);

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
