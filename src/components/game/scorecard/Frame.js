import React, { useState, useEffect } from "react";
import { Grid, Box } from "@material-ui/core";

import ScoreForm from "./ScoreForm";

const Frame = (props) => {
  const [firstScore, setFirstScore] = useState("");
  const [secondScore, setSecondScore] = useState("");
  const [total, setTotal] = useState("");

  useEffect(() => {
    if (firstScore) {
      if (firstScore === "STRIKE") {
        // props.number corresponds to the current frame number, so
        // props.frameScores[props.number] is actually the next frame
        // TODO: get next frames scores
        setTotal(10);
      } else {
        if (secondScore) {
          if (secondScore === "SPARE") {
            setTotal(10);
          } else {
            setTotal(firstScore + secondScore);
          }
        } else {
          setTotal(firstScore);
        }
      }
    }
  }, [firstScore, secondScore, props.frameScores]);

  useEffect(() => {
    // if this frame has a score, send it to the parent ScoreCard component via
    // prop function
    if (total) {
      props.sendScore(props.number, total);
    }
  }, [total]);

  const renderTotal = () => {
    // calculate the total score up to the current frame
    let sum = 0;

    // first frame just has own total
    if (props.number === 1) {
      return total;
    }

    // do not render a total if previous frame has not been scored
    // or a score for the current frame hasn't been made yet
    if (!props.frameScores[props.number - 2] || !total) {
      return null;
    }

    // total up all frame scores
    for (var i = 0; i < props.number; ++i) {
      sum += props.frameScores[i];
    }
    return sum;
  };

  return (
    <Grid container spacing={0}>
      <Grid item align="center" xs={12}>
        <Box
          p={2}
          border={1}
          borderBottom={0}
          borderRight={props.number === 10 ? 1 : 0}
        >
          {props.number}
        </Box>
      </Grid>
      <Grid item align="center" xs={6}>
        <Box p={1} border={1} borderRight={0}>
          <ScoreForm setScore={setFirstScore} score={firstScore} />
        </Box>
      </Grid>
      <Grid item align="center" xs={6}>
        <Box p={1} border={1} borderRight={props.number === 10 ? 1 : 0}>
          <ScoreForm
            setScore={setSecondScore}
            score={secondScore}
            firstScore={firstScore}
          />
        </Box>
      </Grid>
      <Grid item align="center" xs={12}>
        <Box
          style={{ height: "37px" }}
          p={1}
          border={1}
          borderTop={0}
          borderRight={props.number === 10 ? 1 : 0}
        >
          {renderTotal()}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Frame;
