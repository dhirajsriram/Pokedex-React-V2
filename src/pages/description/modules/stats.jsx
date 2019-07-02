import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { createMuiTheme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { ThemeProvider } from '@material-ui/styles';

export default function Stats(props) {
    const theme = createMuiTheme({
        palette: {
            primary: {
            main: props.color,
            contrastText: '#fff' },
            secondary: { A400: "#ffffff" , contrastText: props.color} // custom color in hex
        }
    });
    
	const useStyles = makeStyles((theme) => ({
		chip: {
			margin: theme.spacing(1),
			width: '100%'
		},
		heading: {
			color: props.color
		},
    })
    );

	const classes = useStyles();

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
									<Chip label={val.stat.name} className={classes.chip} color="primary"/>
								</Grid>
                                <Grid item xs={8} sm={10}>
									<Chip label={val.base_stat} className={classes.chip} color="secondary"/>
								</Grid>
							</React.Fragment>
						);
					})}
				</Grid>
			</CardContent>
		</Card>
        </ThemeProvider>
	);
}
