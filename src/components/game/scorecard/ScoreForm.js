import React, { useState } from "react";
import { makeStyles, MenuItem, Select } from "@material-ui/core";

const scores = [
  {
    value: 0,
    label: "-",
  },
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 6,
    label: "6",
  },
  {
    value: 7,
    label: "7",
  },
  {
    value: 8,
    label: "8",
  },
  {
    value: 9,
    label: "9",
  },
  {
    value: "SPARE",
    label: "/",
  },
  {
    value: "STRIKE",
    label: "X",
  },
];

const ScoreForm = (props) => {
  const handleChange = (e) => {
    props.setScore(e.target.value);
  };

  const renderOptions = () => {
    // if this prop exists, that means this is the second score in a frame
    if (props.firstScore !== undefined) {
      // filter the options to show based on the first score
      return scores.map((option) => {
        if (option.value === "STRIKE") {
          return null;
        }

        if (option.value !== "SPARE") {
          if (option.value + props.firstScore >= 10) {
            return null;
          }
        }

        return (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        );
      });
    } else {
      // this is the first score in the frame, can't have a spare
      return scores.map((option) => {
        if (option.value !== "SPARE") {
          return (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          );
        } else return null;
      });
    }
  };

  return (
    <Select
      disabled={
        props.firstScore === "STRIKE" ||
        (props.firstScore !== undefined &&
          !props.firstScore &&
          props.firstScore !== 0)
          ? true
          : false
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

export default ScoreForm;
