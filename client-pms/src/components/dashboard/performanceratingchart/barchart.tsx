import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { styled, createTheme, ThemeProvider } from "@mui/system";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Stack } from "@mui/material";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 13,
  borderRadius: 12,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#ffffff",

    borderRadius: 1,
    height: "25px",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 1,
    backgroundColor: "#C00000",
  },
}));

export default class BarChartUsing extends PureComponent {
  render() {
    return (
      <>
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={2}
          marginTop="40px"
        > 



          <div style={{ width: " 50px" }}>
            <BorderLinearProgress variant="determinate" value={100} />
            <span>
              <p style={{justifyContent:"center"}}>1-1.9</p>
            </span>
          </div>

          <div style={{ width: " 50px" }}>
            <BorderLinearProgress variant="determinate" value={10} />
            <span>
              <p>2-2.9</p>
            </span>
          </div>

          <div style={{ width: " 100px" }}>
            <BorderLinearProgress variant="determinate" value={100} />
            <span>
              <p>3-3.9</p>
            </span>
          </div>

          <div style={{ width: " 50px" }}>
            <BorderLinearProgress variant="determinate" value={100} />
            <span>
              <p>4-4.9</p>
            </span>
          </div>
          <div style={{ width: " 50px" }}>
            <BorderLinearProgress variant="determinate" value={100} />
            <span>
              <p>5</p>
            </span>
          </div>
         
        </Stack>
      </>
    );
  }
}
