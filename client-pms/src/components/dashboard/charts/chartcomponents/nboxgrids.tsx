import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import excel from "../excelresize.jpg";
import NestedGrid from "../boxgrid";



export default function NBoxGrids() {
    return (
      <div>
        <Container sx={{ bgcolor: "#fff" }}>
          <Grid container spacing={5} columns={18} sx={{ marginTop: 2 }}>
            <Grid item xs={10}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ textAlign: "start", marginright: "-5" }}
              >
                9 Box Grid
              </Typography>
            </Grid>
  
            <Grid item xs={6} sx={{ display: "flex", justifyContent: "end" }}>
              <img
                src={excel}
                style={{ paddingLeft: 15, width: "50px", height: "25px" }}
              />
              <OpenInNewIcon sx={{ paddingLeft: 2,width:"40%" }} />
            </Grid>
          </Grid>
          <Grid container spacing={1} sx={{marginTop:2,marginLeft:6}}>
           
           
              <NestedGrid />
           
          </Grid>
        </Container>
      </div>
    );
  }
