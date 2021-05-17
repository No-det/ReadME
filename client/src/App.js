import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import Trades from "./pages/Trades";

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/trades" component={Trades} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
