import express from "express";

import calculator from "./calculator/controller";
import { errorHandler } from "./utils/middlewares/errorHandler";

const app = express();

app.use("/calculator", calculator);

app.use(errorHandler);

app.use("*", (_req, res) => {
  res.status(404).json({ success: false });
});

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
