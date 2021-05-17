import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PublicRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        return user ? <Redirect to="/reviews" /> : <Component {...props} />;
      }}
    />
  );
};

export default PublicRoute;
