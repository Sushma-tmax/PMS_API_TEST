import React from "react";
import { useState } from "react";
import {
  Alert,
  Breadcrumbs,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/material";
import PAMaster from "../../components/UI/PAMaster";
import { makeStyles } from "@mui/styles";
import { Link, useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    width: "80%",
    margin: "0 auto",
    textAlign: "center",
    marginTop: "50px",
  },
  text1: {
    fontSize: "18px !important",
    color: "#3e8cb5 !important",
    fontFamily: "Arial !important",
    paddingBottom: "20px",
  },
  text2: {
    fontSize: "14px !important",
    color: "#33333 !important",
    fontFamily: "Arial !important",
    paddingBottom: "20px",
  },
});
const NoliveCalendar = (props: any) => {
  const { navigateToClosedDashboard, navigationFrom } = props;
  const classes = useStyles();
  console.log(navigationFrom, "navigationFrom")
  const navigate = useNavigate();

  // const ClickHandler = () => {
  //     if(navigationFrom == "Appraiser"){
  //       navigate("/ClosedcalendarDashboardAppraiser")
  //     }else if(navigationFrom == "Reviewer"){
  //       navigate("/ClosedcalendarDashboardReviewer")
  //     }else if(navigationFrom == "Normalizer"){
  //       navigate("/ClosedcalendarDashboardNormalizer")
  //     }
  // }

  return (
    <>

      
      
        {navigationFrom == "PAAdmin" ?  <div>  <PAMaster navigationFrom = {navigationFrom} /> 
        </div>
        :
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={0}
          minHeight="50px"
          marginLeft="25px"
        >
          <Breadcrumbs sx={{ marginTop: "5px" }} aria-label="breadcrumb">
            <div
              style={{
                fontSize: "18px",
                color: "#333333",
                fontFamily: "Arial",
              }}
              color="inherit"
            >
              Dashboard
            </div>
          </Breadcrumbs>
          </Stack>
            }
      

            

      <Box
        sx={{
          height: "calc(100vh - 180px)",
          background: "#fff",
          padding: "20px",
          marginLeft: "25px",
          marginRight: "25px",
        }}
      >
        <div className={classes.container}>
          <Typography className={classes.text1}>
            There is no live calendar{" "}
          </Typography>
          <Typography className={classes.text2}>
            The performance appraisal was not initiated. Please click below if you wish to view past performance appraisal details.
          </Typography>
          <div>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={2}
            >

              {/* {navigationFrom =="Appraiser" && ( */}
              {navigateToClosedDashboard !== undefined &&
                <Link
                style={{
                  fontSize:"16px",
                  fontFamily:"arial",
                  color:"#0099FF"
                }}
                  to={navigateToClosedDashboard}
                >

                  <span>Previous Dashboard</span>
                </Link>
              }
              {/* )} */}

              {/* {navigationFrom =="Reviewer" && (

            <Typography>
                <CalendarTodayOutlinedIcon />

                <span>2020</span>
              </Typography>
          )}
             {navigationFrom == "Normalizer" && (

              <Typography>
                <CalendarTodayOutlinedIcon />

                <span>2020</span>
              </Typography>

           )}  */}
            </Stack>
          </div>
        </div>
      </Box>
    </>
  );
};

export default NoliveCalendar;
