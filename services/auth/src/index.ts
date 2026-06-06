import { connectDB } from "./config/db.config.js";
import { app } from "./app.js";
import dotenv from "dotenv";
const PORT = process.env.PORT || 5000;

dotenv.config({
  path: ".env",
});




connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Auth service is running on ${PORT}`);
  })
}).catch(err =>{
  console.log("MONGODB connection Failed!!! ", err);
})
