import { useContext } from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

import Navbar from "./components/Navbar";
import Reviews from "./pages/Reviews";
import Landing from "./pages/Landing";
import Trades from "./pages/Trades";
import Profile from "./pages/Profile";
import AuthProvider, { AuthContext } from "./contexts/AuthContext";
import ThemeProvider from "./contexts/ThemeContext";
import FloatingNavbar from "./components/FloatingNavbar";
import Review from "./pages/Review";

const App = () => {
  const { user } = useContext(AuthContext);

  console.log(user);

  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Switch>
            <Navbar>
              <FloatingNavbar />
              <div className="container">
                <PublicRoute exact path="/" component={Landing} />
                <PrivateRoute exact path="/reviews" component={Reviews} />
                <PrivateRoute exact path="/reviews/:id" component={Review} />
                <PrivateRoute exact path="/trades" component={Trades} />
                <PrivateRoute exact path="/user/:id" component={Profile} />
              </div>
            </Navbar>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
