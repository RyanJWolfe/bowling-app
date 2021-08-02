import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "1.5em",
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            <Button
              color="inherit"
              component={Link}
              to="/"
              startIcon={<HomeRoundedIcon />}
            >
              Home
            </Button>
          </Typography>
          <Button
            component={Link}
            to="/create-game"
            color="secondary"
            variant="contained"
          >
            Create New Game
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
