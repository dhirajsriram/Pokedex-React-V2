import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

export default function StatsBlock(props) {
    const useStyles = makeStyles({
        card: {},
        media: {
          height: 140
        },
        border: {
          border: "1px solid "+props.textcolor,
          color : "#3a3a3a",
          padding: 10,
          borderRadius:"5px",
          lineHeight: 1.5
        },
        heading:{
          color:props.textcolor
        }
      });
      const classes = useStyles();
    return (<React.Fragment>
      <Typography
        variant="subtitle1"
        color="textSecondary"
        align="center"
        component="div"
        className={classes.border}
        {...props}
      >
          <Typography
        variant="h6"
        component="div"
        align="center"
        className={classes.heading} 
      >{props.title}</Typography>
        {props.content}
      </Typography></React.Fragment>);
  }