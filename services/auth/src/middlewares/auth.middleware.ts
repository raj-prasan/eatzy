import { Request,Response,NextFunction } from "express";
import jwt, {JwtPayload} from "jsonwebtoken"
import { IUser } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

export interface AuthnticatedUser extends Request{
  user?: IUser | null

}
export const isAuth = asyncHandler(async (req: AuthnticatedUser, res: Response, next: NextFunction)=>{
  const token = req.cookies?.accessToken ||req.header("Authorizaton")?.replace("Bearer ", "")
  if(!token){
    throw new ApiError(401,"Unauthorized Request")
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string)
})
