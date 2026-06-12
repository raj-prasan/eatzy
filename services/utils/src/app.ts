import express from "express"
import cors from "cors"
import fileRouter from "./routes/upload.route"
import locationRouter from "./routes/location.route"

const app = express()
app.use(cors())
app.use(express.json({limit: "16Kb"}))
app.use(express.urlencoded({limit: "26Kb", extended: true}))


app.use("/api/v1/images", fileRouter);
app.use("/api/v1/location", locationRouter)
export {app}