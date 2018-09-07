import React from 'react';
import "./about.css"

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          number: 0,
        };
      }
    render() {
      return (
        <div>
        <br/>
        <img className="d-block mx-auto" width="100" height="100" alt="pokeball" src="https://static-cdn.jtvnw.net/jtv_user_pictures/55e12d3dd0783458-profile_image-300x300.png"/>
        <div className="jumbotron about-content">
        <div className="padding-top">
        <blockquote className="blockquote text-center p-4">
        <p className="mb-0">I see now that the circumstances of one's birth are irrelevant, It is what you do with the gift of life that determines who you are</p>
        <footer className="blockquote-footer">Someone famous in <cite title="Source Title">mewtwo</cite></footer>
        </blockquote>
        </div>
        </div>
        </div>
      );
    }
  }



  export default About;