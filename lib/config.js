import axios from "axios";

const baseURL = process.env.NODE_ENV === "production"
  ? "https://pizza-store-dusky.vercel.app"
  : "http://localhost:9000";

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});
// The baseURL is set based on the environment, allowing for different configurations in development and production.
// This ensures that the application can seamlessly switch between local development and production environments without manual changes to the code.