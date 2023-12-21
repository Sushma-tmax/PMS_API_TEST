import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function OverallStatus() {
  return (
    <div>
     
        <Box sx={{ flexGrow: 1, bgcolor: "#fdf9f2",padding: 3 ,marginTop:5, marginBottom:3, width:"100%" }}>
          {/* #fdf9f2 */}
          <Grid container spacing={0.5}>
            <Grid item xs={4.5}>
              <Typography
                variant="h5"
                gutterBottom
                component="div"
                align="left"
                fontWeight={500}
                
                marginRight={2}
              >
                Status
              </Typography>
              <Typography
                
                gutterBottom
                component="div"
                align="left"
               
               
                marginLeft={6}
              >
                600 Employees
              </Typography>
            </Grid>
            <Grid item xs={2.5}>
              <Typography
               
                gutterBottom
                component="div"
                align="right"
                fontWeight={500}
                marginBottom={2}
                marginRight={2}
                paddingTop="inherit"
              >
                <span style={{ color: "green" }}>COMPLETED </span>{" "}
                <span style={{ fontSize: 22 }}> 400</span>
                <span style={{ paddingLeft: 15, fontSize: 18 }}>(50%)</span>
              </Typography>
            </Grid>
            <Grid item xs={2.5}>
              <Typography
                 gutterBottom
                component="div"
                align="right"
               height={60}
                fontWeight={500}
                marginBottom={2}
                marginRight={2}
                borderLeft={1}
                borderColor={"#d4d9d6"}
                paddingTop="inherit"
               
              >
                <span style={{ color: "#f7cc22" }}>IN PROGRESS</span>{" "}
                <span style={{ fontSize: 22 }}> 100</span>
                <span style={{ paddingLeft: 15, fontSize: 18 }}>(25%)</span>
              </Typography>
            </Grid>
            <Grid item xs={2.5}>
              <Typography
              
                gutterBottom
                component="div"
                align="right"
                fontWeight={500}
                marginBottom={2}
                marginRight={2}
                borderLeft={1}
                borderColor={"#d4d9d6"}
                height={60}
                paddingTop="inherit"
              >
                <span style={{ color: "#c00000" }}> NOT STARTED </span>{" "}
                <span style={{ fontSize: 22 }}> 100</span>
                <span style={{ paddingLeft: 15, fontSize: 18 }}>(25%)</span>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      
    </div>
  );
}
