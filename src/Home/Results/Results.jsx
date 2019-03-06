import React from "react";
import "./Results.css";
import Blocks from "./Blocks";
import Type from "./Type";
import Image from "./image";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""
    };
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    let results;
    if (this.props.data) {
      results = this.props.data;
    }
    return (
      <div>
        {results ? (
          <div className="pokemon-data">
            {results.data !== "Error" ? (
              <div className="row">
                <div className="col-sm-6 bg-dark">
                  <div className="">
                    <h5 className="card-title text-capitalize p-3 text-light">
                      {results.data.name}
                    </h5>
                    <Image data={results} />
                  </div>
                </div>
                <div className="col-sm-6 pokemon-info">
                  <div className="card-body">
                    <Type data={{ blockName: "Type", data: results }} />
                    <Blocks data={{ blockName: "Stats", data: results }} />
                    <Blocks data={{ blockName: "Abilities", data: results }} />
                    <Blocks
                      data={{ blockName: "Moves", data: results, expand: true }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-dark p-5">
                <img
                  width="100"
                  height="100"
                  alt="error"
                  className="d-block m-auto"
                  src="https://cdn.bulbagarden.net/upload/thumb/7/77/201Unown.png/250px-201Unown.png"
                />
                <h3 className="text-center text-light">Unknown</h3>
                <p className="text-light text-center p-3">
                  The pokemon you are looking for cannot be found. Kindly search
                  with a different name or number
                </p>
              </div>
            )}
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default Results;
