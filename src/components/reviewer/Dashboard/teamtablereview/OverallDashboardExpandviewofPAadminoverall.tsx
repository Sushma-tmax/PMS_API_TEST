import * as React from "react";
import Grid from "@mui/material/Grid";
import { Container, Box, Stack,Breadcrumbs } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Button, IconButton, Typography } from "@mui/material";
import Newexcel from "../../assets/Images/Newexcel.svg";
import Timelinerevview from "../Timelinerevview";
import OverallDashboardExpandTableChild from "../../../homepage/OverallDashboardComponents/MyTeamTable/OverallDashboardExpandTableChild";
import Leftarrow from "../../../../assets/Images/Leftarrow.svg";
import { Link,useNavigate  } from "react-router-dom";
export default function OverallDashboardPAadminoverall(props: any) {
    const {
        employeeData1,
        setTeamtableExpandActive
    } = props;
  const navigate = useNavigate();
  const handleBack=() =>{
    setTeamtableExpandActive(false);
    navigate("/PA_Dashboard") 
  }
  return (
    <>
      <div
        style={{
          background: "#f1f1f1",
        }}
      >
      
         <Stack
    direction="row"
    justifyContent="flex-start"
    alignItems="center"
    spacing={0}
    minHeight="50px"
    marginLeft="25px"
  >
   
    <Breadcrumbs aria-label="breadcrumb">
    {/* <Link
              style={{
                fontSize: "18px",
                color: "#3e8cb5",
                fontFamily: "Arial",
              }}
              color="inherit"
              to={"/dashboardreview"}
            >
              My Team Dashboard
              </Link> */}
              {/* <Link
              style={{
                fontSize: "18px",
                color: "#3e8cb5",
                fontFamily: "Arial",
              }}
              color="inherit"
              to={"/dashboardreview"}
              state={{
                from: `${1}`
              }}
            > */}
         <Link to={"/PA_Dashboard"}>  
            <Typography
        style={{
          fontSize: "18px",
          color: "#3e8cb5",
          fontFamily: "Arial",
          cursor:"pointer"
        }}
        // color="text.primary"
        // onClick={() => {setTeamtableExpandActive(false),navigate(-1)}}
        // onClick={() => handleBack}
      >
     Overall Dashboard
      </Typography>
      </Link> 
             
            {/* </Link> */}
      <Typography
        style={{
          fontSize: "18px",
          color: "#333333",
          fontFamily: "Arial",
        }}
        color="text.primary"
      >
    My Team
      </Typography>
    </Breadcrumbs>
  </Stack>
  {/* <div
          style={{
            fontSize: "20px",
            color: "#333333",
            padding: "20px",
            fontFamily: "arial",
            backgroundColor: "white",
            marginLeft: "25px",
            marginRight: "25px"

          }}>
          Timeline
        </div>
        <div >
          <Timelinerevview />
        </div> */}
        <div>
          <OverallDashboardExpandTableChild 
          employeeData1={employeeData1}
          />
        </div>
      </div>
    </>
  );
}
