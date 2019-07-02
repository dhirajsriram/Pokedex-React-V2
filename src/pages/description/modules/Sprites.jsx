import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

export default function Sprites(props) {
	const theme = createMuiTheme({
		palette: {
			primary: {
				main: props.color,
				contrastText: '#fff'
			},
			secondary: { A400: '#ffffff', contrastText: props.color } // custom color in hex
		}
	});

	const useStyles = makeStyles((theme) => ({
		chip: {
			margin: theme.spacing(1),
			width: '100%'
		},
		heading: {
			color: props.color
		}
	}));

	const classes = useStyles();
	const Spritebase = 'http://www.pokestadium.com/sprites/xy/';
	return (
		<ThemeProvider theme={theme}>
			<Card className={classes.card}>
				<CardContent>
					<Typography variant="h6" align="center" className={classes.heading}>
						Normal
					</Typography>
					<Grid container>
						<Grid item xs={6} align="center">
							<img
								src={Spritebase + props.pokemonData.name + '.gif'}
								alt={props.pokemonData.name + '-f-sprite'}
							/>
						</Grid>
						<Grid item xs={6} align="center">
							<img
								src={Spritebase + '/back/' + props.pokemonData.name + '.gif'}
								alt={props.pokemonData.name + '-b-sprite'}
							/>
						</Grid>
					</Grid>
				</CardContent>
				<CardContent>
					<Typography variant="h6" align="center" className={classes.heading}>
						Shiny
					</Typography>
					<Grid container>
						<Grid item xs={6} align="center">
							<img
								src={Spritebase + '/shiny/' + props.pokemonData.name + '.gif'}
								alt={props.pokemonData.name + '-f-sprite'}
							/>
						</Grid>
						<Grid item xs={6} align="center">
							<img
								src={Spritebase + '/shiny/back/' + props.pokemonData.name + '.gif'}
								alt={props.pokemonData.name + '-b-sprite'}
							/>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</ThemeProvider>
	);
}
