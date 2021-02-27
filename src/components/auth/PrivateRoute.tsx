import { CircularProgress } from "@material-ui/core";
import { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { loggedUserVar } from "../../cache";
import { Notifications, UserVar } from "../../types/users.types";

const PrivateRoute: FC<RouteProps> = ({ component, ...rest }) => {
  const auth = useReactiveVar<UserVar & Notifications>(loggedUserVar);

  if (auth.loading) {
    return (
      <div className="center overflow">
        <CircularProgress color="inherit" size="3rem" />
      </div>
    );
  } else if (!auth.isAuthenticated) {
    return <Redirect to="/auth" />;
  }
  return <Route {...rest} component={component} />;
};

export default PrivateRoute;
