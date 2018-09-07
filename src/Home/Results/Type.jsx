import React from "react";

class Type extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    let results;
    if (this.props.data) {
      results = this.props.data;
    }
    return (
      <div>
        {results ? (
          <div>
            <a className="card-title text-capitalize">
              <strong>Type</strong>
            </a>
            <div className="card-text bg-dark text-white rounded p-2">
              <div className="row">
                {results.data.data["types"].map((value, index) => (
                  <div className="col-sm-6" key={index}>
                    <img
                      width="20"
                      height="20"
                      src={this.imageType(value["type"].name)}
                      alt="type-img"
                    />
                    &nbsp;
                    <span className="font-weight-bold text-capitalize">
                      {value["type"].name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
  imageType = value => {
    let imageName;
    let imageVal = value;
    switch (imageVal) {
      case "ice":
        imageName = "water";
        break;
      case "poison":
        imageName = "grass";
        break;
      case "bug":
        imageName = "grass";
        break;
      case "flying":
        imageName = "normal";
        break;
      case "ground":
        imageName = "fighting";
        break;
      case "ghost":
        imageName = "psychic";
        break;
      case "rock":
        imageName = "fighting";
        break;
      default:
        imageName = value;
        break;
    }
    return require("../../assets/" + imageName + ".png");
  };
}

export default Type;
