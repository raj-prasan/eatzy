
import { Router } from "express";
import { isAuth, isSeller } from "../middlewares/isAuth.middleware.js";
import addRestaurant from "../controllers/restaurant.controller.js";

const restaurantRouter = Router();

restaurantRouter.route("/new").post(isAuth,isSeller, addRestaurant)
export default restaurantRouter;