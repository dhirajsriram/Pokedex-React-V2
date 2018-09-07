import React from "react";
import Search from "./Search/Search";
import Results from "./Results/Results";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0
    };
  }
  SearchData(params) {
    this.setState({
      data: params
    });
    //console.log(this.state.data);
  }
  render() {
    return (
      <div>
        <div className="jumbotron row">
          <div className="col-sm-6">
            <Search callback={this.SearchData.bind(this)} />
          </div>
          <div className="col-sm-6">
            <Results data={this.state.data} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
