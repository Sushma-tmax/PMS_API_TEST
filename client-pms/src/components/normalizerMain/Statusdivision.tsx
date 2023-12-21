import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container, List, ListItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Stack } from "@mui/material";
import StatusBarChart from "./StatusBarChart";


const Status = styled("div")({
  fontSize: "20px",
  color: "#333333",
  marginLeft: "20px",
  paddingTop: "15px",
  fontFamily: "regular",
});

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 13,
  borderRadius: 12,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#ffffff",

    borderRadius: 1,
    height: "20px",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 1,
    backgroundColor: "#C00000",
  },
}));

const BorderLinearProgress1 = styled(LinearProgress)(({ theme }) => ({
  height: 13,
  borderRadius: 12,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#ffffff",

    borderRadius: 1,
    height: "20px",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 1,
    backgroundColor: "#EE8A1E",
  },
}));

const BorderLinearProgress2 = styled(LinearProgress)(({ theme }) => ({
  height: 13,
  borderRadius: 12,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#ffffff",

    borderRadius: 1,
    height: "20px",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 1,
    backgroundColor: "#00B050",
  },
}));

const BorderLinearProgress3 = styled(LinearProgress)(({ theme }) => ({
  height: 13,
  borderRadius: 12,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#ffffff",

    borderRadius: 1,
    height: "20px",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 1,
    backgroundColor: "#00B0F0",
  },
}));

const BorderLinearProgress4 = styled(LinearProgress)(({ theme }) => ({
  height: 13,
  borderRadius: 12,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#ffffff",

    borderRadius: 1,
    height: "20px",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 1,
    backgroundColor: "#004C75",
  },
}));

function Statusdivision() {
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "#fff",
          //   width:"96%",
          height: "calc(100vh - 320px)",
          marginLeft: "25px",
          marginRight: "25px",
          marginTop: "25px",
        }}
      >
        <Status>Status by Section</Status>
        {/* <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={2}
          marginTop="40px"
        >
          <div style={{ width: " 50px" }}>
            <BorderLinearProgress variant="determinate" />

            <span>
              <p
                style={{
                  justifyContent: "center",
                  fontSize: "16px",
                  color: "#333333",
                  opacity: "75%",
                }}
              >
                1-1.9
              </p>
            </span>
          </div>

          <div style={{ width: " 50px" }}>
            <BorderLinearProgress1 variant="determinate" />
            <span>
              <p
                style={{
                  justifyContent: "center",
                  fontSize: "16px",
                  color: "#333333",
                  opacity: "75%",
                }}
              >
                2-2.9
              </p>
            </span>
          </div>

          <div style={{ width: " 100px" }}>
            <BorderLinearProgress2 variant="determinate" />
            <span>
              <p
                style={{
                  justifyContent: "center",
                  fontSize: "16px",
                  color: "#333333",
                  opacity: "75%",
                }}
              >
                3-3.9
              </p>
            </span>
          </div>

          <div style={{ width: " 50px" }}>
            <BorderLinearProgress3 variant="determinate" />
            <span>
              <p
                style={{
                  justifyContent: "center",
                  fontSize: "16px",
                  color: "#333333",
                  opacity: "75%",
                }}
              >
                4-4.9
              </p>
            </span>
          </div>
          <div style={{ width: " 50px" }}>
            <BorderLinearProgress4 variant="determinate" />
            <span>
              <p
                style={{
                  justifyContent: "center",
                  fontSize: "16px",
                  color: "#333333",
                  opacity: "75%",
                }}
              >
                5
              </p>
            </span>
          </div>
        </Stack> */}
 <StatusBarChart/>
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItem:"center",
            paddingTop:"100px"
          }}
        >
    
        <Stack direction="row" alignItems="center" spacing={12}>
            <div>
              <Stack direction="row" alignItems="baseline" spacing={2}>
                <List>
                <ListItem style={{fontSize:"8px"}}>10%</ListItem>
                <ListItem
                  style={{
                    width: "20px",
                    height: "10px",
                    // border: "1px solid black",
                    display: "block",
                    backgroundColor:"#00B050",
                    
                  }}
                > </ListItem>
                 <ListItem style={{fontSize:"8px",marginBottom:"100px"}}>13</ListItem>
                </List>              
                <div> 
                <span style={{fontSize:"8px"}}>10%</span>
                <span
                  style={{
                    width: "25px",
                    height: "70px",
                    // border: "1px solid black",
                    display: "block",
                    backgroundColor:"#F6C609"
                  }}
                ></span>
                <span style={{fontSize:"8px"}}>13</span>

                </div>
                <div>
                <span style={{fontSize:"8px"}}>10%</span>
                <span
                  style={{
                    width: "25px",
                    height: "20px",
                    // border: "1px solid black",
                    display: "block",
                    backgroundColor:"#C00000"
                  }}
                ></span>
                <span style={{fontSize:"8px"}}>13</span>
                </div>
                
              </Stack>
            </div>

            <div>
              <Stack direction="row" alignItems="baseline" spacing={2}>
                <span
                  style={{
                    width: "25px",
                    height: "20px",
                    border: "1px solid black",
                    display: "block",
                    backgroundColor:"#00B050"
                  }}
                ></span>
                <span
                  style={{
                    width: "25px",
                    height: "50px",
                    // border: "1px solid black",
                    display: "block",
                    backgroundColor:"#F6C609"
                  }}
                ></span>
                <span
                  style={{
                    width: "25px",
                    height: "20px",
                    // border: "1px solid black",
                    display: "block",
                    backgroundColor:"#C00000"
                  }}
                ></span>
              </Stack>
            </div>

            <div>
              <Stack direction="row" alignItems="baseline" spacing={2}>
                <span
                  style={{
                    width: "25px",
                    height: "50px",
                    // border: "1px solid black",
                    display: "block",
                    backgroundColor:"#00B050"
                  }}
                ></span>
                <span
                  style={{
                    width: "25px",
                    height: "30px",
                    // border: "1px solid black",
                    display: "block",
                    backgroundColor:"#F6C609"
                  }}
                ></span>
                <span
                  style={{
                    width: "25px",
                    height: "10px",
                    // border: "1px solid black",
                    display: "block",
                    backgroundColor:"#C00000"
                  }}
                ></span>
              </Stack>
            </div>
            <div>
              <Stack direction="row" alignItems="baseline" spacing={2}>
                <span
                  style={{
                    width: "25px",
                    height: "15px",
                    // border: "1px solid black",
                    display: "block",
                    backgroundColor:"#00B050",
                   
                  }}
                ></span>
                <span
                  style={{
                    width: "25px",
                    height: "10px",
                    // border: "1px solid black",
                    display: "block",
                    backgroundColor:"#F6C609"
                  }}
                ></span>
                <span
                  style={{
                    width: "25px",
                    height: "70px",
                    // border: "1px solid black",
                    display: "block",
                    backgroundColor:"#C00000"
                  }}
                ></span>
              </Stack>
            </div>

            <div>
              <Stack direction="row" alignItems="baseline" spacing={2}>
                <span
                  style={{
                    width: "25px",
                    height: "50px",
                    // border: "1px solid black",
                    display: "block",
                    backgroundColor:"#00B050"
                  }}
                ></span>
                <span
                  style={{
                    width: "25px",
                    height: "10px",
                    // border: "1px solid black",
                    display: "block",
                    backgroundColor:"#F6C609"
                  }}
                ></span>
                <span
                  style={{
                    width: "25px",
                    height: "20px",
                    // border: "1px solid black",
                    display: "block",
                    backgroundColor:"#C00000"
                  }}
                ></span>
              </Stack>
            </div>

            <div>
              <Stack direction="row" alignItems="baseline" spacing={2}>
                <span
                  style={{
                    width: "25px",
                    height: "10px",
                    // border: "1px solid black",
                    display: "block",
                    backgroundColor:"#00B050"
                  }}
                ></span>
                <span
                  style={{
                    width: "25px",
                    height: "70px",
                    // border: "1px solid black",
                    display: "block",
                    backgroundColor:"#F6C609"
                  }}
                ></span>
                <span
                  style={{
                    width: "25px",
                    height: "20px",
                    // border: "1px solid black",
                    display: "block",
                    backgroundColor:"#C00000"
                  }}
                ></span>
              </Stack>
            </div>
          </Stack> 
        </Box> */}
      </Box>
    </>
  );
}
export default Statusdivision;
