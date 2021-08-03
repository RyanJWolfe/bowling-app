import React, { useState, useEffect } from "react";
import { Grid, Box } from "@material-ui/core";

import FrameScoreSelect from "./FrameScoreSelect";

const Frame = (props) => {
  const [firstScore, setFirstScore] = useState("");
  const [secondScore, setSecondScore] = useState("");

  useEffect(() => {
    // if the first shot gets changed, reset the second shot
    if (secondScore !== "") {
      setSecondScore("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstScore]);

  useEffect(() => {
    const first = firstScore === "" ? 0 : firstScore;
    const second = secondScore === "" ? 0 : secondScore;

    props.sendScore(props.number, first, second);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstScore, secondScore]);

  const renderTotal = () => {
    // calculate the total score up to the current frame
    let sum = 0;
    const total = props.frameScores[props.number - 1].frameScore;

    // first frame just has own total
    if (props.number === 1) {
      return total ? total : null;
    }

    // do not render a total if a score for the current frame hasn't been made yet
    if (!total) {
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
        <Box
          border={1}
          borderBottom={0}
          borderRight={props.number === 10 ? 1 : 0}
        >
          {props.number}
        </Box>
      </Grid>
      <Grid item align="center" xs={6}>
        <Box border={1} borderRight={0}>
          <FrameScoreSelect setScore={setFirstScore} score={firstScore} />
        </Box>
      </Grid>
      <Grid item align="center" xs={6}>
        <Box border={1} borderRight={props.number === 10 ? 1 : 0}>
          <FrameScoreSelect
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
