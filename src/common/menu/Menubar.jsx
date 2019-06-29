import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Search from './Search';
import Drawer from './Drawer';
import { Link } from "react-router-dom";

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

function ElevationScroll(props) {
	const { children, window } = props;
	const trigger = useScrollTrigger({
	  disableHysteresis: true,
	  threshold: 0,
	  target: window ? window() : undefined,
	});
  
	return React.cloneElement(children, {
	  elevation: trigger ? 4 : 0,
	});
  }
  
  ElevationScroll.propTypes = {
	children: PropTypes.node.isRequired,
	window: PropTypes.func,
  };  

export default function Menubar(props) {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<React.Fragment>
				<CssBaseline />
					<AppBar>
						<Toolbar>
							<Drawer></Drawer>
							<Typography className={classes.title} noWrap>
							<Link to="/home" className="default-text"><img src={require("../../assets/healthdex.png")} alt="logo" className="logo"></img></Link>
							</Typography>
							<Search />
						</Toolbar>
					</AppBar>
				<Toolbar />
			</React.Fragment>
		</div>
	);
}
