import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';	
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Search from './Search';
import Drawer from './Drawer';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1,
    display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block'
		}
	}
}));

export default function Menubar() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Drawer></Drawer>
					<Typography className={classes.title} noWrap>
						<img src={require("../../assets/healthdex.png")} alt="logo" className="logo"></img>
					</Typography>
					<Search />
				</Toolbar>
			</AppBar>
		</div>
	);
}
