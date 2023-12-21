import * as React from "react";
import Grid from "@mui/material/Grid";
import { Container, Box } from "@mui/material";
// import NBoxGrids from "./chartscomponents/nboxgrids";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import Newexcel from "../../../assets/Images/Newexcel.svg";
import Expand from "../../../assets/Images/Expand.svg";
import Topperformers from "../TopPerformers";

export default function NineBoxcard(props: any) {
  const { title, count, color, icon } = props;
  return (
    <div>
    
        <Box
          sx={{
            background: color,
            // width: "230px",
            height: "130px",
            padding: "15px",
          }}
        >
          <Stack
            direction="row"
            alignItems="flex-end"
            justifyContent="space-between"
          >
            <div>
              <Stack
                direction="column"
                alignItems="left"
                justifyContent="space-between"
                spacing={6}
               
              >
                <Typography
                  style={{
                    fontSize: "18px",
                    fontFamily: "Arial",
                    color: "#ffffff",
                    // maxWidth:"150px",
                    // wordBreak:"break-word"
                  }}
                >
                  {title}
                </Typography>
                <Typography
                  style={{
                    fontSize: "25px",
                    fontFamily: "Arial",
                    color: "#ffffff",
                  }}
                >
                  {count}
                </Typography>
              </Stack>
            </div>
            <Typography>{icon}</Typography>
          </Stack>
        </Box>
     
    </div>
  );
}
