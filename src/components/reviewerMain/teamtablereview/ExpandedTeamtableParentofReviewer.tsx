import * as React from "react";
import Grid from "@mui/material/Grid";
import { Container, Box, Stack, Breadcrumbs } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Button, IconButton, Typography } from "@mui/material";
import Newexcel from "../../assets/Images/Newexcel.svg";
import Timelinerevview from "../../reviewer/Dashboard/Timelinerevview";
import ExpandedTeamTableofReviewer from "./ExpandedTeamTableofReviewer";
import Leftarrow from "../../../assets/Images/Leftarrow.svg";
import { Link, useNavigate } from "react-router-dom";
export default function ExpandedTeamtableParentofReviewer(props: any) {
  const navigate = useNavigate();
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
          marginLeft="32px"
        >
          {/* <IconButton
        onClick={() => { navigate(`/reviewer`) }}
      >
        <img src={Headleft} alt="icon" />
      </IconButton> */}
          {/* <Link to={`/dashboardreview`}></Link> */}
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              style={{
                fontSize: "18px",
                color: "#3e8cb5",
                fontFamily: "Arial",
              }}
              color="inherit"
              to={"/reviewer"}
            >
              My Team Dashboard
            </Link>
            <Link
              style={{
                fontSize: "18px",
                color: "#3e8cb5",
                fontFamily: "Arial",
              }}
              color="inherit"
              to={"/reviewer"}
              state={{
                from: `${1}`
              }}
            >
              My Actions
            </Link>
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
        {/* <Stack direction="row" alignItems="center" minHeight="50px" marginLeft="15px">
        <IconButton
        onClick={() => {
          navigate(-1)
        }}
        >
          <img src={Leftarrow} alt="button" />
        </IconButton>
        <Typography
        sx={{ fontSize: "20px", fontFamily: "Arial", color: "#3e8cb5" }}
        >9-Box Grid</Typography>
        </Stack> */}
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
          <ExpandedTeamTableofReviewer />
        </div>
      </div>
    </>
  );
}
