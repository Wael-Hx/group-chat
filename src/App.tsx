import "./App.css";
import Register from "./components/auth/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChangePassword from "./components/auth/ChangePassword";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { loggedUserVar } from "./cache";
import { ME } from "./gql/queries/users";
import PrivateRoute from "./components/auth/PrivateRoute";
import Main from "./components/main/Main";

const App = () => {
  const { loading, data } = useQuery(ME, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.me && !loading) {
      loggedUserVar({
        isAuthenticated: true,
        user: data.me,
        loading: false,
      });
    } else if (!data?.me && !loading) {
      loggedUserVar({
        isAuthenticated: false,
        user: null,
        loading: false,
      });
    }
  }, [data, loading]);

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Main} />
        <Route exact path="/auth" component={Register} />
        <Route path="/reset-password/:token" component={ChangePassword} />
        <Route exact path="/reset-password" component={ChangePassword} />
      </Switch>
    </Router>
  );
};

export default App;
