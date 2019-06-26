import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Pokemon from '../../../common/pokemon/Pokemon';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.text.secondary
	}
}));

export default function Results(props) {
	const classes = useStyles();
	let properties = props;
	function FormRow(props) {
		return (
			<React.Fragment>
				{console.log(properties)}
				{properties.arr.map(function(val, i) {
					return (
						<Grid item xs={12} sm={3} key={i}>
							<Pokemon image={"https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" + val + ".png"}/>
						</Grid>
					);
				})}
			</React.Fragment>
		);
	}

	return (
		<div className={classes.root}>
			<Grid container spacing={4}>
				<Grid container item xs={12} spacing={4}>
					<FormRow />
				</Grid>
			</Grid>
		</div>
	);
}
