import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Trades from "./pages/Trades";
import ThemeProvider from './contexts/ThemeContext';
import AuthProvider from "./contexts/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
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
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App;
