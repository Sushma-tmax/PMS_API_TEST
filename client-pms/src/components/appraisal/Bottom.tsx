import * as React from "react";
// import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Left from "./Icons/Left.svg";
import Right from "./Icons/Right.svg";


const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Pad = styled("div")({
  paddingTop: '0px'

});
const Heading1 = styled("div")({
  fontSize: '11px',
  fontWeight: 400,
  color: '#333333',
  opacity: 0.5,
});
const Rating = styled("div")({
  fontSize: '33px',
  fontWeight: 400,
  color: '#333333',
  marginTop: '-20px'

});
const Ratingvalue = styled("div")({
  fontSize: '11px',
  fontWeight: 400,
  color: '#333333',
  marginTop: '-10px'

});
const Progressvalue = styled("div")({
  fontSize: '12px',
  fontWeight: 400,
  color: '#333333',
  opacity: '0.75'

});


export default function Bottom() {
  return (
    <div>
      <Stack direction="row" justifyContent="space-between">
        <Pad>
          <Item  >
            <Stack direction="row"  >
              <Item>
                <Rating>
                  4.0
                </Rating>
              </Item>

              <Item>
                <Ratingvalue>
                  Exceeding
                </Ratingvalue>

                <Heading1>
                  Ratings
                </Heading1>
              </Item>

            </Stack>
          </Item>
        </Pad>
        
        <Item>
          {/* <ChevronLeftIcon fontSize="large" />
          <ChevronRightIcon fontSize="large" /> */}
          {/* <Tabs   >
            <Tab icon={<img src={Left} alt='icon' />} />
            <Tab icon={<img src={Right} alt='icon' />}/>
          </Tabs>  */}
          <Stack direction="row">
            <Item><img src={Left} alt='icon' /> </Item>
            <Item><img src={Right} alt='icon' /></Item>
          </Stack>
        </Item>

        <Item  >
          <LinearProgress
            variant="determinate"
            color="success"
            value={20}
            style={{ width: 100, height: 10, borderRadius: 5 }}
          ></LinearProgress>
          <Typography marginLeft='64px' >
            <Progressvalue>
              2/11
            </Progressvalue>
          </Typography>
        </Item>

      </Stack>
    </div>
  );
}
