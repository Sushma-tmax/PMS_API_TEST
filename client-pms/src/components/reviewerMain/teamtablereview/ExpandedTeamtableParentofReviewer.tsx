import * as React from "react";
import Grid from "@mui/material/Grid";
import { Container, Box, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Button, IconButton, Typography } from "@mui/material";
import Newexcel from "../../assets/Images/Newexcel.svg";
import Timelinerevview from "../../reviewer/Dashboard/Timelinerevview";
import ExpandedTeamTableofReviewer from "./ExpandedTeamTableofReviewer";
import Leftarrow from "../../../assets/Images/Leftarrow.svg";
import { Link,useNavigate  } from "react-router-dom";
export default function ExpandedTeamtableParentofReviewer(props: any) {
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          background: "#f1f1f1",
        }}
      ><Stack direction="row" alignItems="center" minHeight="50px" marginLeft="15px">
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
        </Stack>
        <div >
          <Timelinerevview />
        </div>
        <div>
          <ExpandedTeamTableofReviewer/>
        </div>
      </div>
    </>
  );
}
