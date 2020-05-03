import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Search from './Search'
import NotFound from './NotFound'

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search" component={Search} />
          <Route component={NotFound}/>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
