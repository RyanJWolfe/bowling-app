import React from "react";

import { Grid, Box } from "@material-ui/core";

const ScoreTotal = (props) => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      alignContent="center"
      spacing={0}
    >
      <Grid item align="center" xs={12}>
        <Box style={{ height: 30 }} p={1} border={1} borderLeft={0}>
          Total
        </Box>
      </Grid>
      <Grid item align="center" xs={12}>
        <Box p={1} style={{ height: 62 }} borderRight={1} borderBottom={1}>
          <h2>{props.value}</h2>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ScoreTotal;
