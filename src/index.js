import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';
import Home from "./Home/Home";
import Menu from "./Home/Menu/Menu";
import About from "./about/about";

ReactDOM.render(<Router><div><Menu />
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} /></div></Router>, document.getElementById('root'));
registerServiceWorker();
