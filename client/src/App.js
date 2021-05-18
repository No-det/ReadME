import { useContext } from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Trades from "./pages/Trades";
import Profile from "./pages/Profile";
import AuthProvider, { AuthContext } from "./contexts/AuthContext";
import ThemeProvider from "./contexts/ThemeContext";

const App = () => {
  const { user } = useContext(AuthContext);

  console.log(user);

  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Switch>
            <Navbar>
              <div className="container">
                <PublicRoute exact path="/" component={Landing} />
                <PrivateRoute path="/reviews" component={Trades} />
                <PrivateRoute path="/trades" component={Trades} />
                <PrivateRoute path="/profile" component={Profile} />
              </div>
            </Navbar>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
