import { Request, Response } from "express";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, name, picture } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({
      name,
      email,
      image: picture,
    });
  }
  console.log(user)
  const token = jwt.sign({ user }, process.env.JWT_SECRET as string, {
    expiresIn: "15d",
  });

  res.status(200).json({
    message: "Login Success",
    token,
    user,
  });
});
