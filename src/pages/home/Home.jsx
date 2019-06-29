import React from 'react';
import Results from './results/Results';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			number: 0,
			pokeArr: [],
			randomized: false
		};
	}

	componentDidMount() {
		let initArr = Array.from(Array(24).keys(), (x) => x + 1);
		this.setState({ pokeArr: initArr });
		document.addEventListener('scroll', this.trackScrolling);
	}

	componentWillUnmount() {
		document.removeEventListener('scroll', this.trackScrolling);
	}

	isBottom(el) {
		return el.getBoundingClientRect().bottom - 400 <= window.innerHeight;
	}

	trackScrolling = () => {
		const wrappedElement = document.body;
		if (this.isBottom(wrappedElement)) {
			if (!this.state.randomized) {
				let initArr = Array.from(Array(this.state.pokeArr.length + 24).keys(), (x) => x + 1);
				this.setState({ pokeArr: initArr });
			} else {
				let arr = Array.from({ length: 24 }, () => Math.floor(Math.random() * 808));
				this.setState({ pokeArr: this.state.pokeArr.concat(arr) });
			}
		}
	};

	calculateRand = (e) => {
		let arr = Array.from({ length: 24 }, () => Math.floor(Math.random() * 808));
		this.setState({ pokeArr: arr, randomized: true });
	};

	SearchData(params) {
		this.setState({
			data: params
		});
	}

	render() {
		return (
			<React.Fragment>
				<Results pokeArr={this.state.pokeArr} />
			</React.Fragment>
		);
	}
}

export default Home;
