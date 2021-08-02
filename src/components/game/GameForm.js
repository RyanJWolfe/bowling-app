import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Button, Paper, Typography, Grid, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
  },
  paper: {
    display: "inline-flex",
    padding: "1.5em",
  },
}));

const GameForm = (props) => {
  const classes = useStyles();
  const [numPlayers, setNumPlayers] = useState(1);

  const numPlayersHandler = (e) => {
    if (Number(e.target.value) > 99) {
      setNumPlayers(99);
    } else if (Number(e.target.value) < 1) {
      setNumPlayers(1);
    } else {
      setNumPlayers(e.target.value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(numPlayers);
  };
  return (
    <form onSubmit={onSubmit} noValidate autoComplete="off">
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid
            alignItems="center"
            alignContent="center"
            container
            direction="column"
            spacing={2}
          >
            <Grid item>
              <Typography m={2} variant="h6">
                Create a new bowling game!
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                label="Number of players"
                type="number"
                onChange={numPlayersHandler}
                value={numPlayers}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" type="submit">
                Create Game
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </form>
  );
};

export default GameForm;
