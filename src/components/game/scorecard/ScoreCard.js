import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField } from "@material-ui/core";

import Frame from "./Frame";
import FrameTen from "./FrameTen";
import ScoreTotal from "./ScoreTotal";
import { calculateFrameTotals } from "./calculateScore";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 30,
  },
  nameField: {
    marginBottom: 10,
  },
}));

const ScoreCard = (props) => {
  const classes = useStyles();
  const [name, setName] = useState(`Player ${props.id}`);
  const [frameScores, setFrameScores] = useState(
    Array(10).fill({ firstScore: 0, secondScore: 0, frameScore: 0 })
  );
  const [total, setTotal] = useState(0);

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const handleFrameScore = (frameNumber, frameFirstScore, frameSecondScore) => {
    // create copy of state array to make updates
    const scoresArray = Array.from(frameScores);
    const index = frameNumber - 1; // frame number 1 === index 0

    scoresArray[index] = {
      firstScore: frameFirstScore,
      secondScore: frameSecondScore,
      frameScore: 0,
    };

    setFrameScores(calculateFrameTotals(scoresArray));
  };

  const handleFrameTenScore = (
    frameFirstScore,
    frameSecondScore,
    frameThirdScore
  ) => {
    const scoresArray = Array.from(frameScores);
    const index = 9; // frame 10

    scoresArray[index] = {
      firstScore: frameFirstScore,
      secondScore: frameSecondScore,
      thirdScore: frameThirdScore,
      frameScore: 0,
    };

    setFrameScores(calculateFrameTotals(scoresArray));
  };

  useEffect(() => {
    // calculate total game score
    let sum = 0;
    for (const score of frameScores) {
      sum += score.frameScore;
    }
    setTotal(sum);
  }, [frameScores]);

  const renderFrames = () => {
    let frames = [];
    // add frames 1-9
    for (var i = 1; i <= 9; ++i) {
      frames.push(
        <Grid key={i} item xs={1}>
          <Frame
            frameScores={frameScores}
            sendScore={handleFrameScore}
            number={i}
          />
        </Grid>
      );
    }

    // add frame 10
    frames.push(
      <Grid key={10} item xs={2}>
        <FrameTen frameScores={frameScores} sendScore={handleFrameTenScore} />
      </Grid>
    );
    return frames;
  };

  return (
    <div className={classes.root}>
      <TextField
        onChange={onNameChange}
        className={classes.nameField}
        value={name}
      />
      <Grid container alignItems="center" justifyContent="center">
        {renderFrames()}
        <Grid item xs={1}>
          <ScoreTotal value={total} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ScoreCard;
