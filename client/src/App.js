import { BrowserRouter, Switch } from "react-router-dom";

import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

import Navbar from "./components/Navbar";
import Reviews from "./pages/Reviews";
import Landing from "./pages/Landing";
import Trades from "./pages/Trades";
import Profile from "./pages/Profile";
import AuthProvider from "./contexts/AuthContext";
import ThemeProvider from "./contexts/ThemeContext";
import FloatingNavbar from "./components/FloatingNavbar";
import Review from "./pages/Review";
import SearchProvider from "./contexts/SearchContext";
import ChatPage from "./pages/ChatPage";
import WhoToFollow from "./pages/WhoToFollow";

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SearchProvider>
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
                  <PrivateRoute exact path="/chat" component={ChatPage} />
                  <PrivateRoute exact path="/chat/:uid" component={ChatPage} />
                  <PrivateRoute
                    exact
                    path="/whotofollow"
                    component={WhoToFollow}
                  />
                </div>
              </Navbar>
            </Switch>
          </BrowserRouter>
        </SearchProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
