import mongoose from "mongoose";

const connectDB = async()=>{
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI as string,{
      dbName: "eatzy"
    })
    console.log(`\nMongoDB connected. Host: ${connectionInstance.connection.host}, DB: ${connectionInstance.connection.name}`)
  } catch (error) {
    console.log(error);
  }
}

export {connectDB}