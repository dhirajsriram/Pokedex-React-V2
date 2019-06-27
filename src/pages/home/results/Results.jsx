import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Pokemon from '../../../common/pokemon/Pokemon';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	pokemon: {
		height: 300
	}
}));

export default function Results(props) {
	const classes = useStyles();
	let properties = props;
	function FormRow(props) {
		return (
			<React.Fragment>
				{properties.pokeArr.map(function (val, i) {
					return (
						<Grid item xs={12} sm={3} key={i}>
							<Pokemon name={"Lizard"} number={val} />
						</Grid>
					);
				})}
			</React.Fragment>
		);
	}

	return (
		<div className={classes.root}>
				<Grid container item xs={12} spacing={4}>
					<FormRow />
				</Grid>
		</div>
	);
}