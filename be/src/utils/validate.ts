import { Request } from "express";
import { AnyZodObject, z, ZodError } from "zod";
import { ServerError, ValidationError } from "./errors";

export const validateBody = async <T extends AnyZodObject>(
  schema: T,
  req: Request
): Promise<z.infer<T>> => {
  try {
    return await schema.parseAsync(req.body);
  } catch (err) {
    if (err instanceof ZodError) {
      throw new ValidationError(err.issues);
    }

    throw new ServerError(err);
  }
};
