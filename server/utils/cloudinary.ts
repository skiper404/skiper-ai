import { v2 as cloudinary } from "cloudinary"

export const connectCloudinary = async () => {
  return cloudinary.config({
    api_key: process.env.NUXT_CLOUDINARY_API_KEY,
    api_secret: process.env.NUXT_CLOUDINARY_API_SECRET,
    cloud_name: process.env.NUXT_CLOUDINARY_CLOUD_NAME,
  })
}
