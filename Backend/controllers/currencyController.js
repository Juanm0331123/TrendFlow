import yahooFinance from "yahoo-finance2";
import { sub, format } from "date-fns";

export const getCurrencyData = async (req, res) => {
  const { symbol } = req.params;
  const { interval = '1d', range = '1mo' } = req.query;

  const validIntervals = ['1m', '2m', '5m', '15m', '30m', '60m', '90m', '1h', '1d', '5d', '1wk', '1mo', '3mo'];
  const validRanges = ['1d', '5d', '1mo', '3mo', '6mo', '1y', '2y', '5y', '10y', 'ytd', 'max'];

  if (!validIntervals.includes(interval) || !validRanges.includes(range)) {
    return res.status(400).send("Invalid interval or range parameter");
  }

  const endDate = new Date();
  let startDate;
  switch (range) {
    case '1d':
      startDate = sub(endDate, { days: 1 });
      break;
    case '5d':
      startDate = sub(endDate, { days: 5 });
      break;
    case '1mo':
      startDate = sub(endDate, { months: 1 });
      break;
    case '3mo':
      startDate = sub(endDate, { months: 3 });
      break;
    case '6mo':
      startDate = sub(endDate, { months: 6 });
      break;
    case '1y':
      startDate = sub(endDate, { years: 1 });
      break;
    case '2y':
      startDate = sub(endDate, { years: 2 });
      break;
    case '5y':
      startDate = sub(endDate, { years: 5 });
      break;
    case '10y':
      startDate = sub(endDate, { years: 10 });
      break;
    case 'ytd':
      startDate = new Date(endDate.getFullYear(), 0, 1);
      break;
    case 'max':
      startDate = new Date(1970, 0, 1);
      break;
    default:
      return res.status(400).send("Invalid range parameter");
  }

  const period1 = Math.floor(startDate.getTime() / 1000);
  const period2 = Math.floor(endDate.getTime() / 1000);

  try {
    const queryOptions = { interval, period1, period2 };
    const result = await yahooFinance.chart(symbol, queryOptions);

    // Log para inspeccionar la estructura del objeto result
    console.log(result);

    // Extraer el precio de la divisa
    const price = result.meta.regularMarketPrice;

    // Agregar el precio a la respuesta
    res.json({ ...result, price });
  } catch (error) {
    console.error("Error fetching data from Yahoo Finance API:", error);
    res.status(500).send(`Error fetching data from Yahoo Finance API: ${error.message}`);
  }
};