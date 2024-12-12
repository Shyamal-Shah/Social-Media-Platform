import api from "./api";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

const useSignIn = () => {
  const dispatch = useDispatch();

  const SignIn = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { data } = response;
      dispatch(setUser(data.user));
    } catch (error) {
      console.log(error);
    }
  };

  return SignIn;
};

export { useSignIn };
