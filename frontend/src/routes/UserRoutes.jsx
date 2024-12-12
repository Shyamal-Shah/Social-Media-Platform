import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../views/Dashboard";
import { useSelector } from "react-redux";

const ProtectRoutes = ({ children }) => {
  const loggedInUser = useSelector((state) => state.authReducer.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedInUser) {
      console.log("Logging out");
      navigate("/sign-in");
    }
  }, [navigate, loggedInUser]);

  return children;
};

const UserRoutes = () => {
  return {
    path: "/",
    element: (
      <ProtectRoutes>
        <MainLayout />
      </ProtectRoutes>
    ),
    caseSensitive: false,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  };
};

export default UserRoutes;
