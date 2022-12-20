import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import ReviewerRating from "./ReviewerRating";
import Timelinereview from "./Timelinerevview";
import PAMaster from "../../../UI/PAMaster";

function Rating() {
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
        <ReviewerRating />
        </div>
       
      </Box>
    </>
  );
}

export default Rating;
