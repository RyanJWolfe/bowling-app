import React, { useState, useEffect } from "react";
import { Grid, Box } from "@material-ui/core";

import ScoreForm from "./ScoreForm";
import ScoreFormTen from "./ScoreFormTen";

const FrameTen = (props) => {
  const [firstScore, setFirstScore] = useState("");
  const [secondScore, setSecondScore] = useState("");
  const [thirdScore, setThirdScore] = useState("");
  const number = 10;

  useEffect(() => {
    const first = firstScore === "" ? 0 : firstScore;
    const second = secondScore === "" ? 0 : secondScore;
    const third = thirdScore === "" ? 0 : thirdScore;

    props.sendScore(first, second, third);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstScore, secondScore, thirdScore]);

  const renderTotal = () => {
    // calculate the total score up to the current frame
    let sum = 0;
    const total = props.frameScores[number - 1].frameScore;

    // do not render a total if previous frame has not been scored
    // or a score for the current frame hasn't been made yet
    if (!props.frameScores[number - 2].frameScore || !total) {
      return null;
    }

    // total up all frame scores
    for (var i = 0; i < props.number; ++i) {
      sum += props.frameScores[i].frameScore;
    }
    return sum;
  };

  return (
    <Grid container spacing={0}>
      <Grid item align="center" xs={12}>
        <Box p={2} border={1} borderBottom={0} borderRight={1}>
          {number}
        </Box>
      </Grid>
      <Grid item align="center" xs={4}>
        <Box p={1} border={1} borderRight={0}>
          <ScoreForm setScore={setFirstScore} score={firstScore} />
        </Box>
      </Grid>
      <Grid item align="center" xs={4}>
        <Box p={1} border={1} borderRight={0}>
          {firstScore === "STRIKE" ? (
            <ScoreForm setScore={setSecondScore} score={secondScore} />
          ) : (
            <ScoreForm
              setScore={setSecondScore}
              score={secondScore}
              firstScore={firstScore}
            />
          )}
        </Box>
      </Grid>
      <Grid item align="center" xs={4}>
        <Box p={1} border={1} borderRight={1}>
          {secondScore === "STRIKE" || secondScore === "SPARE" ? (
            <ScoreFormTen
              setScore={setThirdScore}
              score={thirdScore}
              prevScore={secondScore}
            />
          ) : firstScore !== "STRIKE" && secondScore !== "SPARE" ? (
            <ScoreForm firstScore="" score="" />
          ) : (
            <ScoreForm
              setScore={setThirdScore}
              score={thirdScore}
              firstScore={secondScore}
            />
          )}
        </Box>
      </Grid>
      <Grid item align="center" xs={12}>
        <Box
          style={{ height: "37px" }}
          p={1}
          border={1}
          borderTop={0}
          borderRight={1}
        >
          {renderTotal()}
        </Box>
      </Grid>
    </Grid>
  );
};

export default FrameTen;
