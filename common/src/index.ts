export * from './middleware/cloudinary'
export * from './middleware/isAuth'

// middleware/cloudinary.ts

import cloudinary from "cloudinary";

export const configureCloudinary = () => {
  const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_SECRET_KEY } = process.env;

  if (!CLOUD_NAME || !CLOUD_API_KEY || !CLOUD_SECRET_KEY) {
    throw new Error("Missing Cloudinary environment variables");
  }

  cloudinary.v2.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_SECRET_KEY,
  });
};