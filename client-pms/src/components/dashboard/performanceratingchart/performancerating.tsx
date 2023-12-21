import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Statusbar from "./statusbar";
import OverallStatus from "./overallstatus";




function PerformanceRating() {
    return (

         <div>

           <Box sx={{ flexGrow: 1, bgcolor: "#FFFEFD", minHeight: "50vh", width:"100%"}}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                align="left"
                fontWeight={400}
                                  
              >
                Performance Apprasial Rating Chart
              </Typography>
            </Grid>

                   
            <Grid item xs={1.5}>
              <FormControl variant="standard" sx={{  minWidth: 100 }}>
                <Select sx={{ border: "none" }} defaultValue={10} label="Age">
                  <MenuItem value={10}>All Division</MenuItem>
                  <MenuItem value={20}>Corporate Support</MenuItem>
                  <MenuItem value={30}>Financial And Logistics</MenuItem>
                  <MenuItem value={40}>Operations UAE</MenuItem>
                  <MenuItem value={50}>Engineering</MenuItem>
                  <MenuItem value={60}>Sales</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={1.5}>
              <FormControl variant="standard" sx={{  minWidth: 150 }}>
                <Select sx={{ border: "none", marginright:5}} defaultValue={10} label="Age">
                  <MenuItem value={10}>All Sections</MenuItem>
                  <MenuItem value={20}>Administration</MenuItem>
                  <MenuItem value={30}>Human Resources</MenuItem>
                  <MenuItem value={40}>Information Technologies</MenuItem>
                  <MenuItem value={50}>Continuous Improvement</MenuItem>
                  <MenuItem value={60}>Business</MenuItem>
                </Select>
              </FormControl>
            </Grid>


            <Grid item xs={2}>
              <FormControl variant="standard" sx={{  minWidth: 100 }}>
                <Select sx={{ border: "none",marginLeft:3 }} defaultValue={10} label="Age">
                  <MenuItem value={10}>All Sub Sections</MenuItem>
                  <MenuItem value={20}>Mid-Year</MenuItem>
                  <MenuItem value={30}>2021</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={1}>
            <FormControl variant="standard" sx={{  minWidth: 100 }}>
                <Select sx={{ border: "none" ,marginright:1}} defaultValue={20} label="Age">
                <MenuItem value={10}>All Sub Sections</MenuItem>
                  <MenuItem value={20}>Mid-Year</MenuItem>
                  <MenuItem value={30}>2021</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={2}>
            <FormControl variant="standard" sx={{display:"block",justifyContent:"end" ,minWidth: 100}}>
                <Select sx={{ border: "none",marginLeft:8}} defaultValue={30} label="Age">
                <MenuItem value={10}>All Sub Sections</MenuItem>
                  <MenuItem value={20}>Mid-Year</MenuItem>
                  <MenuItem value={30}>2021</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            </Grid>
             <Statusbar/>
             <OverallStatus />
          
         
         </Box>
       </div>
    );
}


export default PerformanceRating;