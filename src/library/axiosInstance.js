import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ams-backend.irfans.dev",
  withCredentials: true,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

export default axiosInstance;
