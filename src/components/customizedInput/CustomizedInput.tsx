import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const focusedColor = "#27AE60";
const useStyles = makeStyles({
  root: {
    // input label when focused
    "& label.Mui-focused": {
      color: focusedColor
    },
    // focused color for input with variant='standard'
    "& .MuiInput-underline:after": {
      borderBottomColor: focusedColor
    },
    // focused color for input with variant='filled'
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: focusedColor
    },
    // focused color for input with variant='outlined'
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: focusedColor
      }
    }
  }
});

export default function CustomizedInputs() {
  const classes = useStyles();

  return (
    <div>
      <TextField
        className={classes.root}
        variant="outlined"
        label="Custom CSS"
      />
      <TextField
        className={classes.root}
        variant="standard"
        label="Custom CSS"
      />
      <TextField className={classes.root} variant="filled" label="Custom CSS" />
    </div>
  );
}
