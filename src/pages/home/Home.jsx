import React from "react";
import Results from "./results/Results";
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import LoopIcon from '@material-ui/icons/Loop';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      pokeArr: []
    };
  }

  componentDidMount() {
    let initArr = Array.from(Array(24).keys(), x => (x + 1))
    this.setState({ "pokeArr": initArr })
  }

  calculateRand = (e)=> {
    let arr = Array.from({ length: 24 }, () => Math.floor(Math.random() * 808));
    this.setState({ "pokeArr": arr })
  }

  SearchData(params) {
    this.setState({
      data: params
    });
  }

  render() {
    return (
      <React.Fragment>
        <Grid container spacing={4}>
          <Grid container item xs={6} spacing={4}>
            <Fab onClick={this.calculateRand} variant="extended" color="primary" aria-label="Add">
              <LoopIcon />
               Surprise Me!
            </Fab>
          </Grid>
          <Grid container item xs={6} spacing={4}>
            
          </Grid>
        </Grid>
        <Results pokeArr={this.state.pokeArr} />
      </React.Fragment>
    );
  }
}

export default Home;
