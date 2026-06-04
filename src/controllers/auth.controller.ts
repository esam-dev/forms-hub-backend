import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../services/auth.service";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { email, password } = req.body;
    const user = await registerUser(email, password);
    res.status(201).json({ status: "success", data: user });
  } catch (error) {
    next(error);
  }
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    next(error);
  }
}
