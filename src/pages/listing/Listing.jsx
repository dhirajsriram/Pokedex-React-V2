import React from "react";
import Results from "../../common/results/Results";
import FourZeroFour from "../../pages/404/FourZeroFour";
import fetch from 'isomorphic-fetch';

class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      pokeArr: [],
      fullArr: [],
      index: 0
    };
  }

  componentDidMount() {
    this.fetchPokemonArr(this.props.match.params.id);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.trackScrolling);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ pokeArr: [], fullArr: [], index: 0 });
    this.fetchPokemonArr(newProps.match.params.id);
  }

  isBottom(el) {
    return el.getBoundingClientRect().bottom - 1 <= window.innerHeight;
  }

  trackScrolling = () => {
    const wrappedElement = document.body;
    if (this.isBottom(wrappedElement)) {
      if (this.state.index < this.state.fullArr.length) {
        this.setState({ index: this.state.index + 12 });
        let initArr = this.state.fullArr.slice(0, this.state.index);
        this.setState({ pokeArr: initArr });
      }
    }
  };

  async fetchPokemonArr(type) {
	document.addEventListener("scroll", this.trackScrolling);
    try {
      let response = await fetch(`https://pokeapi.co/api/v2/type/` + type);
      response = await response.json();
      let pokemonArr = response.pokemon;
      let initArr = pokemonArr.map(number =>
        number.pokemon.url
          .replace("https://pokeapi.co/api/v2/pokemon/", "")
          .replace("/", "")
      );
      this.setState({
        pokeArr: initArr.slice(0, 12),
        fullArr: initArr,
        index: this.state.index + 12
      });
    } catch (err) {
      this.setState({pokeArr : {error:"true"}}) // TypeError: failed to fetch
    }
  }

  render() {
    return (
      <React.Fragment>
		  { !this.state.pokeArr.error ?
        <Results pokeArr={this.state.pokeArr} />: <FourZeroFour></FourZeroFour>}
      </React.Fragment>
    );
  }
}

export default Listing;
