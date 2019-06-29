import React from 'react';
import Results from '../../common/results/Results';

class Listing extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			type:"",
			pokeArr:[],
			fullArr:[],
			index:0,
		};
	}

	componentDidMount() {
		this.fetchPokemonArr(this.props.match.params.id);
	}
	
	componentWillUnmount() {
		document.removeEventListener('scroll', this.trackScrolling);
	}

	componentWillReceiveProps(newProps){
		this.setState({"pokeArr" : [],"fullArr": []	,"index":0})
		this.fetchPokemonArr(newProps.match.params.id)
	}

	isBottom(el) {
		return el.getBoundingClientRect().bottom - 400 <= window.innerHeight;
	}

	trackScrolling = () => {
		const wrappedElement = document.body;
		if (this.isBottom(wrappedElement)) {
			this.setState({"index":this.state.index + 24})
			if(this.state.index < this.state.fullArr.length){
				let initArr = this.state.fullArr.slice(0,this.state.index);
				this.setState({ pokeArr: initArr });
			}
		}
	};

	async fetchPokemonArr(type){
		document.addEventListener('scroll', this.trackScrolling);
		let response = await fetch(`https://pokeapi.co/api/v2/type/` + type)
    	response = await response.json()
		let pokemonArr = response.pokemon;
		console.log(pokemonArr);
		let initArr = pokemonArr.map(number => number.pokemon.url.replace("https://pokeapi.co/api/v2/pokemon/", "").replace("/", ""));
		this.setState({"pokeArr" : initArr.slice(0,24),"fullArr": initArr,"index":this.state.index + 24})
	}

	render() {
		return (
			<React.Fragment>
				<Results pokeArr={this.state.pokeArr}/>
			</React.Fragment>
		);
	}
}

export default Listing;
