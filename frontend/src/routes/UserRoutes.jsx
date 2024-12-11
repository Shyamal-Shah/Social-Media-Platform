import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../views/Dashboard";

const ProtectRoutes = ({ children }) => {
  //   const navigate = useNavigate();
  //   useEffect(() => {
  //     if (!loggedInUser) {
  //       console.log("Logging out");
  //       navigate("/login");
  //     } else if (loggedInUser?.newPassword) {
  //       navigate("/change-password");
  //     }
  //   }, [navigate, loggedInUser]);

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
