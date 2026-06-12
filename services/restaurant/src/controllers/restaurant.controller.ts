import axios from "axios";
import getBuffer from "../config/datauri.config.js";
import { AuthenticatedUser } from "../middlewares/isAuth.middleware.js";
import { Restaurant } from "../models/restaurant.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
export const addRestaurant = asyncHandler(
  async (req: AuthenticatedUser, res: Response) => {
    const user = req.user;
    if (!user) {
      throw new ApiError(401, "Unauthorized");
    }
    const Passabletoken =
      req.cookies?.accessToken || req.header("Authorization");
    if (!Passabletoken) {
      throw new ApiError(401, "Unauthorized Request");
    }

    const existingRestaurant = await Restaurant.findOne({
      ownerId: user._id,
    });
    if (existingRestaurant) {
      throw new ApiError(400, "You already have a restaurant ");
    }
    const { name, description, latitude, longitude, formattedAddress, phone } =
      req.body;

    if (!name || !latitude || !longitude) {
      throw new ApiError(400, "Please give all details");
    }
    const file = req.file;

    if (!file) {
      throw new ApiError(400, "Please upload the image");
    }
    const fileBuffer = getBuffer(file);

    if (!file) {
      throw new ApiError(500, "Failed to create file buffer");
    }
    const { data: uploadResult } = await axios.post(
      `http://localhost:5002/api/v1/images/upload`,
      {
        buffer: fileBuffer.content,
      },
      {
        headers: {
          Authorization: Passabletoken,
        },
      },
    );
    const restaurant = await Restaurant.create({
      name,
      description,
      phone,
      image: uploadResult.url,
      autoLocation: {
        type: "Point",
        coordinates: [Number(longitude), Number(latitude)],
        formattedAddress,
      },
    });
    return res.status(200).json({
      message: "Restaurant created sucessfully",
      restaurant,
    });
  },
);
export default addRestaurant;

export const findRestaurant = asyncHandler(
  async (req: AuthenticatedUser, res: Response) => {
    if (!req.user) {
      throw new ApiError(400, "Please Login.");
    }
    const restaurant = await Restaurant.findOne({
      ownerId: req.user._id,
    });
    if (!restaurant) {
      throw new ApiError(400, "No restaurant Found.");
    }

    if (!req.user.restaurantId) {
      const token = await jwt.sign(
        {
          user: {
            ...req.user,
            restaurantId: restaurant._id,
          },
        },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "15d",
        },
      );
      return res.json({restaurant, token})
    }
    return res.json({restaurant})
    
  },
);
