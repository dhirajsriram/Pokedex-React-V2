import React from 'react';
import { InputBase } from "@material-ui/core";

const SearchInput = function(inputProps) {
    const { inputproperties, classes, ref, ...other } = inputProps;
    return (
      <InputBase
        name="Search-pokemon"
        inputProps={{
          inputRef: ref,
          ...inputproperties
        }}
        {...other}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        placeholder={"Search…"}
      />
    );
  }

  export default SearchInput;