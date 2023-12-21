import React from "react";

import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import Stackinfo from "./Stackinfo";

const Profile = (props:any) => {
  const {appraisalData} = props
  return (
    <div>
      <Box
        sx={{
          // position:'absolute',
          height: '67px',
          width: "850px",
          marginLeft: "20px",
          marginTop: "20px",
          // background: "#004c75",
          borderRadius: "5px",
          boxShadow:"3"
        }}
      >
        <Stackinfo appraisal1Data = {appraisalData}/>
      </Box>
    </div>
  );
}

export default Profile