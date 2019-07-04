import React from 'react';
import Grid from '@material-ui/core/Grid';
import Pokemon from '../pokemon/Pokemon';

const PokemonList = (props) => {
	return (
		<Grid item xs={12} sm={6}>
			<Pokemon number={props.number} descriptionPage={false} page={"Listing"}/>
		</Grid>
	);
}

class Results extends React.Component {
	constructor(props) {
		super();
		this.state = {
			pokeArr: []
		};
	}
	componentDidMount() {
		let initArr = Array.from(Array(12).keys(), (x) => x + 1);
		this.setState({ pokeArr: initArr })
	}

	render() {
		return (
			<div>
				<Grid container item xs={12} spacing={4}>
					{this.props.pokeArr && this.props.pokeArr.map(function (val, i) {
						return (
							<PokemonList number={val} key={i}></PokemonList>
						)
					})}
				</Grid>
			</div>
		);
	}
}

export default Results;

