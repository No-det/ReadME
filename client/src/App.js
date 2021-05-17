import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Trades from "./pages/Trades";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Navbar>
          <Route exact path="/trades" component={Trades} />
        </Navbar>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
