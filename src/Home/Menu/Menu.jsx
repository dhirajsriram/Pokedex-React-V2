import React from "react";
import { Link } from "react-router-dom";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0
    };
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <img
          alt="pokeball"
          width="20"
          height="20"
          src="https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG"
        />
        <a className="navbar-brand text-white">&nbsp;Pokedex</a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="text-light nav-link font-weight-bold" to="/">
                Home
              </Link>{" "}
              <span className="sr-only">(current)</span>
            </li>
            <li className="nav-item">
              <Link className="text-light nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="text-light nav-link" to="/help">
                Help
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Menu;
