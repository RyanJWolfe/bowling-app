import React, { useState } from "react";
import { makeStyles, MenuItem, Select } from "@material-ui/core";

import { scores } from "./ScoreForm";

const ScoreFormTen = (props) => {
  const handleChange = (e) => {
    props.setScore(e.target.value);
  };

  const renderOptions = () => {
    return scores.map((option) => {
      if (option.value !== "SPARE") {
        return (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        );
      } else return null;
    });
  };

  // disable the select if the previous score was an open
  return (
    <Select
      disabled={
        props.prevScore === "STRIKE" || props.prevScore === "SPARE"
          ? false
          : true
      }
      IconComponent={undefined}
      disableUnderline
      value={props.score}
      onChange={handleChange}
    >
      {renderOptions()}
    </Select>
  );
};

export default ScoreFormTen;
