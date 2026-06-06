import { Router } from "express";
import { loginUser } from "../controllers/auth.controller.js";
import { addUserRole, isAuth } from "../middlewares/auth.middleware.js";

const authRouter = Router()

authRouter.route("/login").post(loginUser)
authRouter.route("/add/role").put(isAuth, addUserRole)

export default authRouter