import express from "express";
import currencyRoutes from "./routes/currencyRoutes.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/", currencyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});