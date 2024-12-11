import SignIn from "../views/SignIn";
import SignUp from "../views/SignUp";

const AuthRoutes = () => {
  return [
    {
      path: "sign-in",
      element: <SignIn />,
      caseSensitive: false,
    },
    {
      path: "sign-up",
      element: <SignUp />,
      caseSensitive: false,
    },
  ];
};
export default AuthRoutes;
