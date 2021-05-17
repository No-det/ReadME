import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Trades from "./pages/Trades";

const App = () => {
  return (
    // <div className="container">
    <BrowserRouter>
      <Switch>
        <Navbar>
          <Route exact path="/" component={Landing} />
          <Route exact path="/trades" component={Trades} />
        </Navbar>
      </Switch>
    </BrowserRouter>
    // </div>
  );
};

export default App;
