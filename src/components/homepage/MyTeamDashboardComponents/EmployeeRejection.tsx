import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { Grid, Box, Divider, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import GlobeChart from "../GlobeChart";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const Divide = styled("div")({
  //position: "absolute",
  marginTop: "20px",
  marginLeft: "25px",
  marginRight: "20px",
});

const EmployeeRejection = (props: any) => {
  const { completedCount, inprogressCount, inMediaton, range1, range2, 
    range3, range4,TotalEmp,CompletedEmp,linkofAppraiser,checklengthinRangesH,checklengthinRangesL,checklengthinRangesA,checklengthinRangesG,checkAppraisalStatusCompleted
  ,checkAppraisalStatusInmediation,checkAppraisalStatusRenormalization } = props;
    const [TotalEmpCount, setTotalEmpCount] = React.useState<any>(TotalEmp);
    const [CompletedEmpCount, setCompletedEmpCount] = React.useState<any>(CompletedEmp);

    React.useEffect(() => {
      setTotalEmpCount(TotalEmp);
    }, [TotalEmp]);
  
  const series = [range1, range2, range3, range4];
  const options: ApexOptions = {

    colors: ["#FF0000", "#ff884d", "#39ac73", "#33cccc"],
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
        options: {
          chart: {
            width: 200,
          },


        },
      },
    ],
    dataLabels: {
      enabled: true,
      formatter: function (value: any, { seriesIndex, dataPointIndex, w }) {
        console.log(w.config.series[seriesIndex], "series")
        return w.config.series[seriesIndex]
      },
    },
    plotOptions: {
      pie: {
        expandOnClick: true,
        donut: {
          size: "50%",
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              fontSize: '16px',
              fontFamily: ' Arial',
              color: '#333333',
              formatter: () => `${CompletedEmp}/${TotalEmp}`
            },

          }

        },

      }
    }

  };
  //chart when count is zero
  const zeroSeries = [0,0,0,1];
  const zeroOptions: ApexOptions = {

    colors: ["#abb0b0"],
    chart: {
      type: "donut",
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        options: {
          chart: {
            width: 200,
          },


        },
      },
    ],
    dataLabels: {
      enabled: false,
      formatter: function (value: any, { seriesIndex, dataPointIndex, w }) {
        console.log(w.config.series[seriesIndex], "series")
        return w.config.series[seriesIndex]
      },
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: "50%",
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              fontSize: '16px',
              fontFamily: ' Arial',
              color: '#333333',
              formatter: () => `${CompletedEmp}/${TotalEmp}`
            },

          }

        },

      }
    }

  }; 

  return (
    <Grid>
      <Grid sx={{ marginLeft: "0px", width: "calc(100% + 0px)" }} container spacing={2} >
        <Grid item xs={12} md={6} 
        sx={{ 
        borderRight: "1px solid #e6e6e6",
        '@media (max-width: 900px)': {
          borderRight: "none",
        },
        paddingLeft: "16px" }}>
        <Typography
                style={{
                  fontSize: "20px",
                  fontFamily: "Arial",
                  // padding: "20px",
                  color: "#3e8cb5" 
                }}
              >
                Ratings Distribution
              </Typography>
          <Stack
            direction="row"

            // spacing={6}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}
          >

              <div>
                <Stack
                  sx={{
                    gap: "15px",
                    // marginLeft: "10px",
                    fontSize: "12px",
                    color: "#808080"
                  }}
                >
                  <Link
                  to={linkofAppraiser}
                  state={{
                    from: "High Performers",
                    range : {checklengthinRangesH},
                  }}
                  >
                  <Box  style={{
                  display: "flex",
                }} >
                    <span
                      style={{
                        width: "18px",
                        height: "18px",
                        display: "inline-block",
                        backgroundColor: "#33cccc",
                        verticalAlign: "middle",
                        marginRight: "8px",
                        border: "1px solid #333333",
                        borderRadius: "2px"
                      }}
                    ></span>
                   <label style={{fontSize:"12px",color:"#014d76",fontFamily:"arial"}}> High Performers</label>
                  </Box>
                  </Link>
                  <Link
                   to={linkofAppraiser}
                  state={{
                    from: "Good Performers",
                    range : {checklengthinRangesG}
                  }}
                  >
                  <Box  style={{
                  display: "flex",
                }}>
                    <span
                      style={{
                        width: "18px",
                        height: "18px",
                        display: "inline-block",
                        backgroundColor: "#39ac73",
                        verticalAlign: "middle",
                        marginRight: "8px",
                        border: "1px solid #333333",
                        borderRadius: "2px"
                      }}
                    ></span>
                 <label style={{fontSize:"12px",color:"#014d76",fontFamily:"arial"}}> Good Performers</label>
                  </Box>
                  </Link>
                  <Link
                   to={linkofAppraiser}
                  state={{
                    from: "Average Performers",
                    range : {checklengthinRangesA}
                  }}
                  >
                  <Box
 style={{
  display: "flex",
}}
                  >
                    <span
                      style={{
                        width: "18px",
                        height: "18px",
                        display: "inline-block",
                        backgroundColor: "#ff884d",
                        verticalAlign: "middle",
                        marginRight: "8px",
                        // marginTop:"5px",
                        border: "1px solid #333333",
                        borderRadius: "2px"
                      }}
                    ></span>
                  <label style={{fontSize:"12px",color:"#014d76",fontFamily:"arial"}}> Average Performers</label>
                  </Box>
                  </Link>
                  <Link
                   to={linkofAppraiser}
                  state={{
                    from: "Low Performers",
                    range:{checklengthinRangesL}
                  }}
                  >
                  <Box  style={{
                  display: "flex",
                }} >
                    <span
                      style={{
                        width: "18px",
                        height: "18px",
                        display: "inline-block",
                        // backgroundColor: "#c52626",
                        backgroundColor: "#FF0000",
                        verticalAlign: "middle",
                        marginRight: "8px",
                        // marginTop:"5px",
                        border: "1px solid #333333",
                        borderRadius: "2px"
                      }}
                    ></span>
                  <label style={{fontSize:"12px",color:"#014d76",fontFamily:"arial"}}> Low Performers</label>


                  </Box>
                  </Link>
                </Stack>

              </div>
            <div  >

              {(range1 === 0 && range2 === 0 && range3 === 0 && range4 === 0 )&&
                 <ReactApexChart
                //  key={`${CompletedEmp}-${TotalEmp}`}
                 options={zeroOptions}
                 series={zeroSeries}
                 type="donut"
                 width={270}
               />

                }
              {(range1 !== 0 || range2 !== 0 || range3 !== 0 || range4 !== 0 )&& TotalEmp && CompletedEmp &&
                <ReactApexChart
                key={`${CompletedEmp}-${TotalEmp}`}
                  options={options}
                  series={series}
                  type="donut"
                  width={270}
                /> 
               }  
              {/* </Grid> */}
            </div>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
        <Typography

fontSize="20px"
fontFamily="Arial"
color= "#3e8cb5" 
>
Employees Rejection</Typography>
          <Stack
            direction="row"
            // spacing={6}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}
          >
            <Box>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  // marginLeft: "30px",
                  fontSize: "12px",
                  color: "#808080",
                  marginBottom: "15px",
                }}
              >
                  <Stack
                    sx={{
                      gap: "15px",
                      // marginLeft: "20px"
                    }}
                  >
                     <Link
                  to={linkofAppraiser}
                  state={{
                    from: "Completed",
                    status :{checkAppraisalStatusCompleted}
                  }}
                  >
                    <Box style={{ display: "flex", }}>
                      <span
                        style={{
                          width: "18px",
                          height: "18px",
                          display: "inline-block",
                          backgroundColor: "#39ac73",
                          verticalAlign: "middle",
                          marginRight: "8px",
                          border: "1px solid #333333",
                          borderRadius: "2px"
                        }}
                      ></span>{" "}
                                      <label style={{fontSize:"12px",color:"#014d76",fontFamily:"arial"}}> Completed</label>
                    </Box>
                    </Link>
                    <Link
                  to={linkofAppraiser}
                  state={{
                    from: "In Re-normalization",
                    status :{checkAppraisalStatusRenormalization}
                  }}
                  >
                    <Box style={{   display: "flex", }}>
                      <span
                        style={{
                          width: "18px",
                          height: "18px",
                          display: "inline-block",
                          backgroundColor: "#ff884d",
                          verticalAlign: "middle",
                          marginRight: "8px",
                          border: "1px solid #333333",
                          borderRadius: "2px"
                        }}
                      ></span>
                      {/* In Progress */}
                                   <label style={{fontSize:"12px",color:"#014d76",fontFamily:"arial"}}>   In Re-normalization  </label>

                    </Box>
                    </Link>
                    <Link
                  to={linkofAppraiser}
                  state={{
                    from: "In Mediation",
                    status: {checkAppraisalStatusInmediation}
                  }}
                  >
                    <Box
                     style={{
                  display: "flex",
                }}
                >
                      <span
                        style={{
                          width: "18px",
                          height: "18px",
                          display: "inline-block",
                          backgroundColor: "#FF0000",
                          verticalAlign: "middle",
                          marginRight: "8px",
                          border: "1px solid #333333",
                          borderRadius: "2px"
                        }}
                      ></span>{" "}
              <label style={{fontSize:"12px",color:"#014d76",fontFamily:"arial"}}>    In Mediation    </label>

                    </Box>
                    </Link>
                  </Stack>
              </Box>
            </Box>
            <Box >
                <GlobeChart
                  completedCount={completedCount}
                  inprogressCount={inprogressCount}
                  inMediaton={inMediaton}

                />
            </Box>

          </Stack>
        </Grid>
      </Grid>

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
