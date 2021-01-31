import { CircularProgress } from "@material-ui/core";
import { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { loggedUserVar, UserVar } from "../../cache";

const PrivateRoute: FC<RouteProps> = ({ component, ...rest }) => {
  const auth = useReactiveVar<UserVar>(loggedUserVar);

  if (auth.loading) {
    return <CircularProgress color="inherit" size="3rem" />;
  } else if (!auth.isAuthenticated) {
    return <Redirect to="/auth" />;
  }
  return <Route {...rest} component={component} />;
};

export default PrivateRoute;
