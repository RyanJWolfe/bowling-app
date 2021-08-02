import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField } from "@material-ui/core";

import Frame from "./Frame";
import Total from "./Total";

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
  const [frameScores, setFrameScores] = useState(Array(10).fill(0));
  const [total, setTotal] = useState(0);

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const handleFrameScore = (frameNumber, frameTotal) => {
    const scoresArray = Array.from(frameScores);
    scoresArray[frameNumber - 1] = frameTotal;
    setFrameScores(scoresArray);
  };

  useEffect(() => {
    // calculate total
    let sum = 0;
    for (const score of frameScores) {
      sum += score;
    }
    setTotal(sum);
    console.log(frameScores);
  }, [frameScores]);

  const renderFrames = () => {
    let frames = [];
    for (var i = 1; i <= 10; ++i) {
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
          <Total value={total} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ScoreCard;
