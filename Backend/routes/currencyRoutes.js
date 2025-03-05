import express from "express";
import { getCurrencyData } from "../controllers/currencyController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.get("/currency/:symbol", getCurrencyData);

export default router;
