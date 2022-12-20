import * as React from "react";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import NBoxGrids from "./chartcomponents/nboxgrids";
import ChartTabs from "./chartcomponents/charttabs";


export default function CurveandgGid() {
    return (
      <div>
        <Container>
          <Grid container spacing={2}>
             
          <Grid item xs={6}>
            <ChartTabs />
            </Grid>

            <Grid item xs={6} >
              <NBoxGrids/>
             
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }