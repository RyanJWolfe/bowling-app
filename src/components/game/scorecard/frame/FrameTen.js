import React, { useState, useEffect } from "react";
import { Grid, Box } from "@material-ui/core";

import FrameScoreSelect from "./FrameScoreSelect";

const FrameTen = (props) => {
  const [firstScore, setFirstScore] = useState("");
  const [secondScore, setSecondScore] = useState("");
  const [thirdScore, setThirdScore] = useState("");
  const number = 10;

  useEffect(() => {
    // if the first shot gets changed, reset the other two.
    if (secondScore !== "") {
      setSecondScore("");
    }
    if (thirdScore !== "") {
      setThirdScore("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstScore]);

  // if the second shot gets changed, reset the third shot
  useEffect(() => {
    // if the first shot gets changed, reset the other two.
    if (thirdScore !== "") {
      setThirdScore("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondScore]);

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
    if (!total) {
      return null;
    }

    // total up all frame scores
    for (var i = 0; i < number; ++i) {
      sum += props.frameScores[i].frameScore;
    }
    return sum;
  };

  const renderSecondShotForm = () => {
    // if the first shot was a strike, do no pass a firstScore prop,
    // this will treat the second shot like the "first" shot in a new frame
    return firstScore === "STRIKE" ? (
      <FrameScoreSelect setScore={setSecondScore} score={secondScore} />
    ) : (
      <FrameScoreSelect
        setScore={setSecondScore}
        score={secondScore}
        firstScore={firstScore}
      />
    );
  };

  const renderThirdShotForm = () => {
    // if the second score was a strike or spare, render the third frame
    return firstScore === "STRIKE" || secondScore === "SPARE" ? (
      <FrameScoreSelect
        setScore={setThirdScore}
        score={thirdScore}
        firstScore={secondScore}
        tenthFrame={true}
      />
    ) : (
      <FrameScoreSelect firstScore="" score="" />
    );
  };

  return (
    <Grid container spacing={0}>
      <Grid item align="center" xs={12}>
        <Box border={1} borderBottom={0} borderRight={1}>
          {number}
        </Box>
      </Grid>
      <Grid item align="center" xs={4}>
        <Box border={1} borderRight={0}>
          <FrameScoreSelect setScore={setFirstScore} score={firstScore} />
        </Box>
      </Grid>
      <Grid item align="center" xs={4}>
        <Box border={1} borderRight={0}>
          {renderSecondShotForm()}
        </Box>
      </Grid>
      <Grid item align="center" xs={4}>
        <Box border={1} borderRight={1}>
          {renderThirdShotForm()}
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
