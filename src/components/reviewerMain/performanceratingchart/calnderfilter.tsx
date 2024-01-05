import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Statusbar from "./statusbar";
import OverallStatus from "./overallstatus";
import { Stack, styled } from "@mui/material";

const Dropdown = styled("div")({
  fontSize: "14px",
  fontColor: "#333333",
  fontFamily: "Arial",
});

function CalendarFilters(props: any) {
 

    return (
    <>
      <div style={{ marginTop: "0px", position: "relative" }}>
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "#fff",
            // bgcolor: "#d16c08",
            // bgcolor:"aquamarine",
            // height: "calc(100vh - 320px)",
            // width: "96%",
            marginLeft: "25px",
            marginRight: "25px",
          }}
        >
         
            {/* <Grid style={{ paddingLeft: "0px", paddingTop: "0px" }} item xs={4}>
              <Typography
                style={{
                  fontSize: "20px",
                  fontFamily: "Arial",
                  // padding: "20px",
                }}
              >
              Ratings Distribution
              </Typography>
             
            </Grid> */}

           {/* <Grid item xs={1.5}>
            <FormControl variant="standard" sx={{ minWidth: 100 }}>
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
            <FormControl variant="standard" sx={{ minWidth: 150 }}>
              <Select
                sx={{ border: "none", marginright: 5 }}
                defaultValue={10}
                label="Age"
              >
                <MenuItem value={10}>All Sections</MenuItem>
                <MenuItem value={20}>Administration</MenuItem>
                <MenuItem value={30}>Human Resources</MenuItem>
                <MenuItem value={40}>Information Technologies</MenuItem>
                <MenuItem value={50}>Continuous Improvement</MenuItem>
                <MenuItem value={60}>Business</MenuItem>
              </Select>
            </FormControl>
          </Grid>  */}
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={3}
             paddingRight="15px"
            >
               <div>
                <Grid item xs={2}>
                  <FormControl variant="standard" sx={{ minWidth: 100 }}>
                    <Select
                      sx={{ border: "none", marginLeft: 3 }}
                      defaultValue={10}
                      label="Age"
                    >
                      <MenuItem
                        style={{
                          fontSize: "14px",
                          // fontColor: "#333333",
                          fontFamily: "Arial",
                        }}
                        value={10}
                      >
                        Calendar
                      </MenuItem>
                      <MenuItem
                        style={{
                          fontSize: "14px",
                          // fontColor: "#333333",
                          fontFamily: "Arial",
                        }}
                        value={20}
                      >
                        Mid-Year
                      </MenuItem>
                      <MenuItem
                        style={{
                          fontSize: "14px",
                          // fontColor: "#333333",
                          fontFamily: "Arial",
                        }}
                        value={30}
                      >
                        2021
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </div>
              <div>
                <Grid item xs={2}>
                  <FormControl variant="standard" sx={{ minWidth: 100 }}>
                    <Select
                      sx={{ border: "none", }}
                      defaultValue={10}
                      label="Age"
                    >
                      <MenuItem
                        style={{
                          fontSize: "14px",
                          // fontColor: "#333333",
                          fontFamily: "Arial",
                        }}
                        value={10}
                      >
                         Year
                       
                      </MenuItem>
                      <MenuItem
                        style={{
                          fontSize: "14px",
                          // fontColor: "#333333",
                          fontFamily: "Arial",
                        }}
                        value={20}
                      >
                        Section
                      </MenuItem>
                      <MenuItem
                        style={{
                          fontSize: "14px",
                          // fontColor: "#333333",
                          fontFamily: "Arial",
                        }}
                        value={30}
                      >
                        2021
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </div>
              <div>
                <Grid item xs={1}>
                  <FormControl variant="standard" sx={{ minWidth: 100 }}>
                    <Select
                      sx={{ border: "none", marginright: 1 }}
                      defaultValue={10}
                      label="Age"
                    >
                      <MenuItem
                        style={{
                          fontSize: "14px",
                          // fontColor: "#333333",
                          fontFamily: "Arial",
                        }}
                        value={10}
                      >
                     
                         Section
                      </MenuItem>
                      <MenuItem
                        style={{
                          fontSize: "14px",
                          // fontColor: "#333333",
                          fontFamily: "Arial",
                        }}
                        value={20}
                      >
                           Corp Support ExCom
                      </MenuItem>
                      <MenuItem
                        style={{
                          fontSize: "14px",
                          // fontColor: "#333333",
                          fontFamily: "Arial",
                        }}
                        value={30}
                      >
                       Corp Support - HR
                      </MenuItem>
                      <MenuItem
                        style={{
                          fontSize: "14px",
                          // fontColor: "#333333",
                          fontFamily: "Arial",
                        }}
                        value={40}
                      >
                      Eng - Application and Design
                      </MenuItem>
                      <MenuItem
                        style={{
                          fontSize: "14px",
                          // fontColor: "#333333",
                          fontFamily: "Arial",
                        }}
                        value={50}
                      >
                     Eng Ex-Com
                      </MenuItem>
                      <MenuItem
                        style={{
                          fontSize: "14px",
                          // fontColor: "#333333",
                          fontFamily: "Arial",
                        }}
                        value={60}
                      >
                      Ops OS - ExCom
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </div>
              <div>
                <Grid item xs={2}>
                  <FormControl
                    variant="standard"
                    sx={{
                      display: "block",
                      justifyContent: "end",
                      minWidth: 100,
                    }}
                  >
                    <Select
                      sx={{ border: "none" }}
                      defaultValue={10}
                      label="Age"
                    >
                      <MenuItem
                        style={{
                          fontSize: "14px",
                          // fontColor: "#333333",
                          fontFamily: "Arial",
                        }}
                        value={10}
                      >
                       Sub-section
                      </MenuItem>
                      <MenuItem
                        style={{
                          fontSize: "14px",
                          // fontColor: "#333333",
                          fontFamily: "Arial",
                        }}
                        value={20}
                      >
                        Installation
                      </MenuItem>
                      <MenuItem
                        style={{
                          fontSize: "14px",
                          // fontColor: "#333333",
                          fontFamily: "Arial",
                        }}
                        value={30}
                      >
                       Service
                      </MenuItem>
                      <MenuItem
                        style={{
                          fontSize: "14px",
                          // fontColor: "#333333",
                          fontFamily: "Arial",
                        }}
                        value={40}
                      >
                       SME's
                      </MenuItem>
                      <MenuItem
                        style={{
                          fontSize: "14px",
                          // fontColor: "#333333",
                          fontFamily: "Arial",
                        }}
                        value={50}
                      >
                        CAC
                      </MenuItem>
                      <MenuItem
                        style={{
                          fontSize: "14px",
                          // fontColor: "#333333",
                          fontFamily: "Arial",
                        }}
                        value={60}
                      >
                      IT
                      </MenuItem>
                      <MenuItem
                        style={{
                          fontSize: "14px",
                          // fontColor: "#333333",
                          fontFamily: "Arial",
                        }}
                        value={70}
                      >
                     Projects   
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </div>
            </Stack> 
            

       
         
        </Box>
      </div>
    </>
  );
}

export default CalendarFilters;
