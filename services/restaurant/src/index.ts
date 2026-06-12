import { connectDB } from "./config/db.config.js";
import { app } from "./app.js";
import dotenv from "dotenv";


dotenv.config();

const PORT = process.env.PORT;


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Restaurant service is running on ${PORT}`);
  })
}).catch(err =>{
  console.log("MONGODB connection Failed!!! ", err);
})
