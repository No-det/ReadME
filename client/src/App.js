import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import Trades from "./pages/Trades";
import ThemeProvider from './contexts/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/trades" component={Trades} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
