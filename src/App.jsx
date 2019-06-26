import React, { Component } from 'react';
import './App.css';
import Home from './Home/Home';
import Menubar from './common/menu/Menubar';
import About from './about/about';
import { Route } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { red } from '@material-ui/core/colors';

const theme = createMuiTheme({
	palette: {
		primary: { main: red[500] }, // Purple and green play nicely together.
		secondary: { main: '#11cb5f' } // This is just green.A700 as hex.
	}
});

class App extends Component {
	constructor() {
		super();
		this.state = {
			data: ''
		};
	}

	render() {
		return (
			<ThemeProvider theme={theme}>
				<Menubar />
				<Route exact path="/" component={Home} />
				<Route exact path="/about" component={About} />
			</ThemeProvider>
		);
	}
}

export default App;
