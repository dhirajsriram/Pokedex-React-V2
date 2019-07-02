import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Pokemon from '../../common/pokemon/Pokemon';
import { PokemonConsumer } from '../../common/context/pokemonContext';
import Bio from './modules/Bio';
import Stats from './modules/Stats';
import Abilities from './modules/Abilities';
import BottomNavigation from './modules/BottomNavigation';
import Sprites from './modules/Sprites';

export default function Description(props) {
	const [ pokemonData, setPokemonData ] = React.useState({});
	const useStyles = makeStyles({
		container: {
			margin: '0',
			width: '100% !important',
			minHeight: '100vh',
			maxWidth: '100%',
			overflow: 'hidden'
		},
		pokemonBlocks: {
			margin: '20px 0px'
		},
		pokemon: {
			width: '50%',
			margin: 'auto',
			display: 'block',
			marginBottom: 70
		},
		BottomNavigation: {
			width: '100%',
			position: 'fixed',
			bottom: '0'
		},
		'@media (max-width: 800px)': {
			pokemon: {
				width: '100%'
			}
		}
	});

	const classes = useStyles();

	useEffect(() => {
		fetchPokemonData();
	}, []);

	useEffect(
		() => {
			fetchPokemonData();
		},
		[ props.match.params.id ]
	);

	async function fetchPokemonData() {
		let response = await fetch('https://pokeapi.co/api/v2/pokemon/' + props.match.params.id);
		response = await response.json();
		setPokemonData(response);
	}

	function returnType(context) {
		return context.findType(pokemonData.types[1] ? pokemonData.types[1].type.name : pokemonData.types[0].type.name);
	}

	return (
		<PokemonConsumer>
			{(context) => (
				<React.Fragment>
					{pokemonData.name && (
						<Container
							className={classes.container}
							style={{
								background: returnType(context)
							}}
							spacing={8}
						>
							<Grid className={classes.pokemon}>
								<div className={classes.pokemonBlocks}>
									<Pokemon number={pokemonData.id} pokemonData={pokemonData} descriptionPage={true} />
								</div>
								<div className={classes.pokemonBlocks}>
									<Bio
										pokemonData={pokemonData}
										color={returnType(context)}
									/>
								</div>
								<div className={classes.pokemonBlocks}>
									<Abilities
										pokemonData={pokemonData}
										color={returnType(context)}
									/>
								</div>
								<div className={classes.pokemonBlocks}>
									<Sprites
										pokemonData={pokemonData}
										color={returnType(context)}
									/>
								</div>
								<div className={classes.pokemonBlocks}>
									<Stats
										pokemonData={pokemonData}
										color={returnType(context)}
									/>
								</div>
							</Grid>
							<footer>
								<BottomNavigation
									color={returnType(context)}
								/>
							</footer>
						</Container>
					)}
				</React.Fragment>
			)}
		</PokemonConsumer>
	);
}
