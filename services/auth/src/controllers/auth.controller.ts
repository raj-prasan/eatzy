import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import { AuthenticatedUser } from "../middlewares/auth.middleware.js";
import ApiError from "../utils/ApiError.js";
import { oauth2client } from "../config/google..config.js";
import axios from "axios";
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const {code} = req.body;
  if(!code){
    throw new ApiError(400, "Authorization code is required.")
  }
  const googleRes = await oauth2client.getToken(code);
  oauth2client.setCredentials(googleRes.tokens);

  const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`)

  const { email, name, picture } = userRes.data;
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
const allowedRoles = ["customer", "rider", "restaurant"] as const;

type Role = (typeof allowedRoles)[number];

export const addUserRole = asyncHandler(
  async (req: AuthenticatedUser, res: Response) => {
    if (!req.user?._id) {
      throw new ApiError(401, "UnauthenticatedUser");
    }
    const { role } = req.body as { role: Role };

    if (!allowedRoles.includes(role)) {
      throw new ApiError(400, "Invalid Role");
    }

    const user = await User.findByIdAndUpdate(req.user._id, { role: role }, { new: true });

    if (!user) {
      throw new ApiError(401, "User not found.");
    }
    const token = jwt.sign({ user }, process.env.JWT_SECRET as string, {
      expiresIn: "15d",
    });
    res.status(200).json({
      message: "Role selected Successfully",
      user,
      token
    });
  },
);

export const myProfile = asyncHandler(async (req: AuthenticatedUser, res: Response)=>{
  const user = req.user
  res.status(200).json({
    user
  })
})
