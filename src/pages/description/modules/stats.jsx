import React, { useEffect,useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { createMuiTheme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { ThemeProvider } from '@material-ui/styles';

export default function Stats(props) {
	const [maxvalue,setmaxValue] = useState(0)
	const [totalValue,setTotalValue] = useState(0)
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
		filledChip: {
			margin: theme.spacing(1),
			width: '100%',
			zIndex: '10',
			borderTopRightRadius: 0,
			borderBottomRightRadius: 0
		},
		heading: {
			color: props.color,
			padding:4
		},
		statsValue: {
			margin: '8px 0px',
			width: 0,
			transition: 'all 1s ease',
			borderTopLeftRadius: 0,
			borderBottomLeftRadius: 0,
			background: props.color + '80',
		}
	}));

	const classes = useStyles();

	useEffect(()=>{
		var maxval =Math.max.apply(Math, props.pokemonData.stats.map(function(o) { return o.base_stat; }))
		setmaxValue(maxval)
		var totalVal = props.pokemonData.stats.reduce((a, b) => a + (b["base_stat"] || 0), 0);
		setTotalValue(totalVal)
		},[])

	return (
		<ThemeProvider theme={theme}>
			<Card className={classes.card}>
				<CardContent>
					<Typography variant="h6" align="center" className={classes.heading}>
						Base Stats
					</Typography>
					<Grid container>
						{props.pokemonData.stats.map(function(val, i) {
							return (
								<React.Fragment key={i}>
									<Grid item xs={4} sm={2}>
										<Chip label={val.stat.name} className={classes.filledChip} color="primary" />
									</Grid>
									<Grid item xs={8} sm={10}>
										<Chip
											className={classes.statsValue + ' transform'}
											style={{ width: ((val.base_stat/maxvalue) * 100) + "%" , minWidth : "10%" }}
											label={val.base_stat}
											color="primary"
											align="right"
										>
										</Chip>
									</Grid>
								</React.Fragment>
							);
						})}
					</Grid>
					<Typography variant="subtitle2" align="center" className={classes.heading}>
						Total: {totalValue}
					</Typography>
				</CardContent>
			</Card>
		</ThemeProvider>
	);
}
