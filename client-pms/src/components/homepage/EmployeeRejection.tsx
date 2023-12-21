import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { Grid, Box, Divider, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import GlobeChart from "./GlobeChart";
import { styled } from "@mui/material/styles";

const Divide = styled("div")({
  //position: "absolute",
  marginTop: "20px",
  marginLeft: "25px",
  marginRight: "20px",
});

const EmployeeRejection = (props:any) => {
    const {completedCount,inprogressCount,inMediaton,range1,range2,range3,range4} = props;
   console.log()
  const series = [range1,range2,range3,range4];

  const options: ApexOptions = {
    colors: ["#ff8080", "#ff884d", "#39ac73","#33cccc"],
    chart: {
      type: "donut",
    },
    labels: [
      "Low Performers",
      "Average Performers",
      "Good Performers",
      "High Performers",
      
    ],
    legend: {
      show: false,
    },
    responsive: [
      {
        //breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },

          legend: {
            show: false,
          },
        },
      },
    ],
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <Grid>
      <Grid container spacing={2} sx={{ borderBottom: "1px solid #e6e6e6" }}>
        <Grid item xs={6} sx={{ borderRight: "1px solid #e6e6e6" }}>
          <Stack
            direction="row"
            spacing={6}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Grid item xs={2} style={{ marginRight: "20px" }}>
             
              <Grid>
              {range1 === 0 && range2 === 0 && range3 === 0 && range4 === 0 && 
              <div
              style={{
                fontSize: "12px",
                fontFamily: "Arial",
                color:"#abb0b0"
              }}
              >No Data Available
              </div>}
                <ReactApexChart
                  options={options}
                  series={series}
                  type="donut"
                  width={220}
                />
              </Grid>
            </Grid>

            <Grid>
            <Stack
                sx={{
                  gap:"15px",
                  marginLeft: "145px",
                  fontSize: "12px",
                  color: "#808080"
                }}
                >
                   <Box >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      display: "inline-block",
                      backgroundColor: "#33cccc",
                      verticalAlign: "middle",
                      marginRight: "5px",
                    }}
                  ></span>{" "}
                  High Performers
                </Box>
                <Box>
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      display: "inline-block",
                      backgroundColor: "#39ac73",
                      verticalAlign: "middle",
                      marginRight: "5px",
                    }}
                  ></span>{" "}
                  Good Performers
                </Box>
                <Box  style={{ 
                    marginRight: "15px",
                    display: "flex",
                 }} >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      display: "inline-block",
                      backgroundColor: "#ff8080",
                      verticalAlign: "middle",
                      marginRight: "9px",
                      marginTop:"5px"
                    }}
                  ></span>{" "}
                   <div>Low Performers</div> 
                  
                </Box>
                <Box 
                style={{ 
                    marginRight: "15px",
                    display: "flex",
                 }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      display: "inline-block",
                      backgroundColor: "#ff884d",
                      verticalAlign: "middle",
                      marginRight: "9px",
                      marginTop:"5px"
                    }}
                  ></span>{" "}
                 <div>Average Performers</div> 
                </Box>
            </Stack>
              {/* <Box
                style={{
                  display: "flex",
                  //justifyContent: "space-between",
                  marginLeft: "50px",
                  fontSize: "12px",
                  color: "#808080",
                  marginBottom: "15px",
                  gap:'21px'
                }}
              >
                <Box >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      display: "inline-block",
                      backgroundColor: "#33cccc",
                      verticalAlign: "middle",
                      marginRight: "5px",
                    }}
                  ></span>{" "}
                  High Performers
                </Box>
                <Box>
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      display: "inline-block",
                      backgroundColor: "#39ac73",
                      verticalAlign: "middle",
                      marginRight: "5px",
                    }}
                  ></span>{" "}
                  Good Performers
                </Box>
                <Box  style={{ 
                    marginRight: "15px",
                    display: "flex",
                 }} >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      display: "inline-block",
                      backgroundColor: "#ff8080",
                      verticalAlign: "middle",
                      marginRight: "9px",
                      marginTop:"5px"
                    }}
                  ></span>{" "}
                   <div>Low Performers</div> 
                  
                </Box>
              </Box>
              <Box
                style={{
                  marginLeft: "50px",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "12px",
                  color: "#808080",
                }}
              >
                <Box 
                style={{ 
                    marginRight: "15px",
                    display: "flex",
                 }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      display: "inline-block",
                      backgroundColor: "#ff884d",
                      verticalAlign: "middle",
                      marginRight: "9px",
                      marginTop:"5px"
                    }}
                  ></span>{" "}
                 <div>Average Performers</div> 
                </Box>
               
                <Box  style={{ 
                    marginRight: "15px",
                    display: "flex",
                 }} >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      display: "inline-block",
                      backgroundColor: "#ff8080",
                      verticalAlign: "middle",
                      marginRight: "9px",
                      marginTop:"5px"
                    }}
                  ></span>{" "}
                   <div>Low Performers</div> 
                  
                </Box>
                <Box style={{ 
                    marginRight: "15px",
                    display: "flex",
                    color:"#ffffff"
                 }}>
                  <span
                    style={{
                        width: "8px",
                        height: "8px",
                        display: "inline-block",
                        backgroundColor: "#ffffff",
                        verticalAlign: "middle",
                        marginRight: "9px",
                        marginTop:"5px"
                      }}
                  ></span>{" "}
                   <div>Below Average Performers</div>
                </Box>
              </Box> */}
            </Grid>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          
          <Stack
            direction="row"
            spacing={6}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Box>
              <GlobeChart 
               completedCount={completedCount}
               inprogressCount={inprogressCount}
               inMediaton={inMediaton}
              
              />
            </Box>
            <Box>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginLeft: "50px",
                  fontSize: "12px",
                  color: "#808080",
                  marginBottom: "15px",
                }}
              >
                <Stack
                sx={{
                  gap:"15px",
                  marginLeft: "20px"
                }}
                >
                <Box style={{ marginRight: "15px" }}>
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      display: "inline-block",
                      backgroundColor: "#39ac73",
                      verticalAlign: "middle",
                      marginRight: "5px",
                    }}
                  ></span>{" "}
                  Completed
                </Box>
                <Box style={{ marginRight: "15px" }}>
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      display: "inline-block",
                      backgroundColor: "#a6a6a6",
                      verticalAlign: "middle",
                      marginRight: "5px",
                    }}
                  ></span>
                  In Progress
                </Box>
                <Box>
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      display: "inline-block",
                      backgroundColor: "#33cccc",
                      verticalAlign: "middle",
                      marginRight: "5px",
                    }}
                  ></span>{" "}
                  In mediation
                </Box>
                </Stack>
              </Box>
              {/* <Box
                style={{
                  marginLeft: "50px",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "12px",
                  color: "#808080",
                }}
              >
                
              </Box> */}
            </Box>
          </Stack>
        </Grid>
      </Grid>

      {/* <Divide>
       
        <Divider />
      </Divide> */}
    </Grid>
  );
};

export default EmployeeRejection;

/*
  GeneralColor: {
    flexGrow: 1,
    paddingTop:"0px",
    textAlign: "center",
   
    fontFamily: " 'DM Sans', 'sans-serif'!important",
    
    "& p": {
      margin: 0,
      color: "#606c74",
      fontSize: "12px",
      fontFamily: " 'DM Sans', 'sans-serif'!important",
      "& span": {import { styled } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

        width: "12px",
        height: "12px",
        display: "inline-block",
        borderRadius: "50%",
        backgroundColor: "#E40010",
        verticalAlign: "middle",
        marginRight: "3px",
        
      },
    },
  },

*/
