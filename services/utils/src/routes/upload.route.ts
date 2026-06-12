import express from  "express"
import { v2 as cloudinary } from 'cloudinary'
import { isAuth } from "../middlewares/isAuth.middleware"
import uploadImage from "../controller/upload.controller"

const fileRouter = express.Router()

fileRouter.route("/upload").post(isAuth, uploadImage)

export default fileRouter