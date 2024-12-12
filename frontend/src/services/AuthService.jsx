import api from "./api";

import { toast } from "react-toastify";

const handleSignIn = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    const { data } = response;
    toast.success("Logged in successfully");
    return data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};

const handleSignUp = async (email, password, username) => {
  try {
    const response = await api.post("/auth/register", {
      email,
      password,
      username,
    });
    const { data } = response;
    toast.success("Registered successfully");
    return data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};

export { handleSignIn, handleSignUp };

