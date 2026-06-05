import { v2 as cloudinary } from "cloudinary"

const config = useRuntimeConfig()

export const connectCloudinary = async () => {
  return cloudinary.config({
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
    cloud_name: config.cloudinary.cloudName,
  })
}
