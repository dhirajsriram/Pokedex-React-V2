import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Icon from "@material-ui/core/Icon";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

export default function FourZeroFour() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Typography component="div" style={{ height: "92vh" }}>
          <div className="loader-container-dizzy">
            <div className="loader-dizzy" />
          </div>
          <Typography component="div" align="center" variant="h3">
            404
          </Typography>
          <br />
          <Typography component="div" align="center" variant="h6">
            Page not found
          </Typography>
          <Typography component="div" align="center" variant="subtitle1">
            The page that you are looking for cannot be found
          </Typography>
          <br />
          <Link to="/" className="default-text">
            <Typography component="div" align="center" variant="subtitle1">
            <Button><Icon>home</Icon></Button>
            </Typography>
          </Link>
        </Typography>
      </Container>
    </React.Fragment>
  );
}
