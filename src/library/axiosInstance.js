import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ams-software-backend.vercel.app",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
