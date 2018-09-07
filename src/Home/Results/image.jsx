import React from "react";

class Image extends React.Component {
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
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          />
          <li data-target="#carouselExampleIndicators" data-slide-to="1" />
          <li data-target="#carouselExampleIndicators" data-slide-to="2" />
          <li data-target="#carouselExampleIndicators" data-slide-to="3" />
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="card-img-top mx-auto d-block"
              src={results.data.sprites["front_default"]}
              alt="pokemon logo"
            />
            <div className="carousel-caption d-none d-md-block">
              <p>Front Default</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              className="card-img-top mx-auto d-block"
              src={results.data.sprites["back_default"]}
              alt="pokemon logo"
            />
            <div className="carousel-caption d-none d-md-block">
              <p>Back Default</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              className="card-img-top mx-auto d-block"
              src={results.data.sprites["front_shiny"]}
              alt="pokemon logo"
            />
            <div className="carousel-caption d-none d-md-block">
              <p>Front shiny</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              className="card-img-top mx-auto d-block"
              src={results.data.sprites["back_shiny"]}
              alt="pokemon logo"
            />
            <div className="carousel-caption d-none d-md-block">
              <p>Back shiny</p>
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
  }
}

export default Image;
