import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home/Home";
import Menu from "./Home/Menu/Menu";
import About from "./about/about";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: ""
    };
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Menu />
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

