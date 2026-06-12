import express from "express"
import cors from "cors"

import cookieParser from 'cookie-parser'
import restaurantRouter from "./routes/restaurant.route.js"

const app = express()
app.use(cors())
app.use(express.json({limit: "16Kb"}))
app.use(cookieParser())

app.use("/api/v1/restaurant", restaurantRouter)
export {app}