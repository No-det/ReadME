import { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Trades from "./pages/Trades";
import Profile from "./pages/Profile";
import AuthProvider, { AuthContext } from "./context/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext);

  console.log(user);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Navbar>
            <div className="container">
              <Route exact path="/" component={Landing} />
              <Route exact path="/trades" component={Trades} />
              <Route exact path="/profile" component={Profile} />
            </div>
          </Navbar>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
