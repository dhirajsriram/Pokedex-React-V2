import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { grey } from '@material-ui/core/colors';
import Menubar from './common/menu/Menubar';
const Home = React.lazy(() => import('./pages/home/Home'));
const Description = React.lazy(() => import('./pages/description/Description'));
const Listing = React.lazy(() => import('./pages/listing/Listing'));
const FourZeroFour = React.lazy(() => import('./pages/404/FourZeroFour'));

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
			<ThemeProvider theme={theme}>
				<Menubar />
				<div className="main-container">
					<React.Suspense fallback={<div>Loading...</div>}>
						<Switch>
							<Route exact path="/" render={(props) => <Home {...props} />} />
							<Route exact path="/results/:id" render={(props) => <Listing {...props} />} />
							<Route exact path="/description/:id" render={(props) => <Description {...props} />} />
							<Route render={(props) => <FourZeroFour {...props} />} />
						</Switch>
					</React.Suspense>
				</div>
			</ThemeProvider>
		);
	}
}

export default App;
