import React from "react";
import Results from "./results/Results";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0
    };
  }

  componentDidMount(){
    let arr = Array.from({length: 15}, () => Math.floor(Math.random() * 808 ));
    this.setState({"arrRand":arr})
  }

  SearchData(params) {
    this.setState({
      data: params
    });
    //console.log(this.state.data);
  }
  render() {
    return (
        <React.Fragment>
            <Results data={this.state.data ? this.state.data : this.state.arr}/>
        </React.Fragment>
    );
  }
}

export default Home;
