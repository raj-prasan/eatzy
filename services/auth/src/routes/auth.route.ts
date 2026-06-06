import { Router } from "express";
import { addUserRole, loginUser, myProfile } from "../controllers/auth.controller.js";
import {isAuth } from "../middlewares/auth.middleware.js";

const authRouter = Router()

authRouter.route("/login").post(loginUser)
authRouter.route("/add/role").put(isAuth, addUserRole)
authRouter.route("/me").get(isAuth, myProfile)

export default authRouter