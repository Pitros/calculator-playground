import { Router, json } from "express";
import cors from "cors";

import { catchAsyncErrors } from "../utils/middlewares";
import { validateBody } from "../utils/validate";
import { calculatorAction, CalculatorKeys, initialState } from "./service";
import { actionPayload } from "./validators";

const router = Router();

router.use(cors());

router.post(
  "/action",
  json(),
  catchAsyncErrors(async (req, res) => {
    const payload = await validateBody(actionPayload, req);

    return res.json(
      calculatorAction({ state: payload.state, action: payload.action })
    );
  })
);

router.get("/", (_req, res) => {
  return res.json({ initialState, keys: CalculatorKeys });
});

router.get("/keys", (_req, res) => {
  res.json(CalculatorKeys);
});

export default router;
