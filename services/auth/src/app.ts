import express from "express"
import cors from "cors"
import authRouter from "./routes/auth.route.js"


const app = express()
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))
app.use(express.json({limit: "16Kb"}))

app.use("/api/v1/auth", authRouter)
export {app}