import mongoose, { Schema, Document } from "mongoose";

export interface IRestaurant extends Document {
  name: string;
  description: string;
  image: string;
  phone: number;
  isVerified: boolean;
  ownerId: String;
  autoLocation: {
    type: "Point";
    coordinates: [number, number];
    formattedAddress: string;
  };
  isOpen: boolean;
  createdAt: Date;
}

const restaurantSchema = new Schema<IRestaurant>({
  name:{
    type: String,
    required: true,

  },
  description: {
    type: String
  },
  image: {
    type: String,
    required: true
  },
  phone:{
    type: Number,
    required: true
  },
  ownerId:{
    type: String
  },
  isVerified:{
    type: Boolean,
    required: true
  },
  autoLocation:{
    type: {
      String,
    enum: ["Point"],
    required: true
    },
    coordinates:{
      type: [Number],
      required: true
    },
    formattedAddress:{
      type: String 
    },
    
  },
  isOpen: {
      type: Boolean,
      default: false

    }

},
{
  timestamps: true
});

restaurantSchema.index({
  autoLocation: "2dsphere"
})
export const Restaurant =  mongoose.model<IRestaurant>("Restaurant", restaurantSchema)
