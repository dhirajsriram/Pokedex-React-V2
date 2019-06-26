import React from "react";

class Blocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      childProperty: "",
      toggled: false
    };
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    let results;
    if (this.props.data) {
      results = this.props.data.data;
      if (this.props.data.blockName.toString().toLowerCase() === "abilities") {
        this.childProperty = "ability";
      }
      if (this.props.data.blockName.toString().toLowerCase() === "moves") {
        this.childProperty = "move";
      }
    }
    return (
      <div>
        {results ? (
          <div>
            <br />
            <div>
              <a
                onClick={() => this.handleClick(this.props.data.blockName)}
                className={
                  this.props.data.expand
                    ? "card-title text-capitalize text-dark"
                    : "card-title text-capitalize"
                }
                data-toggle={this.props.data.expand ? "collapse" : null}
                href={this.props.data.expand ? "#collapseExample" : null}
                role={this.props.data.expand ? "button" : null}
                aria-expanded={this.props.data.expand ? "false" : null}
                aria-controls={
                  this.props.data.expand ? "collapseExample" : null
                }
              >
                <strong>{this.props.data.blockName}</strong>
              </a>
              {this.props.data.expand && (
                <span className="float-right">
                  <i
                    className={
                      this.state.toggled
                        ? "fas fa-arrow-circle-up"
                        : "fas fa-arrow-circle-down"
                    }
                  />
                </span>
              )}
            </div>
            <div
              className={
                this.props.data.expand
                  ? "collapse card-text bg-dark text-white rounded p-2"
                  : "card-text bg-dark text-white rounded p-2"
              }
              id={this.props.data.expand ? "collapseExample" : null}
            >
              {this.props.data.blockName !== "Stats" ? (
                <div className="row">
                  {results.data[
                    this.props.data.blockName.toString().toLowerCase()
                  ]
                    .slice(
                      0,
                      this.props.data.blockName === "moves"
                        ? results.data[
                            this.props.data.blockName.toString().toLowerCase()
                          ].length
                        : 6
                    )
                    .map((value, index) => (
                      <div className="col-sm-6" key={index}>
                        {value[this.childProperty].name}
                      </div>
                    ))}{" "}
                </div>
              ) : (
                <div className="row">
                  <div className="col-sm-6">
                    <strong>Number</strong> <br />#{results.data.id}
                  </div>
                  <div className="col-sm-6">
                    <strong>Base exp</strong> <br />{" "}
                    {results.data["base_experience"]}
                  </div>
                  <div className="col-sm-6">
                    <strong>Height</strong> <br /> {results.data.height / 10} m
                  </div>
                  <div className="col-sm-6">
                    <strong>Weight</strong> <br /> {results.data.weight / 10} kg
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
  handleClick = name => {
    if (name === "Moves") {
      this.setState(prevState => ({
        toggled: !prevState.toggled
      }));
    }
  };
}

export default Blocks;
