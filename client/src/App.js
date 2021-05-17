import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Trades from "./pages/Trades";
import AuthProvider from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Navbar>
            <div className="container">
              <Route exact path="/" component={Landing} />
              <Route exact path="/trades" component={Trades} />
            </div>
          </Navbar>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
