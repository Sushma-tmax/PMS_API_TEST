import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Stack,
  Typography,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  SelectChangeEvent
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  useGetEmployeeAppraisalQuery,
} from "../../service";
import performance from "../../assets/Images/performance.svg";
import Avatar from "@mui/material/Avatar";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import _ from "lodash";
import { useGetClosedCalenderQuery } from "../../service/calender/Calender";
import { EMPLOYEE_PREVIOUS_PAs } from "../../constants/routes/Routing";
import { useGetPreviousAppraisalEmployeeQuery } from "../../service/employee/previousAppraisal";
import Blueleft from "../appraisal/components/Icons/Blueleft.svg"

export default function NoCalendarSelected() {
  const { employee_id } = useParams();
  const navigate = useNavigate();
  const { data: employeeData, isLoading } =
    useGetEmployeeAppraisalQuery(employee_id);
  const { data: closedCalendarData } = useGetClosedCalenderQuery("")

  const location: any = useLocation();
  const { appraisalNotCompleted } = location?.state
  const [show, setShow] = useState<any>(false);
  const [selectedYear, setSelectedYear] = useState<number>();
  const [selectedCalendar, setSelectedCalendar] = useState<any>()
  const [viewSelectedCalendar, setViewSelectedCalendar] = useState<any>()
  const [employeeCode, setEmployeeCode] = useState<any>(employeeData?.data?.employee_code);
  const [noAppraisal, setNoAppraisal] = useState(false);
  const [showNoAppraisalContent, setShowNoAppraisalContent] = useState(false)
  const [selectCalendarContent , setSelectedCalendarContent] = useState(true)
  const { data: employeeDataPreviousCalendar } = useGetPreviousAppraisalEmployeeQuery({ employeeCode: employeeData?.data?.employee_code, calendarId: selectedCalendar })
  console.log(appraisalNotCompleted, "appraisalNotCompleted");

  const ITEM_HEIGHT = 28;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        //  maxWidth: 140,
      },
    },
  };

  const handleYearChange = (event: any) => {
    console.log(event.target.value, 'eventyear')
    setSelectedYear(event.target.value);
  };

  const handleCalendarTypeChange = (event: SelectChangeEvent) => {
    console.log(event.target.value, 'calendarTypeee')
    setSelectedCalendar(event.target.value as string)
  };

  /* navigate to other screen to view previous appraisal related to employee code and calendar Id */
  const viewPreviousAppraisal = () => {
    if ((employeeDataPreviousCalendar?.employee?.employee_code !== "" || 
       employeeDataPreviousCalendar?.employee?.employee_code !== undefined) && 
        employeeDataPreviousCalendar?.employee?.appraisal?.status === "completed") {
          navigate(`${EMPLOYEE_PREVIOUS_PAs}/employee/${employee_id}`,
          {state : {
            employeeCodeFromLanding: employeeData?.data?.employee_code,
            calendarTypeFrom: selectedCalendar,
            yearFrom: selectedYear,
            previousCalendarData : employeeDataPreviousCalendar
          }})
        }
        else {
          setSelectedCalendarContent(false)
          setShowNoAppraisalContent(true);
        }
    // if (employeeCode && selectedCalendar) {
    //   console.log(selectedCalendar, 'selectedCalendarrr')
    //   setViewSelectedCalendar(selectedCalendar);
    //   setShowNoAppraisalContent(true);
      
    // }
  }

  /* function to select a initial calendar */
  const initialYear = closedCalendarData?.data?.map((j: any) => {
    return j?.pa_launch?.substring(0, 4)
  })

  /* if no calendar year selected , then set the latest calendar year */
  useEffect(() => {
    if (initialYear && (selectedYear == null || selectedYear == undefined)) {
      setSelectedYear(initialYear[0])
    }
  }, [initialYear, selectedYear])

  /* if no calendar type selected then select the latest calendar type */
  useEffect(() => {
    if (closedCalendarData) {
      let tempCalendar = closedCalendarData?.data[0]?._id
      console.log(tempCalendar, 'tempCalendar')
      setSelectedCalendar(tempCalendar);
      setViewSelectedCalendar(tempCalendar)
    }
  }, [closedCalendarData])

  useEffect(() => {
    if (appraisalNotCompleted) {
      setNoAppraisal(true);
     setSelectedCalendarContent(false)
    } else {
      setNoAppraisal(false);
      setSelectedCalendarContent(true)
    }
  },[appraisalNotCompleted])

  return (

    <div
      style={{
        backgroundColor: "#F1F1F1",
        height: "auto",
        minHeight: "100px",
        overflow: "hidden",
      }}
    >
       {/* <Stack direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="94%"
        paddingLeft="40px"  >
       <Button
        style={{
          marginLeft :"-40px"
         }}
          size="large"><img src={Blueleft} alt='icon'
      
       onClick={() => {
        navigate(-1);
       }}/></Button> 
       </Stack> */}
      
      <Box
        sx={{
          background: "#fff",
          margin: "25px",
          minHeight: "100px",
          overflow: "hidden",
          height:"auto",
        
        }}
      >
        <Box
          style={{
            padding: "35px",
            // height: "calc(100vh - 165px)"
          }}
        >
          <Typography
            style={{
              color: "#3E8CB5",
              fontWeight: "400",
              fontSize: "28px",
              fontFamily: "Arial",
              paddingBottom:"25px"
            }}
          >
            Welcome to Performance Appraisal
          </Typography>
          <Box sx={{ backgroundColor: "#f3fbff", paddingLeft: "20px" }}>
          <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography
                    style={{ paddingTop: "10px", paddingBottom: "10px" }}
                  >
                    {employeeData?.data?.profile_image_url != undefined ? (
                      <img style={{ width: "55px", borderRadius: "30px", height: "55px" }} src={employeeData?.data?.profile_image_url} />
                    ) : (
                      <Avatar style={{ width: "55px", height: "55px" }}>
                        {employeeData &&
                          employeeData?.data?.legal_full_name.substring(0, 1)}
                      </Avatar>
                    )}
                  </Typography>
                  <Stack direction="column" spacing={1}>
                    <span
                      style={{
                        fontSize: "17px",
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                      }}
                    >
                      {employeeData?.data?.first_name}
                    </span>
                    <span
                      style={{
                        color: "#333333",
                        opacity: "50%",
                        fontSize: "12px",
                        fontFamily: "Arial",
                        marginTop: "5px",
                      }}
                    >
                      {employeeData?.data?.position_long_description}{" "}
                      
                    </span>

                    <span
                      style={{
                        color: "#333333",
                        opacity: "50%",
                        fontSize: "12px",
                        fontFamily: "Arial",
                        marginTop: "5px",
                      }}
                    >
                       Grade {employeeData?.data?.grade}{" "}
                      </span>


                    <span
                      style={{
                        opacity: "50%",
                        fontSize: "12px",
                        fontFamily: "Arial",
                        marginTop: "5px",
                      }}
                    >
                      {employeeData?.data?.employee_code}
                    </span>
                  </Stack>

                </Stack>
            {/* <Grid container spacing={0} sx={{ alignItems: "center" }}>
              {/* <Grid item xs={1} md={0.7}>
                <Typography
                  style={{ paddingTop: "10px", paddingBottom: "10px" }}
                >
                  {employeeData?.data?.profile_image_url != undefined ? (
                      <img style={{ width: "55px", borderRadius: "30px", height: "55px" }} src={employeeData?.data?.profile_image_url} />
                    ) : (
                      <Avatar style={{ width: "55px", height: "55px" }}>
                        {employeeData &&
                          employeeData?.data?.legal_full_name.substring(0, 1)}
                      </Avatar>
                    )}
                  {/* <Avatar sx={{ width: 60, height: 60 }}>A</Avatar> */}
                {/* </Typography>
              </Grid> */}
              {/* <Grid item xs={9} md={10}>
                <Stack direction="column" spacing={1}>
                  <span
                    style={{
                      fontSize: "17px",
                      fontFamily: "Arial",
                      color: "#3E8CB5",
                    }}
                  >
                    {employeeData?.data?.legal_full_name}
                  </span>
                  <span
                    style={{
                      color: "#333333",
                      opacity: "50%",
                      fontSize: "12px",
                      fontFamily: "Arial",
                      marginTop: "5px",
                    }}
                  >
                    {employeeData?.data?.position_long_description}{" "}
                  </span>

                  <span
                    style={{
                      color: "#333333",
                      opacity: "50%",
                      fontSize: "12px",
                      fontFamily: "Arial",
                      marginTop: "5px",
                    }}
                  >
                     Grade {employeeData?.data?.grade}{" "}
                  </span>

                  <span
                    style={{
                      opacity: "50%",
                      fontSize: "12px",
                      fontFamily: "Arial",
                      marginTop: "5px",
                    }}
                  >
                    {employeeData?.data?.employee_code}
                  </span>
                </Stack>

              </Grid> */}

            {/* </Grid>  */}
          </Box>
          <Box >
            <Stack direction="column" spacing={3} style={{ alignItems: "center", justifyContent: "center", paddingTop: "50px" }}>

              <img src={performance} alt="performance" height={60} width={100}></img>

              {closedCalendarData?.data?.length === 0 && (
                <Typography
                  style={{
                    color: "#3E8CB5",
                    fontWeight: "400",
                    fontSize: "26px",
                    fontFamily: "Arial",
                  }}
                >
                There are no performance appraisal details available.

                </Typography>
              )}

              {/* {!noAppraisal && !showNoAppraisalContent &&  closedCalendarData?.data?.length !== 0 && ( */}
              { selectCalendarContent && closedCalendarData?.data?.length !== 0 && (
                <Typography
                  style={{
                    color: "#3E8CB5",
                    fontWeight: "400",
                    fontSize: "26px",
                    fontFamily: "Arial",
                    textAlign:"center"

                  }}
                >
                  Please select a calendar to view the previous appraisal details.

                </Typography>
              )}

              {/* {(showNoAppraisalContent || noAppraisal) && ( */}
              {(showNoAppraisalContent || noAppraisal) && (
                <Typography
                  style={{
                    color: "#3E8CB5",
                    fontWeight: "400",
                    fontSize: "26px",
                    fontFamily: "Arial",
                    textAlign:"center"
                  }}
                >
                  {/* The performance appraisal was not completed. Please select any other calendar. */}
                  The performance appraisal for the selected period is not available. Please select another calendar.
                </Typography>
              )}


              {closedCalendarData?.data?.length !== 0 && (
                <span style={{ paddingRight: "10px" }}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" gap={3}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>

                      <div>
                        <FormControl size="small" sx={{ minWidth: 140 }}>
                          <InputLabel
                            sx={{
                              "& .MuiInputLabel-root": {
                                fontSize: "14px !important",
                                fontFamily: "Arial !important",
                                color: "#333333 !important",
                              },
                            }}
                            id="demo-multiple-checkbox-label"
                          >
                            Year
                          </InputLabel>
                          <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            MenuProps={MenuProps}
                            //  defaultValue={2023}
                            input={<OutlinedInput label="Year" />}
                            sx={{
                              "& .MuiInputBase-input": {
                                fontSize: "14px",
                                textTransform: "none",
                                fontFamily: "Arial",
                                color: "#333333",
                              },
                            }}
                            value={Number(selectedYear)}
                            // value={selectedYear}
                            onChange={handleYearChange}
                          >

                            {closedCalendarData && closedCalendarData.data
                              .map((j: any) => j.pa_launch.slice(0, 4))
                              .filter((value: any, index: any, self: any) => {
                                return self.indexOf(value) === index;
                              })
                              .map((j: any) => {
                                return (
                                  <MenuItem
                                    sx={{
                                      padding: "0px",
                                      paddingLeft: "12px",
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",

                                    }}

                                    value={j}
                                  >
                                    {j}
                                  </MenuItem>

                                );
                              })}


                          </Select>
                        </FormControl>
                      </div>
                    </Stack>
                    <div>


                      <FormControl size="small" sx={{ minWidth: 140 }}>
                        <InputLabel
                          sx={{
                            "& .MuiInputLabel-root": {
                              fontSize: "14px !important",
                              fontFamily: "Arial !important",
                              color: "#333333 !important",
                            },
                          }}
                          id="demo-multiple-checkbox-label"
                        >
                          Calendar
                        </InputLabel>


                        <Select
                          labelId="demo-select-small"
                          id="demo-select-small"
                          MenuProps={MenuProps}
                          input={<OutlinedInput label="Calendar" />}
                          sx={{
                            "& .MuiInputBase-input": {
                              fontSize: "14px",
                              textTransform: "none",
                              fontFamily: "Arial",
                              color: "#333333",
                            },
                          }}

                          value={String(selectedCalendar)}
                          onChange={handleCalendarTypeChange}
                        >

                          {closedCalendarData?.data?.map((j: any) => {
                            return (
                              <MenuItem
                                sx={{
                                  padding: "0px",
                                  paddingLeft: "12px",
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",

                                }}
                                value={j?._id}
                              >
                                {j?.calendar_type}
                              </MenuItem>

                            );

                          })}
                        </Select>


                      </FormControl>

                    </div>

                    {/* <Link to={`${EMPLOYEE_PREVIOUS_PAs}/employee/${employee_id}`}
                      state={{
                        employeeCodeFromLanding: employeeData?.data?.employee_code,
                        calendarTypeFrom: selectedCalendar,
                        yearFrom: selectedYear
                      }}> */}
                      <Button
                        variant="outlined"
                        size="small"
                        style={{
                          textTransform: "none",
                          fontSize: "15px",
                          fontFamily: "Arial",
                          borderColor: "#3E8CB5",
                          color: "#3E8CB5",
                        }}
                        onClick={() => {
                          viewPreviousAppraisal()
                        }}
                      >
                        <label style={{
                          cursor: "pointer",
                        }}> View </label>
                      </Button>
                    {/* </Link> */}

                  </Stack>

                </span>
              )}



            </Stack>
            <Stack direction="row" alignItems="center" justifyContent= "center" marginTop="20px" >
            <div
            // style={{ justifyContent: "center", alignItems: "center" }}
            >
            <Button
                      style={{
                        borderRadius: "4px",
                        textTransform: "none",
                        fontSize: "15px",
                        fontFamily: "Arial",
                        borderColor: "#3E8CB5",
                        color: "#3E8CB5",
                        background: "transparent",
                        height: "35px",
                        width: "70px",
                      }}
                      variant="outlined"
                      onClick={() => {
                        navigate(-1);
                       }}
                    >
                      Back
                    </Button>
                    </div>
                    </Stack>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
