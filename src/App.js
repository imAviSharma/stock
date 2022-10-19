import NavBar from "./components/NavBar";
import News from "./components/News";
import StockInfo from "./components/StockInfo";
import LineGraph from "./components/LineGraph";

import Home from "./Pages/Home"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <Router>
      <div>
      <NavBar />
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/news">
            <News/>
          </Route>
          <Route path="/stock">
            <StockInfo />
          </Route>
          <Route path="/chart">
            <LineGraph />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
