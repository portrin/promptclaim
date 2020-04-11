import React from "react";
import "./App.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import ByProduct1 from "./components/byproduct1";
import ByProduct2 from "./components/byproduct2";
import ByPolicy1 from "./components/bypolicy1";
import ByPolicy2 from "./components/bypolicy2";
import Login from "./components/login";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={ByProduct1} exact />
          <Route path="/byproduct2/:key" component={ByProduct2} exact />
          <Route path="/bypolicy1" component={ByPolicy1} exact />
          <Route path="/bypolicy2" component={ByPolicy2} exact />
          <Route path="/login" component={Login} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
