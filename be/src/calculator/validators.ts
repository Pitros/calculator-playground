import { z } from "zod";
import { CalculatorKeys, OperationKeys } from "./service";

export const actionPayload = z.object({
  action: z.enum(CalculatorKeys),
  state: z.object({
    currentValue: z.string().regex(/[-\d.]/),
    previousValue: z.number(),
    operation: z.enum(OperationKeys).nullable(),
    lastInput: z.enum(CalculatorKeys),
  }),
});
