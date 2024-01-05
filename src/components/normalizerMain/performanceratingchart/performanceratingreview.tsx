import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Statusbar from "./statusbar";
import OverallStatus from "./overallstatus";
import { Stack } from "@mui/material";
import { useGetEmployeeQuery } from "../../../service";
import { useLoggedInUser } from "../../../hooks/useLoggedInUser";

function PerformanceRatingreview(props:any) {
  const { data: user } = useLoggedInUser();
  console.log(user?._id, 'useLoggedInUser')
  console.log(user,"user")

  const {  setstatusSort } = props
  return (
    <>
      <div style={{ marginTop: "40px", position: "relative" }}>
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
          <Grid
            style={{ justifyContent: "space-between", marginLeft: "0px", alignItems:"baseline",
            padding: "20px" }}
            container
            spacing={2}
          >
            <Grid style={{ paddingLeft: "0px", paddingTop: "0px" }} item xs={4}>
              <Typography
                 style={{
                  fontSize: "20px",
                  fontFamily: "Arial",
                  // padding: "20px",
                }}
              >
                 Ratings Distribution
              </Typography>
              <Typography
              component="div"
              align="left"
              // marginLeft={6}
              fontSize="14px"
              fontFamily="Arial"
              color="#333333"
              style={{ opacity: "64%" }}
            >
             
              <div>
                {/* No. of Employees: ({data?.data?.length}) */}
              </div>
              {/* <div style={{ paddingLeft: "23px" }}>
                {employeeData?.data?.length}
              </div> */}
            </Typography>
            </Grid>

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
          </Grid> */}

            {/* <Grid item xs={1.5}>
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
          </Grid> */}
            {/* <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={3}
              // marginLeft="414px"
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
                         Mid-Year
                       
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
            </Stack> */}
             <Grid item xs={4} style={{paddingLeft:"0px", paddingTop:"0px"}}>
                <Typography
                
                fontSize="20px"
                fontFamily="Arial"
              >
                   {user?.calendar?.name}
                   </Typography>
                  </Grid>
          </Grid>

          <Statusbar />
          <OverallStatus setstatusSort={ setstatusSort} />
        </Box>
      </div>
    </>
  );
}

export default PerformanceRatingreview;
