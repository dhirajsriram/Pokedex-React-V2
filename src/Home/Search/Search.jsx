import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: "",
      name: "",
      value: "",
      inProgress: false,
      error: false
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.Search = this.Search.bind(this);
    this.resetOther = this.resetOther.bind(this);
    this.getContent = this.getContent.bind(this);
  }

  componentDidMount() {
    this.setState({ error: false });
    this.Surprise();
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <div>
        <form onSubmit={this.Search}>
          <div className="form-group">
            {this.state.inProgress && <div className="loader fullscreen" />}
            <label htmlFor="exampleInputEmail1">Pokemon</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.changeHandler}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter pokemon name"
            />
            <small id="emailHelp" className="form-text text-muted">
              Enter the pokemon name to search with
            </small>
          </div>
          <div className="text-center">
            <strong>-or-</strong>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Number</label>
            <input
              type="number"
              name="number"
              value={this.state.number}
              ref={this.input}
              onChange={this.changeHandler}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter pokemon number"
            />
            <small id="emailHelp" className="form-text text-muted">
              Enter the pokemon number to search with
            </small>
          </div>
          <button
            className="btn3d btn btn-danger"
            disabled={!this.state.name && !this.state.number}
          >
            Submit
          </button>{" "}
          &nbsp;
          <button className="btn3d btn btn-warning" onClick={this.Surprise}>
            Surprise Me!
          </button>
        </form>
      </div>
    );
  }

  Search = e => {
    this.setState({
      inProgress: true
    });
    e.preventDefault();
    var self = this;
    axios
      .get("https://pokeapi.co/api/v2/pokemon/" + this.state.value + "/")
      .then(res => {
        axios
          .get("https://pokeapi.co/api/v2/evolution-chain/" + res.data.id)
          .then(resEv => {
            console.log(resEv);
          })
          .catch(function(error) {

          });
        self.setState({
          inProgress: false,
          error: false
        });
        self.getContent(res);
      })
      .catch(function(error) {
        self.setState({
          inProgress: false,
          error: true
        });
        self.getContent(error);
      });
  };

  Surprise = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      inProgress: true
    });
    let range = 801 - 0;
    let value = Math.round(Math.random() * range + 0);
    axios.get("https://pokeapi.co/api/v2/pokemon/" + value + "/").then(res => {
      axios
      .get("https://pokeapi.co/api/v2/evolution-chain/" + res.data.id)
      .then(resEv => {
        console.log(resEv);
      }).catch(function(error){
        
      })
      this.getContent(res);
      this.setState({
        inProgress: false
      });
    });
  };

  getContent(value) {
    if (this.state.error) {
      value = { data: "Error" };
      this.props.callback(value);
    } else {
      this.props.callback(value);
    }
  }

  changeHandler(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      value: value.toLowerCase()
    });

    this.resetOther(name);
  }

  resetOther(name) {
    if (name === "name") {
      this.setState({
        number: ""
      });
    } else {
      this.setState({
        name: ""
      });
    }
  }
}

Search.protoTypes = {
  callback: PropTypes.func
};

export default Search;
