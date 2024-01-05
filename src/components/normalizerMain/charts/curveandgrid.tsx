import * as React from "react";
import Grid from "@mui/material/Grid";
import { Container, Box } from "@mui/material";
import NBoxGrids from "./chartscomponents/nboxgrids";
import ChartTabs from "./chartscomponents/charttabs";

export default function CurveandgGid() {
  return (
    <div>
      <Box style={{ marginLeft: "24px", marginRight: "22px" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ChartTabs />
          </Grid>
          <Grid item xs={6}>
            <NBoxGrids />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
