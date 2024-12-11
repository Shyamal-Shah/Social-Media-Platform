import { useRoutes } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import UserRoutes from "./UserRoutes";
import NotFound from "../views/NotFound";

const Routes = () => {
  return useRoutes([
    UserRoutes(),
    ...AuthRoutes(),
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
};

export default Routes;
