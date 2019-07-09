import React from 'react';
import Results from '../../common/results/Results';
import Fab from '@material-ui/core/Fab';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			number: 0,
			pokeArr: [],
			randomized: false,
			randToggle:false,
			anchorEl: null
		};
	}

	componentDidMount() {
		let initArr = Array.from(Array(12).keys(), (x) => x + 1);
		this.setState({ pokeArr: initArr });
		document.addEventListener('scroll', this.trackScrolling);
	}

	componentWillUnmount() {
		document.removeEventListener('scroll', this.trackScrolling);
	}

	isBottom(el) {
		return el.getBoundingClientRect().bottom - 1 <= window.innerHeight;
	}

	trackScrolling = () => {
		const wrappedElement = document.body;
		if (this.isBottom(wrappedElement)) {
			if (!this.state.randomized) {
				let initArr = Array.from(Array(this.state.pokeArr.length + 12).keys(), (x) => x + 1);
				this.setState({ pokeArr: initArr });
			} else {
				let arr = Array.from({ length: 12 }, () => Math.floor(Math.random() * 808));
				this.setState({ pokeArr: this.state.pokeArr.concat(arr) });
			}
		}
	};

	calculateRand = (e) => {
		let arr = Array.from({ length: 12 }, () => Math.floor(Math.random() * 808));
		this.setState({pokeArr:[]},() =>{this.setState({ pokeArr: arr, randomized: true , randToggle: !this.state.randToggle})});
		this.handleClose()
	};

	handleClick = (e) => {
		this.setState({ "anchorEl": e.currentTarget });
	}

	handleClose = (e) => {
		this.setState({ "anchorEl": null });
	}

	render() {
		return (
			<React.Fragment>
				<Fab aria-controls="simple-menu" className="more-options" aria-haspopup="true" onClick={this.calculateRand}>
					<img alt="randomise-icon" className={this.state.randToggle ? "transform-active transform": "transform"} src={require("../../assets/Pokeball.png")} width="28"></img>
				</Fab>
				<Results pokeArr={this.state.pokeArr}/>
			</React.Fragment>
		);
	}
}

export default Home;
