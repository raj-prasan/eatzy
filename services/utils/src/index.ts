import { app } from "./app.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from 'cloudinary'

dotenv.config();

const PORT = process.env.PORT || 5002;
const {CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDIANRY_API_SECRET} = process.env
if(!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDIANRY_API_SECRET){
  throw new Error("Eenvironment variables not found")
}
cloudinary.config({ 
  cloud_name: CLOUDINARY_CLOUD_NAME, 
  api_key: CLOUDINARY_API_KEY, 
  api_secret: CLOUDIANRY_API_SECRET
});

app.listen(PORT, () => {
  console.log(`Restaurant service is running on ${PORT}`);
});
