import React, { Component } from 'react';
import './App.css';
import Home from './pages/home/Home';
import Menubar from './common/menu/Menubar';
import { Route , Switch } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { grey } from '@material-ui/core/colors';
import { description } from './pages/description/description'
import { TypeProvider } from "./common/context/typesContext";
import Listing from "./pages/listing/Listing"

const theme = createMuiTheme({
	palette: {
		primary: { main: grey[50] }, 
		secondary: { main: '#11cb5f' }
	}
});

class App extends Component {
	constructor() {
		super();
		this.state = {
			data: ''
		};
	}
	
	findType(type) {
		switch (type) {
		  case "normal":
			return "#A8A878"
		  case "fighting":
			return "#C03028"
		  case "flying":
			return "#A890F0"
		  case "poison":
			return "#b97fc9"
		  case "ground":
			return "#E0C068"
		  case "rock":
			return "#705848"
		  case "ghost":
			return "#705898"
		  case "steel":
			return "#B8B8D0"
		  case "fire":
			return "#fd7d24"
		  case "water":
			return "#4592c4"
		  case "grass":
		  case "bug":
			return "#729f3f"
		  case "electric":
			return "#F8D030"
		  case "psychic":
			return "#F85888"
		  case "ice":
			return "#37EDF1";
		  case "dragon":
			return "#B8A038"
		  case "dark":
			return "#3a3a3a";
		  case "fairy":
			return "#EE99AC"
		  default:
		}
	  }

	render() {
		return (
			<TypeProvider value={{
				state: this.state,
				findType: this.findType,
			}}>
			<ThemeProvider theme={theme}>
				<Menubar/>
				<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/Home" component={Home} />
				<Route exact path="/results/:id" component={Listing} />
				<Route exact path="/description/:id" component={description} />
				</Switch>
			</ThemeProvider>
			</TypeProvider>
		);
	}
}

export default App;
