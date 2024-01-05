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

const EmployeeRejectionofOverallDashboard = (props: any) => {
  const { completedCount, inprogressCount, inMediaton, range1, range2, 
    range3, range4,TotalEmp,CompletedEmp,linkofAppraiser,setselectedRatingRange,setRatingsExpandActive ,appCalId
    ,checklengthinRangesH,checklengthinRangesL,checklengthinRangesA,checklengthinRangesG,checkAppraisalStatusCompleted
    ,checkAppraisalStatusInmediation,checkAppraisalStatusRenormalization } = props;
    console.log(TotalEmp,CompletedEmp,linkofAppraiser,"linkofAppraiser")
    //console.log( range1, range2, range3, range4,"TotalEmpp");  
    const [TotalEmpCount, setTotalEmpCount] = React.useState<any>(TotalEmp);
    const [CompletedEmpCount, setCompletedEmpCount] = React.useState<any>(CompletedEmp);

  const series = [range1, range2, range3, range4];
  //  const series =[9,20,10,12]
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
        //breakpoint: 480,
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
    // plotOptions: {
    //   pie: {
    //     expandOnClick: false
    //   }
    // }
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
              // label: '5/10',
              formatter: () => `${CompletedEmp}/${TotalEmp}`
              // formatter: function (w) {
              //   return w.globals.seriesTotals.reduce((a: any, b: any) => {
              //     return a / b
              //   }, 0)
              // }
            },

          }

        },

      }
    }

  };
  const handleOnclick = (name:any) =>{
    setselectedRatingRange(name)
    setRatingsExpandActive(true)
  }
 //chart when count is zero
 const zeroSeries = [0,0,0,1];
 const zeroOptions: ApexOptions = {

   colors: ["#abb0b0"],
   chart: {
     type: "donut",
   },
   // labels: [
   //   "Low Performers",
   //   "Average Performers",
   //   "Good Performers",
   //   "High Performers",

   // ],
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
   // plotOptions: {
   //   pie: {
   //     expandOnClick: false
   //   }
   // }
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
             // label: '5/10',
             formatter: () => `${CompletedEmp}/${TotalEmp}`
             // formatter: function (w) {
             //   return w.globals.seriesTotals.reduce((a: any, b: any) => {
             //     return a / b
             //   }, 0)
             // }
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
                  color: "#3e8cb5" 
                  // padding: "20px",
                }}
              >
                Ratings Distribution
              </Typography>
          <Stack
            direction="row"

            // spacing={6}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}
          >

            {/* {(range1 !== 0 || range2 !== 0 || range3 !== 0 || range4 !== 0) && */}
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
                    Detail : {appCalId},
                    range : {checklengthinRangesH},
                  }}
                  >
                  <Box 
                  style={{
                    display: "flex",
                    alignItems: "center"
                  }} 
                  // onClick={()=>{handleOnclick("High Performers")}}
                  >
                    <span
                      style={{
                        width: "18px",
                        height: "18px",
                        display: "inline-block",
                        backgroundColor: "#33cccc",
                        verticalAlign: "middle",
                        marginRight: "8px",
                        border: "1px solid #333333",
                        borderRadius: "2px",
                        cursor:"pointer"
                      }}
                    ></span>
                   <label style={{fontSize:"12px",color:"#014d76",fontFamily:"arial"}}> High Performers</label>
                  </Box>
                  </Link>
                  <Link
                   to={linkofAppraiser}
                  state={{
                    from: "Good Performers",
                    Detail : {appCalId},
                    range : {checklengthinRangesG}
                  }}
                  >
                  <Box
                  style={{
                    display: "flex", alignItems: "center"
                  }} 
                    // onClick={()=>{handleOnclick("Good Performers")}}
                  >
                    <span
                      style={{
                        width: "18px",
                        height: "18px",
                        display: "inline-block",
                        backgroundColor: "#39ac73",
                        verticalAlign: "middle",
                        marginRight: "8px",
                        border: "1px solid #333333",
                        borderRadius: "2px",
                        cursor:"pointer"
                      }}
                    ></span>
<label style={{fontSize:"12px",color:"#014d76",fontFamily:"arial"}}> Good Performers</label>

                  </Box>
                  </Link>
                  <Link
                   to={linkofAppraiser}
                  state={{
                    from: "Average Performers",
                    Detail : {appCalId},
                    range : {checklengthinRangesA}
                  }}
                  > 
                  <Box
                  style={{
                    display: "flex", alignItems: "center"
                  }} 
                    // onClick={()=>{handleOnclick("Average Performers")}}
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
                        borderRadius: "2px",
                        cursor:"pointer"
                      }}
                    ></span>
                   <label style={{fontSize:"12px",color:"#014d76",fontFamily:"arial"}}> Average Performers</label>
                  </Box>
                  </Link>
                  <Link
                   to={linkofAppraiser}
                  state={{
                    from: "Low Performers",
                    Detail : {appCalId},
                    range:{checklengthinRangesL}
                  }}
                  >
                  <Box  
                  style={{
                    display: "flex", alignItems: "center"
                  }} 
                  //  onClick={()=>{handleOnclick("Low Performers")}}
                  >
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
                        borderRadius: "2px",
                        cursor:"pointer"
                      }}
                    ></span>
                    <label style={{fontSize:"12px",color:"#014d76",fontFamily:"arial"}}> Low Performers</label>


                  </Box>
                  </Link>
                </Stack>

              </div>
             {/* }  */}
            <div  >

              {/* <Grid> */}
              {(range1 === 0 && range2 === 0 && range3 === 0 && range4 === 0 )&&
                // <div
                //   style={{
                //     fontSize: "12px",
                //     fontFamily: "Arial",
                //     color: "#abb0b0"
                //   }}
                // >No Data Available
                // </div>
                <ReactApexChart
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
            Employees Rejection
            </Typography>
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
                {/* {completedCount === 0 && inprogressCount === 0 && inMediaton === 0 &&
                  <div
                    style={{
                      fontSize: "12px",
                      fontFamily: "Arial",
                      color: "#abb0b0",
                      marginLeft:"100px"
                    }}
                  >No Data Available
                  </div>
                  } */}
                {/* {(completedCount !== 0 || inprogressCount !== 0 || inMediaton !== 0) && */}
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
                    Detail : {appCalId},
                    status :{checkAppraisalStatusCompleted}
                  }}
                  >
                    <Box style={{  display: "flex",  alignItems: "center" }}
                      //  onClick={()=>{handleOnclick("Completed")}}
                    >
                      <span
                        style={{
                          width: "18px",
                          height: "18px",
                          display: "inline-block",
                          backgroundColor: "#39ac73",
                          verticalAlign: "middle",
                          marginRight: "8px",
                          border: "1px solid #333333",
                          borderRadius: "2px",
                          cursor:"pointer"
                        }}
                      ></span>{" "}
                    <label style={{fontSize:"12px",color:"#014d76",fontFamily:"arial"}}> Completed</label>

                    </Box>
                    </Link>
                    <Link
                  to={linkofAppraiser}
                  state={{
                    from: "In Re-normalization",
                    Detail : {appCalId},
                    status :{checkAppraisalStatusRenormalization}
                  }}
                  >
                    <Box style={{  display: "flex", alignItems: "center"  }}
                    // onClick={()=>{handleOnclick("In-Renormalization")}}
                    >
                      <span
                        style={{
                          width: "18px",
                          height: "18px",
                          display: "inline-block",
                          backgroundColor: "#ff884d",
                          verticalAlign: "middle",
                          marginRight: "8px",
                          border: "1px solid #333333",
                          borderRadius: "2px",
                          cursor:"pointer"
                        }}
                      ></span>
                      {/* In Progress */}
                     
                      <label style={{fontSize:"12px",color:"#014d76",fontFamily:"arial"}}>  In Re-normalization</label>

                    </Box>
                    </Link>
                    <Link
                  to={linkofAppraiser}
                  state={{
                    from: "In Mediation",
                    Detail : {appCalId},
                    status: {checkAppraisalStatusInmediation}
                  }}
                  >
                    <Box
                    style={{  display: "flex",  alignItems: "center"}}
                    //  onClick={()=>{handleOnclick("In-Mediation")}}
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
                          borderRadius: "2px",
                          cursor:"pointer"
                        }}
                      ></span>{" "}
                    
                      <label style={{fontSize:"12px",color:"#014d76",fontFamily:"arial"}}>  In Mediation</label>
        
                    </Box>
                    </Link>
                  </Stack>
                  {/* } */}
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
            <Box >
              {/* {(completedCount !== 0 || inprogressCount !== 0 || inMediaton !== 0) &&  */}
                <GlobeChart
                  completedCount={completedCount}
                  inprogressCount={inprogressCount}
                  inMediaton={inMediaton}

                />
                {/* } */}
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

export default EmployeeRejectionofOverallDashboard;

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
