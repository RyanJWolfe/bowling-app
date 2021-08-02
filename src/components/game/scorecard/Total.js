import React from "react";

import { Grid, Box } from "@material-ui/core";

const Total = (props) => {
  return (
    <Grid container spacing={0}>
      <Grid item align="center" xs={12}>
        <Box p={2} border={1} borderLeft={0}>
          Total
        </Box>
      </Grid>
      <Grid item align="center" xs={12}>
        <Box p={2} borderRight={1} borderBottom={1}>
          {props.value}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Total;
