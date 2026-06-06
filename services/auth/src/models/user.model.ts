import mongoose,{Document, Schema} from "mongoose";

export interface IUser extends Document{
  name: String,
  email: String,
  image: String,
  role: String
}

const UserSchema: Schema<IUser> = new Schema({
  name:{
    type: String,
    required: true,

  },
  email:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true

  },
  image:{
    type: String,
    required: true,
    trim: true

  },
  role:{
    type: String,
    required: false,
    default: null
  },
}, {timestamps: true})

export const User = mongoose.model<IUser>("User", UserSchema)