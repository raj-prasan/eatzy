import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

export interface IUser {
  _id: String;
  name: String;
  email: String;
  image: String;
  role: String;
}

export interface AuthenticatedUser extends Request {
  user?: IUser | null;
}
export const isAuth = asyncHandler(
  async (req: AuthenticatedUser, res: Response, next: NextFunction) => {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Unauthorized Request");
    }
    console.log("TOKEN:", token);
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

export const isSeller = asyncHandler(
  async (req: AuthenticatedUser, res: Response, next: NextFunction) => {
    const user = req.user;
    if(user && user.role !== "seller"){
      throw new ApiError(401, "You are not authoriseed seller")
    }
    next();
  },
);
