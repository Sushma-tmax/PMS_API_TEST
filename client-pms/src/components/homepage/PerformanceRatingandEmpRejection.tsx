import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Statusbar from "../reviewer/Dashboard/performanceratingchart/statusbar";
import Container from "@mui/material/Container";
//import OverallStatus from "./overallstatus";
import { Stack, styled } from "@mui/material";
import { useGetEmployeeQuery, useGetEmployeeByFilterQuery } from "../../service";
import { useLoggedInUser } from "../../hooks/useLoggedInUser";
import StatusBar from "./StatusBar";
import EmployeeRejection from "./EmployeeRejection";

const Dropdown = styled("div")({
  fontSize: "14px",
  fontColor: "#333333",
  fontFamily: "Arial",
});

function PerformanceRatingandEmpRejection(props: any) {
  const { data: user } = useLoggedInUser();
  console.log(user, "userinAppraiserDash")
  const { setstatusSort, completedCount, inprogressCount, inMediaton, range1, range2, range3, range4, StatusValues } = props;
  const SELECT_FOR_DASHBOARD = `employee_code,legal_full_name,position_long_description,grade,appraisal.appraiser_rating,reviewer.reviewer_rating,normalizer.normalizer_rating,appraisal.status,appraisal.appraiser_status,reviewer.reviewer_status,normalizer.normalizer_status,reviewer.rejection_count,appraisal.objective_description,reviewerIsDisabled`
  //   const { data: employeeData } = useGetEmployeeByFilterQuery(
  //     `?manager_code=${user?.employee_code}&limit=600&select=${SELECT_FOR_DASHBOARD}`
  //   );
  //   console.log(employeeData,'employeeDataaa')
  // const { data, isLoading } = useGetEmployeeQuery("all");

  // const checkAppraisalStatus = (status: string) => {
  //     return employeeData?.data?.filter((item: any) => {
  //         return item.appraisal.status === status;
  //     }).length;
  // };

  // const calculatePercentage = (num: number) => {
  //     return (num * 100) / employeeData?.data?.length;
  // };

  // const StatusValues = [
  //     {
  //         title: "Not-Started",
  //         percentage: calculatePercentage(
  //             checkAppraisalStatus("not-started")
  //         ).toFixed(2),
  //         count: checkAppraisalStatus("not-started"),
  //         // color:"linear-gradient(0deg, rgba(54,177,201,0.9472163865546218) 0%, rgba(50,191,194,1) 82%)"
  //         color:"linear-gradient(to right, #3AB6BF, #1BAAB5)"
  //     },
  //     {
  //         title: "In Progress",
  //         percentage: calculatePercentage(
  //             checkAppraisalStatus("in-progress")
  //         ).toFixed(2),
  //         count: checkAppraisalStatus("in-progress"),
  //         // color:"linear-gradient(90deg, rgba(246,191,113,0.958420868347339) 27%, rgba(246,191,113,1) 100%, rgba(255,255,255,1) 100%)"
  //         color:"linear-gradient(to right, #F9C5A1, #F99B5B)"
  //     },
  //     {
  //         title: "Normalized",
  //         percentage: calculatePercentage(
  //             checkAppraisalStatus("normalized")
  //         ).toFixed(2),
  //         count: checkAppraisalStatus("normalized"),
  //         // color:"linear-gradient(0deg, rgba(37,173,200,1) 98%, rgba(126,221,240,0.9948354341736695) 100%, rgba(251,254,255,1) 100%)"
  //         color:"linear-gradient(to right, #3BD7F6, #26B4D0)"
  //     },
  //     {
  //         title: "Rejected",
  //         percentage: calculatePercentage(
  //             checkAppraisalStatus("rejected")
  //         ).toFixed(2),
  //         count: checkAppraisalStatus("rejected"),
  //         // color:"linear-gradient(90deg, rgba(175,191,201,0.8939950980392157) 0%, rgba(148,161,168,1) 100%)"
  //         color:"linear-gradient(to right, #BECFD9, #89949A)"
  //     },
  //     {
  //         title: "Completed",
  //         percentage: calculatePercentage(
  //             checkAppraisalStatus("completed")
  //         ).toFixed(2),
  //         count: checkAppraisalStatus("completed"),
  //         // color:"linear-gradient(158deg, rgba(158,232,220,1) 0%, rgba(10,166,141,1) 99%, rgba(35,191,165,1) 100%)"
  //         color:"linear-gradient(to right, #35CFB6, #079B82)"
  //     },
  // ];

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
            style={{
              //justifyContent: "space-between",
              alignItems: "baseline",
              // marginTop: "0px",
              marginLeft: "0px",
              padding: "20px",
              gap: "16%"
            }}
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
                  {/* No. of Employees: ({employeeData?.data?.length}) */}
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
            <Grid item xs={6} style={{ paddingLeft: "0px", paddingTop: "0px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                <Typography

                  fontSize="20px"
                  fontFamily="Arial"
                >
                  Employee Rejection</Typography>
                <Typography

                  fontSize="18px"
                  fontFamily="Arial"
                  color="#3e8cb5"
                >
                  {user?.calendar?.name}
                  </Typography>
              </div>
            </Grid>
          </Grid>
          <Container sx={{ marginTop: 3 }} maxWidth="xl">
            <EmployeeRejection
              completedCount={completedCount}
              inprogressCount={inprogressCount}
              inMediaton={inMediaton}
              range1={range1}
              range2={range2}
              range3={range3}
              range4={range4}
              // range5={range5}
            />
          </Container>
          {/* <Statusbar />  */}
          {/* <OverallStatus setstatusSort={setstatusSort} /> */}
          <StatusBar StatusValues={StatusValues} />
        </Box>
      </div>
    </>
  );
}

export default PerformanceRatingandEmpRejection;
