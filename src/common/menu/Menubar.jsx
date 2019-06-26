import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Search from './Search';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	list: {
		width: 250
	},
	fullList: {
		width: 'auto'
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
	const [ state, setState ] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false
	});
	const toggleDrawer = (side, open) => (event) => {
		console.log('here');
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setState({ ...state, [side]: open });
	};
	const sideList = (side) => (
		<div
			className={classes.list}
			role="presentation"
			onClick={toggleDrawer(side, false)}
			onKeyDown={toggleDrawer(side, false)}
		>
			<List>
				{[ 'Inbox', 'Starred', 'Send email', 'Drafts' ].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{[ 'All mail', 'Trash', 'Spam' ].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</div>
	);
	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						onClick={toggleDrawer('left', true)}
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="Open drawer"
					>
						<MenuIcon />
					</IconButton>
					<Drawer open={state.left} onClose={toggleDrawer('left', false)}>
						{sideList('left')}
					</Drawer>
					<Typography className={classes.title} noWrap>
						<img src={require("../../assets/healthdex.png")} alt="logo" class="logo"></img>
					</Typography>
					<Search />
				</Toolbar>
			</AppBar>
		</div>
	);
}
