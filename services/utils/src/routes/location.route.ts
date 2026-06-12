import express from "express"
import { location } from "../controller/location.controller"
const locationRouter = express.Router()


locationRouter.route("/").get(location)

export default locationRouter