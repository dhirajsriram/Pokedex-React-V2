import React, { Component } from 'react';
import './App.css';
import Home from './pages/home/Home';
import { Route, Switch } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { grey } from '@material-ui/core/colors';
import Description from './pages/description/Description';
import { PokemonProvider } from './common/context/pokemonContext';
import Listing from './pages/listing/Listing';
import Menubar from './common/menu/Menubar';
import FourZeroFour from './pages/404/FourZeroFour';

const theme = createMuiTheme({
	palette: {
		primary: { main: grey[50] }
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
			<PokemonProvider
				value={{
					state: this.state
				}}
			>
				<ThemeProvider theme={theme}>
							<React.Fragment>
								<Menubar/>
								<div className="main-container">
								<Switch>
									<Route exact path="/" component={Home} />
									<Route exact path="/results/:id" component={Listing} />
									<Route exact path="/description/:id" component={Description} />
									<Route component={FourZeroFour} />
								</Switch>
								</div>
							</React.Fragment>
						)}
				</ThemeProvider>
			</PokemonProvider>
		);
	}
}

export default App;
