
import { Router } from "express";
import { isAuth, isSeller } from "../middlewares/isAuth.middleware.js";
import addRestaurant from "../controllers/restaurant.controller.js";
import uploadFile from "../middlewares/multer.middleware.js";

const restaurantRouter = Router();

restaurantRouter.route("/new").post(isAuth, isSeller, uploadFile, addRestaurant)
export default restaurantRouter;