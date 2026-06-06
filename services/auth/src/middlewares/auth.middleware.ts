import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser, User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

export interface AuthnticatedUser extends Request {
  user?: IUser | null;
}
export const isAuth = asyncHandler(
  async (req: AuthnticatedUser, res: Response, next: NextFunction) => {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Unauthorized Request");
    }
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;
    if (!decodedToken) {
      throw new ApiError(401, "Invalid Access Token");
    }
    req.user = decodedToken.user;
    next();
  },
);

const allowedRoles = ["customer", "rider", "seller"] as const;

type Role = (typeof allowedRoles)[number];

export const addUserRole = asyncHandler(
  async (req: AuthnticatedUser, res: Response, next: NextFunction) => {
    if (!req.user?._id) {
      throw new ApiError(401, "UnauthenticatedUser");
    }
    const { role } = req.body as { role: Role };

    if (!allowedRoles.includes(role)) {
      throw new ApiError(400, "Invalid Role");
    }

    const user = await User.findByIdAndUpdate(req.user._id, { role }, { new: true });

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
