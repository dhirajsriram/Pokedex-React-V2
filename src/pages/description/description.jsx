import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import { PokemonConsumer } from '../../common/context/pokemonContext';

const useStyles = makeStyles({
	container: {
		margin: '0',
		padding: '0',
		width: '100%',
		height: '100vh',
		maxWidth: '100%'
	},
	BottomNavigation: {
		width: '100%',
		position: 'fixed',
		bottom: '0'
	}
});

export default function Description(props) {
	const classes = useStyles();
	const [ value, setValue ] = React.useState(0);
	const [ pokemonData, setPokemonData ] = React.useState({});

	useEffect(() => {
		fetchPokemonData();
	}, []);

	async function fetchPokemonData() {
		let response = await fetch('https://pokeapi.co/api/v2/pokemon/' + props.match.params.id);
		response = await response.json();
		setPokemonData(response);
	}

	return (
		<PokemonConsumer>
			{(context) => {
				<React.Fragment>
					<Container className={classes.container}>
						<Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
							<Grid>
								<img
									xs={6}
									src={
										'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' +
										context.numberPadding(pokemonData.id, 3) +
										'.png'
									}
									alt={pokemonData.name + ' image'}
								/>
							</Grid>
						</Typography>
						<BottomNavigation
							value={value}
							onChange={(event, newValue) => {
								setValue(newValue);
							}}
							showLabels
							className={classes.BottomNavigation}
						>
							<BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
							<BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
							<BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
						</BottomNavigation>
					</Container>
				</React.Fragment>;
			}}
		</PokemonConsumer>
	);
}
