import axios from "axios";
import { clearUser } from "../store/userSlice";
import { useDispatch } from "react-redux";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      useDispatch()(clearUser());
    }
    return Promise.reject(error);
  }
);

export default api;
