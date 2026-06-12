import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/ApiError.js";
import {  Request, Response } from "express";
import{v2 as cloudinary} from "cloudinary"
const uploadImage = asyncHandler(async(req: Request, res: Response)=>{
  const {buffer} = req.body;
  const uploadedFile = await cloudinary.uploader.upload(buffer)
  res.status(200).json({
    url: uploadedFile.secure_url
  })
})
export default uploadImage