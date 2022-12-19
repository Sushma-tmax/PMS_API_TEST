/* eslint-disable */
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import { Agent } from "http";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import { maxWidth } from "@mui/system";
import { CREATE_CALENDER } from "../../constants/routes/Routing";
import { Alert, formLabelClasses } from "@mui/material";
import dayjs from "dayjs";
import PAMaster from "../../components/UI/PAMaster";
import { styled } from "@mui/material/styles";

const ButtonMap = styled("div")({
  "&.Mui-disabled": {
    backgroundColor: "red",
  },
});

const AppraisalCalender = (props: any) => {
  const {
    calendarDataa,
    tab,
    setTabs,
    createAppraisalCalenderHandler,
    addCaleander,
    singleTemplateData,
    isSuccessCalendar,
    calendarError,
  } = props;

  const [year, setYear] = React.useState("");
  console.log(year);
  const [yearNumber, setYearNumber] = React.useState("");
  const [textfeildError, settextfeildError] = useState(false);
  const [save1, setSave1] = useState(isSuccessCalendar);
  const [hideAlert, setHideAlert] = useState(false);
  const [hideAlert1, setHideAlert1] = useState(false);
  const [createMap, setCreateMap] = useState(false);
  const [showCreateCalendar, setShowCreateCalendar] = useState(false);
  const [showCalendarError, setShowCalendarError] = useState<any>(calendarError)

  console.log(calendarError, "'calendarError");

  const hideAlertHandler = () => {
    setTimeout(() => {
      setHideAlert(false);
    }, 3000);
  };
  const hideAlertHandler1 = () => {
    setTimeout(() => {
      setHideAlert1(false);
    }, 3000);
  };

  const errorHandler = () => {
    setSave1(false);

    if (year === undefined) {
      settextfeildError(true);
      setSave1(false);
    } else if (year == "") {
      settextfeildError(true);
      setSave1(false);
    } else if (year != "") {
      settextfeildError(false);
      setSave1(true);
      setHideAlert(true);
      hideAlertHandler();
      setCreateMap(true);
    } else {
      setSave1(false);
    }
  };

  useEffect(() => {
    if (showCalendarError) {
      setHideAlert1(true)
      hideAlertHandler1()

    }
  }, [showCalendarError])


  useEffect(() => {
    if (calendarError) {
      setShowCalendarError(true)
    } else if (calendarError === undefined) {
      setShowCalendarError(false)
    }
  }, [calendarError])


  console.log(calendarError, 'ccccccccc')

  // If calendr is not presnt then don't creatre appraisal calnder
  //

  useEffect(() => {
    console.log(singleTemplateData, "singleTemplateData={singleTemplateData}");
    if (singleTemplateData) {
      setYear(singleTemplateData.template.calendar);
      //hiding the create calendar button if it is edit Template
      if (singleTemplateData.template.calendar == undefined || singleTemplateData.template.calendar == null) {
        setShowCreateCalendar(true);
      }
    }
  }, [singleTemplateData]);

  return (
    <>
      {textfeildError && (
        <Alert severity="error">Please select Calendar</Alert>
      )}
      {hideAlert1 && showCalendarError && (
        <Alert severity="error">Appraisal Calendar Already Exist ! </Alert>
      )}

      {hideAlert && save1 && <Alert severity="info">Your changes were Saved as Draft successfully</Alert>}

      <Container sx={{ width: "800px" }}>
        <div style={{ paddingLeft: "130px", fontFamily: "regular" }}>
          {/* <Box sx={{ display: "flex ", marginLeft: "144px" }}> */}
          {/* <TextField id="outlined-basic" variant="outlined" sx={{ width: "300px" }}
                               value={yearNumber} label="2022" onChange={(e) => setYearNumber(e.target.value)} />*/}

          {/* <FormControl > */}
          <p style={{ paddingLeft: "150px" }}>Select calendar year</p>
          <p style={{ paddingLeft: "50px" }}>
            <TextField
              select
              sx={{ width: "64%" }}
              label="Select text"
              id="demo-simple-select-label"
              variant="outlined"
              size="small"
              value={year}

              onChange={(e: { target: { value: any } }) => {
                setYear(e.target.value);
                setShowCalendarError(false)
              }}
              error={!year && textfeildError}
              helperText={!year && textfeildError ? "*Name required." : " "}
            >
              {calendarDataa &&
                calendarDataa.data.map((i: any) => {
                  return (
                    <MenuItem sx={{ height: "16px" }} value={i._id}>
                      <div>{i.name}</div>
                    </MenuItem>
                  );
                })}
            </TextField>
          </p>
        </div>

        <div>
          <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <Stack
              spacing={2}
              paddingRight="24px"
              paddingTop="10px"
              direction="row"
            >
              <Button
                style={{
                  borderRadius: "4px",
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "sans-serif",
                  padding: "2px 9px",
    
                  borderColor: "#004C75",
                  color: "#004C75",
                }}
                variant="outlined"
                onClick={() => {
                  errorHandler();
                  addCaleander({
                    calendar: year,
                  });
                }}
              // onClick={() => setTabs(tab + 1)}
              >
                Save as Draft
              </Button>
              {/* {calendarError === false && (<Link to={CREATE_CALENDER}> */}
              {/* {showCreateCalendar && */}
              <Button

                onClick={() => {
                  createAppraisalCalenderHandler(year);
                  addCaleander({
                    calendar: year,
                  });

                }}
                style={{
                  textTransform: "none",
                  backgroundColor: "#004C75",
                  fontSize: "16px",
                  fontFamily: "regular",
                  padding: "6px 30px",
                }}
                variant="contained"
              >
                Create Calendar
              </Button>
              {/* } */}
              {/* </Link>)} */}
            </Stack>
          </Box>
        </div>
      </Container>
    </>
  );
};

export default AppraisalCalender;
