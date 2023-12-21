import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import NarmalizerRating from "./NormalizerRating";
import Timelinereview from "./Timelinerevview";
import PAMaster from "../../../UI/PAMaster";

function NormalRating() {
  return (
    <>
      <Snackbar
        // open={open}
        autoHideDuration={6000}
        // onClose={handleClose}
        message="Note archived"
        // action={action}
      />
      <Box style={{ background: "#F1F1F1", height: "122rem" }}>

      <PAMaster name={"Mid-Year Performance Appraisal "} />

      
        <Timelinereview/>
        <div style={{paddingTop:"35px"}}>
        <NarmalizerRating />
        </div>
       
      </Box>
    </>
  );
}

export default NormalRating;
