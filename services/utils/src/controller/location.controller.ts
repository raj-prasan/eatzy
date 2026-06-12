import asyncHandler from "../utils/asyncHandler.js"
import { Request, Response } from "express"
import axios from "axios";
import ApiError from "../utils/ApiError.js";

export const location = asyncHandler(async(req: Request, res: Response) =>{
  const { lat, lon } = req.query;
  if(!lat || !lon)
    throw new ApiError(400,"latitude and longitude required")
    
  const response = await axios.get(
    "https://api.bigdatacloud.net/data/reverse-geocode-client",
    {
      params: {
        latitude: lat,
        longitude: lon,
        localityLanguage: "en",
      }
    }
  );

  const data = response.data;

  // Map BigDataCloud response to Nominatim structure to keep frontend compatible
  const mappedData = {
    display_name: data.locality 
      ? `${data.locality}, ${data.city && data.city !== data.locality ? data.city + ', ' : ''}${data.principalSubdivision || ''}, ${data.countryName || ''}`.replace(/,\s*,/g, ',').trim()
      : `${data.city || 'Current Location'}, ${data.principalSubdivision || ''}, ${data.countryName || ''}`.replace(/,\s*,/g, ',').trim(),
    address: {
      city: data.city,
      town: data.locality,
      village: data.locality,
      state: data.principalSubdivision,
      country: data.countryName,
      postcode: data.postcode
    }
  };

  res.json(mappedData);
}) 
