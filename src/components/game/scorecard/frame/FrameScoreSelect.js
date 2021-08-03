import React from "react";
import { MenuItem, Select } from "@material-ui/core";

export const scores = [
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

const FrameScoreSelect = (props) => {
  const handleChange = (e) => {
    props.setScore(e.target.value);
  };

  const renderOptions = () => {
    // if true, that means this is the second score in a frame
    if (
      (props.firstScore !== undefined && !props.tenthFrame) ||
      (props.tenthFrame &&
        props.firstScore !== "STRIKE" &&
        props.firstScore !== "SPARE")
    ) {
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

  const checkToDisable = () => {
    if (props.tenthFrame) {
      return props.firstScore !== "" ? false : true;
    }

    return props.firstScore === "STRIKE" ||
      (props.firstScore !== undefined &&
        !props.firstScore &&
        props.firstScore !== 0)
      ? true
      : false;
  };
  // disable the select if there is not a firstScore when the prop exists
  // or if the firstScore was a strike
  return (
    <Select
      style={{ width: "100%" }}
      disabled={checkToDisable()}
      IconComponent={checkToDisable() ? "none" : undefined}
      disableUnderline
      value={props.score}
      onChange={handleChange}
    >
      {renderOptions()}
    </Select>
  );
};

export default FrameScoreSelect;
