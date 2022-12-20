import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import excel from "../excelresize.jpg";
import NestedGrid from "../boxgrid";
import Newexcel from "../../Reviewericons/Newexcel.svg";
import Expand from "../../Reviewericons/Expand.svg";
import { useState, useRef } from "react";
import { useReactToPrint } from 'react-to-print';
export default function NBoxGrids() {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  }); 
  return (
    <div ref={componentRef} >
      <Container sx={{ bgcolor: "#fff",position:"relative",paddingBottom:"12px", }}>
        <Grid container spacing={5} columns={16} sx={{ marginTop: 2 }}>
          <Grid item xs={10}>
            <Typography
              
              sx={{ textAlign: "start", marginright: "-5", fontSize: "20px",
              fontFamily: "Arial",
              color:"#3e8cb5" }}
            >
              9-Box Grid
            </Typography>
          </Grid>

          <Grid item xs={5.3} sx={{ display: "flex", justifyContent: "end" }}>
            <img
              src={Newexcel}
              style={{ height: "20px" }}
              onClick={handlePrint}
            />
            {/* <img src={Expand} 
            style={{ paddingLeft: 10, width: "50px", height: "20px" }}
            /> */}
          </Grid>
        </Grid>
        <div style={{paddingLeft:"53px",paddingTop:"15px"}}>
          <NestedGrid />
        </div>
      </Container>
    </div>
  );
}
