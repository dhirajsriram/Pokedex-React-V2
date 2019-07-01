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
import Types from '../../common/pokemon/Types';
import Card from "@material-ui/core/Card";

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
			{(context) => (
				<React.Fragment>
					<Container className={classes.container}>
						<Typography
							component="div"
							style={{
								backgroundColor: context.findType(
									props.match.params.id
										? props.match.params.id
										: pokemonData.types[1] ? pokemonData.types[1].type.name : pokemonData.types[0].type.name
								)
							}}
						>
							<Card className={classes.card}>
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
								<div xs={6}>
									<Typography gutterBottom variant="h5" component="h2" className={classes.text}>
										{pokemonData.name}
									</Typography>
									{pokemonData.types &&
										pokemonData.types.map(function(val, i) {
											return <Types name={val.type.name} key={i} />;
										})}
								</div>
							</Grid>
							</Card>
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
				</React.Fragment>
			)}
		</PokemonConsumer>
	);
}
