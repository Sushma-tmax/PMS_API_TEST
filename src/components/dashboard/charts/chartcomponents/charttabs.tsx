import React from 'react'
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import excel from "../excelresize.jpg";
import TrailChart from '../trailchart';
import ChartTable from '../charttable';
import { Link } from 'react-router-dom';

export default function ChartTabs() {
    return (
        <div>
            <Container sx={{ bgcolor: "#fff"}}>
            <Grid container spacing={5} columns={16}  sx={{marginLeft:'-1',marginTop:2 }}>
              <Grid item xs={4}>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  sx={{ textAlign: "left" }}
                >
                  Bell Curve
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  gutterBottom
                  component="div"
                  sx={{ fontSize: 16, textAlign: "center" }}
                >
                  Comparison
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <FormControl variant="standard" sx={{ minWidth: 80 }}>
                  <Select sx={{ border: "none" }} defaultValue={30} label="Age">
                    <MenuItem value={10}>All Sub Sections</MenuItem>
                    <MenuItem value={20}>Mid-Year</MenuItem>
                    <MenuItem value={30}>2021</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4} sx={{ justifyContent: "end" }}>
                <img
                  src={excel}
                  style={{ paddingLeft: 15, width: "50px", height: "25px" }}
                />
                <OpenInNewIcon sx={{ paddingLeft: 2 ,width:"50%"}} />
              </Grid>
            </Grid>
            <TrailChart />
            <ChartTable />
            </Container>
        </div>
    )
}
