import React from "react";
import Results from "./results/Results";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      arrRand:[],
      data:{}
    };
  }

  componentDidMount(){
    let arr = Array.from({length: 16}, () => this.numberPadding(Math.floor(Math.random() * 808 ),3));
    this.setState({"arrRand":arr})
  }

  numberPadding(number,size){
  var s = String(number);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
  }

  SearchData(params) {
    this.setState({
      data: params
    });
  }
  render() {
    return (
        <React.Fragment>
            <Results data={this.state.data} arr={this.state.arrRand}/>
        </React.Fragment>
    );
  }
}

export default Home;
