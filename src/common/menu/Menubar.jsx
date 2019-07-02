import React, { useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Drawer from './Drawer';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';
import Searchcontainer from './Searchcontainer';
import { withRouter } from "react-router";
import Button from '@material-ui/core/Button';
import MainMenu from "./MainMenu";
import MobileMenu from "./MobileMenu";

const Menubar = withRouter((props) => {
	const [ pokemonType, setpokemonType ] = React.useState("All Types");
	const useStyles = makeStyles((theme) => ({
		grow: {
			flexGrow: 1
		},
		title: {
			display: 'none',
			[theme.breakpoints.up('sm')]: {
				display: 'block'
			}
		},
		search: {
			position: 'relative',
			borderRadius: theme.shape.borderRadius,
			backgroundColor: fade(theme.palette.common.white, 0.15),
			'&:hover': {
				backgroundColor: fade(theme.palette.common.white, 0.25)
			},
			marginRight: theme.spacing(2),
			marginLeft: 0,
			width: '80%',
			[theme.breakpoints.up('sm')]: {
				marginLeft: theme.spacing(3),
				width: '80%'
			}
		},
		sectionDesktop: {
			display: 'none',
			[theme.breakpoints.up('md')]: {
				display: 'flex'
			}
		},
		sectionMobile: {
			display: 'flex',
			[theme.breakpoints.up('md')]: {
				display: 'none'
			}
		},
		typeTheme:{
			color:"white",
			backgroundColor:props.contextProvide.findType(pokemonType)
		}
	}));

	const classes = useStyles();
	const [ anchorEl, setAnchorEl ] = React.useState(null);
	const [ mobileMoreAnchorEl, setMobileMoreAnchorEl ] = React.useState(null);

	useEffect(()=>{
	  let results = "/results/"
      if(window.location.pathname.indexOf("/results/") > -1){
		  setpokemonType(window.location.pathname.replace(results,""))
	  }
	  else{
		setpokemonType("All types")
	  }
	},[window.location.pathname])

	function handleProfileMenuOpen(event) {
		setAnchorEl(event.currentTarget);
	}
	function handleMenuClose(type = null) {
		if(type){
		setpokemonType(type)}
		setAnchorEl(null);
		handleMobileMenuClose();
	}

	function handleMobileMenuClose() {
		setMobileMoreAnchorEl(null);
	}

	function handleMobileMenuOpen(event) {
		setMobileMoreAnchorEl(event.currentTarget);
	}

	const menuId = 'primary-search-account-menu';
	const mobileMenuId = 'primary-search-account-menu-mobile';

	return (
		<div className={classes.grow}>
			<AppBar position="static">
				<Toolbar>
					<Drawer />
					<Typography className={classes.title}>
						<Link to="/" className="default-text">
							<img src={require('../../assets/healthdex.png')} alt="logo" className="logo" />
						</Link>
					</Typography>
					<Searchcontainer />
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						<Button
							edge="end"
							aria-label="Sort by types"
							aria-controls={menuId}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							className={(pokemonType !== "All types") ? classes.typeTheme : ""}
						>
							{pokemonType}
						</Button>
					</div>
					<div className={classes.sectionMobile}>
						<IconButton
							aria-label="Show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						>
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			<MainMenu menuId={menuId} handleMenuClose={handleMenuClose} handleMobileMenuClose={handleMobileMenuClose} anchorEl={anchorEl}></MainMenu>
			<MobileMenu mobileMenuId={mobileMenuId} handleMenuClose={handleMenuClose} handleMobileMenuClose={handleMobileMenuClose} mobileMoreAnchorEl={mobileMoreAnchorEl}></MobileMenu>
		</div>
	);
})

export default Menubar;
