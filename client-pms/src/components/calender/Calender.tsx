// import * as React from "react";
// import Stack from "@mui/material/Stack";
// import { Container, TextField } from "@mui/material";
// import { Button } from "@mui/material";
// import { Grid } from "@mui/material";
// import Box from "@mui/material/Box";
// <<<<<<< appraiser-styling
// import { textAlign } from "@mui/system";
// =======
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker';
// import { textAlign } from '@mui/system';
// >>>>>>> main
// import Typography from "@mui/material/Typography";

// export default function Calendar() {
// <<<<<<< appraiser-styling
//   return (
//     <Container
//       sx={{
//         width: "100%",
//         height: 600,
//         background: "#fff",
//         // boxShadow: "2px 4px 6px 4px rgba(0, 0, 0, 0.2)",
//       }}
//     >
//       <Grid item xs={12}>
//         <Stack spacing={3}>
//           <Box
// =======
//     const [value, setValue] = React.useState<Date | null>(null);
//     return (
//         <Container
// >>>>>>> main
//             sx={{
//               backgroundColor: "#FDF9F2",
//               height: 50,
//               textAlign: "center",
//               color: "#5C5B59",
//               marginTop: "30px",
//               fontFamily: "sans-serif",
//               fontSize: "14px",
//             }}
// <<<<<<< appraiser-styling
//           >
//             {/*<p>
//               Lorem Ipsum is simply dummy text of the printing and typesetting
//               industry
//             </p>*/}
//           </Box>
//           <Stack
//             direction="row"
//             justifyContent="space-between"
//             alignItems="center"
//             spacing={2}
//           >
//             <p> </p>

//             <h2
//               style={{
//                 textAlign: "center",
//                 color: "#014D76",
//                 fontFamily: "sans-serif",
//                 fontSize: "16px",
//                 fontWeight: "540",
//               }}
//             >
//               Add Calendar
//             </h2>
//             <Button
//               style={{
//                 textTransform: "none",
//                 color: "#014D76",
//                 borderColor: "#014D76",
//                 borderRadius: 8,
//                 padding: "6px 12px",
//                 fontFamily: "sans-serif",
//               }}
//               variant="outlined"
//             >
//               View List
//             </Button>
//           </Stack>

//           <p style={{ textAlign: "center" }}>
//             <TextField
//               id="outlined-basic"
//               label="Appraisal Calendar"
//               value="Mid Year"
//               variant="outlined"
//               style={{ width: 575, height: 50 }}
//             />
//           </p>
//           <Stack
//             direction="row"
//             justifyContent="center"
//             alignItems="center"
//             spacing={2}
//           >
//             <p>
//               <TextField
//                 id="outlined-basic"
//                 label="Month"
//                 value="March"
//                 variant="outlined"
//                 style={{ width: 280 }}
//               />
//             </p>
//             <p>
//               <TextField
//                 id="outlined-basic"
//                 label="Year"
//                 value="2021"
//                 variant="outlined"
//                 style={{ width: 280 }}
//               />
//             </p>
//           </Stack>

//           <Stack direction="row" justifyContent="space-around" spacing={-120}>
//             <Button
//               style={{
//                 textTransform: "none",
//                 backgroundColor: "#014D76",
//                 fontSize: "16px",
//                 fontFamily: "sans-serif",
//                 padding: "4px 19px",
//               }}
//               variant="contained"
//             >
//               Save
//             </Button>
//             <Button
//               style={{
//                 textTransform: "none",
//                 fontSize: "14px",
//                 borderRadius: 8,
//                 borderColor: "#014D76",
//                 color: "#014D76",
//                 fontFamily: "sans-serif",
//                 padding: "5px 13px",
//               }}
//               variant="outlined"
//             >
//               Cancel
//             </Button>
//           </Stack>
//         </Stack>
//       </Grid>
//     </Container>
//   );
// }
// =======
//         >

//             <Grid item xs={12}>

//                 <Stack spacing={3} >
//                     <Box sx={{
//                         backgroundColor: "#ffe9ec",
//                         height: 50,
//                         textAlign: "center",
//                         color: "GrayText",

//                     }}>
//                         <p >Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
//                     </Box>
//                     <Stack
//                         direction="row"
//                         justifyContent="space-between"
//                         alignItems="center"
//                         spacing={2}>
//                         <p> </p>

//                         <h2 style={{ color: "#185f9e", fontFamily: "adobe-clean, sans-serif", fontSize: "16px", fontWeight: "550", marginRight: "-160px" }}>
//                             Add Calender
//                         </h2>

//                         <div >
//                             {/* <Link to={`${OTHER_RECOMMENDATION_VIEW_PAGE}`}> */}
//                             <Button variant="outlined">
//                                 View List
//                             </Button>
//                             {/* </Link> */}
//                         </div>
//                     </Stack>
//                     <Stack
//                         direction="row"
//                         justifyContent="center"
//                         alignItems="center"
//                         spacing={2}>
//                         <LocalizationProvider dateAdapter={AdapterDateFns}>
//                             <DatePicker
//                                 label="Start Date"
//                                 value={value}
//                                 onChange={(newValue:any) => {
//                                     setValue(newValue);
//                                 }}
//                                 renderInput={(params:any) => <TextField {...params} />}
//                             />
//                         </LocalizationProvider>
//                         <LocalizationProvider dateAdapter={AdapterDateFns}>
//                             <DatePicker
//                                 label="End Date"
//                                 value={value}
//                                 onChange={(newValue:any) => {
//                                     setValue(newValue);
//                                 }}
//                                 renderInput={(params:any) => <TextField {...params} />}
//                             />
//                         </LocalizationProvider>
//                     </Stack>

//                     <Stack
//                         alignItems="center"
//                         direction="row"
//                         justifyContent="center"
//                         spacing={2}
//                     >
//                         <Button
//                             style={{ textTransform: "none" }}
//                             variant="contained"
//                         // onClick={() => onSubmit(title, description)}
//                         >
//                             Save
//                         </Button>
//                         <Button style={{ textTransform: "none" }} variant="outlined">
//                             Cancel
//                         </Button>
//                     </Stack>

//                 </Stack >

//             </Grid>

//         </Container>
//     );
// }
// >>>>>>> main

import * as React from "react";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { Container, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { textAlign } from "@mui/system";
import Typography from "@mui/material/Typography";
import { MASTER_NAV, CALENDER_VIEWPAGE } from "../../constants/routes/Routing";
import { Link } from "react-router-dom";
import PAMaster from "../../components/UI/PAMaster";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/system";
import Downarrowicon from "../../assets/Images/Downarrowicon.svg";
import Deleteredicon from "../../assets/Images/Deleteredicon.svg";
import Tooltip from "@mui/material/Tooltip";
import { Scrollbar } from "react-scrollbars-custom";

const Text = styled("div")({
  "& .MuiOutlinedInput-root": {
    height: "30px",
  },
});

const Calendar = (props: any) => {

  

  const { onSubmit, defaultValue } = props;
  const [name, setName] = React.useState("");
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [startDateAppraiser, setStartDateAppraiser] =
    React.useState<Date | null>(null);
  const [startDateReviewer, setStartDateReviewer] = React.useState<Date | null>(
    null
  );
  const [startDateNormalizer, setStartDateNormalizer] =
    React.useState<Date | null>(null);
  const [startDateF2FMeeting, setStartDateF2FMeeting] =
    React.useState<Date | null>(null);
  const [
    startDateEmployeeAcknowledgement,
    setStartDateEmployeeAcknowledgement,
  ] = React.useState<Date | null>(null);

  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const [endDateAppraiser, setEndDateAppraiser] = React.useState<Date | null>(
    null
  );
  const [endDateReviewer, setEndDateReviewer] = React.useState<Date | null>(
    null
  );
  const [endDateNormalizer, setEndDateNormalizer] = React.useState<Date | null>(
    null
  );
  const [endDateF2FMeeting, setEndDateF2FMeeting] = React.useState<Date | null>(
    null
  );
  const [endDateEmployeeAcknowledgement, setEndDateEmployeeAcknowledgement] =
    React.useState<Date | null>(null);

  function createData(
    name: any,
    number: any,
    description: any,
    startdate: any,
    enddate: any
  ) {
    return { name, number, description, startdate, enddate };
  }

  const rows =[
    createData(
      <input
        name="Appraiser"
        type="checkbox"
        style={{ height: "18px", width: "18px" }}
      />,
      "1",
      "Appraiser",
      <Text>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            value={startDateAppraiser}
            inputFormat="dd/mm/yyyy"
            views={["day", "month", "year"]}
            onChange={(newValue: any) => {
              setStartDateAppraiser(newValue);
            }}
            renderInput={(params: any) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Text>,
      <Text>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            value={endDateAppraiser}
            inputFormat="dd/mm/yyyy"
            views={["day", "month", "year"]}
            onChange={(newValue: any) => {
              setEndDateAppraiser(newValue);
            }}
            renderInput={(params: any) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Text>
    ),
    createData(
      <input
        name="Reviewer"
        type="checkbox"
        style={{ height: "18px", width: "18px" }}
      />,
      "2",
      "Reviewer",
      <Text>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            value={startDateReviewer}
            inputFormat="dd/mm/yyyy"
            views={["day", "month", "year"]}
            onChange={(newValue: any) => {
              setStartDateReviewer(newValue);
            }}
            renderInput={(params: any) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Text>,

      <Text>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            value={endDateReviewer}
            inputFormat="dd/mm/yyyy"
            views={["day", "month", "year"]}
            onChange={(newValue: any) => {
              setEndDateReviewer(newValue);
            }}
            renderInput={(params: any) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Text>
    ),

    createData(
      <input
        name="Normalizer"
        type="checkbox"
        style={{ height: "18px", width: "18px" }}
      />,
      "3",
      "Normalizer",
      <Text>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            value={startDateNormalizer}
            inputFormat="dd/mm/yyyy"
            views={["day", "month", "year"]}
            onChange={(newValue: any) => {
              setStartDateNormalizer(newValue);
            }}
            renderInput={(params: any) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Text>,

      <Text>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            value={endDateNormalizer}
            inputFormat="dd/mm/yyyy"
            views={["day", "month", "year"]}
            onChange={(newValue: any) => {
              setEndDateNormalizer(newValue);
            }}
            renderInput={(params: any) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Text>
    ),
    createData(
      <input
        name="F2FMeeting"
        type="checkbox"
        style={{ height: "18px", width: "18px" }}
      />,
      "4",
      "F2F Meeting",
      <Text>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            value={startDateF2FMeeting}
            inputFormat="dd/mm/yyyy"
            views={["day", "month", "year"]}
            onChange={(newValue: any) => {
              setStartDateF2FMeeting(newValue);
            }}
            renderInput={(params: any) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Text>,

      <Text>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            value={endDateF2FMeeting}
            inputFormat="dd/mm/yyyy"
            views={["day", "month", "year"]}
            onChange={(newValue: any) => {
              setEndDateF2FMeeting(newValue);
            }}
            renderInput={(params: any) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Text>
    ),
    createData(
      <input
        name="EmployeeAcknowledgement"
        type="checkbox"
        style={{ height: "18px", width: "18px" }}
      />,
      "5",
      "Employee Acknowledgement",
      <Text>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            value={startDateEmployeeAcknowledgement}
            inputFormat="dd/mm/yyyy"
            views={["day", "month", "year"]}
            onChange={(newValue: any) => {
              setStartDateEmployeeAcknowledgement(newValue);
            }}
            renderInput={(params: any) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Text>,

      <Text>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            value={endDateEmployeeAcknowledgement}
            inputFormat="dd/mm/yyyy"
            views={["day", "month", "year"]}
            onChange={(newValue: any) => {
              setEndDateEmployeeAcknowledgement(newValue);
            }}
            renderInput={(params: any) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Text>
    ),
  ];

  useEffect(() => {
    if (defaultValue) {
      setName(defaultValue.data.name);
      setStartDate(defaultValue.data.start_date);
      setEndDate(defaultValue.data.end_date);
      console.log(defaultValue, "hihi");
    }
  }, [defaultValue]);

  return (
    <>
      <PAMaster name={"Calendar"} />
      <Container
        sx={{
          maxWidth: "96% !important",
          width: "100%",
          height: "calc(100vh - 165px)",
          background: "#fff",
        }}
      >
        <Grid item xs={12}>
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
              paddingTop="50px"
            >
              <p> </p>

              {/* <h2
                style={{
                  color: "#004C75",

                  fontSize: "18px",
                  fontWeight: "500",
                  marginLeft: "112px",
                }}
              >
                Add Calendar
              </h2> */}

              <div>
                <Link to={`${CALENDER_VIEWPAGE}`}>
                  <Button
                  
                    style={{
                      textTransform: "none",
                      color: "#014D76",
                      borderColor: "#014D76",
                      borderRadius: 8,
                      padding: "6px 12px",
                      fontFamily: "sans-serif",
                    }}
                    variant="outlined"
                  >
                    View List
                  </Button>
                </Link>
              </div>
            </Stack>

            <div>
              <Accordion
                sx={{
                  width: "90%",
                  position: "relative",
                  boxShadow: "1px 1px 5px 1px rgba(0, 0, 0, 0.1)",
                  borderRadius: "10px",
                }}
               
              >
                <AccordionSummary
                 // expandIcon={<img src={Downarrowicon} alt="" />}
                 expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  style={{
                    background: "#F7F9FA",
                    boxShadow: "1px 1px 10px 1px rgba(0, 0, 0, 0.1)",
                    borderRadius: "10px",
                    maxHeight: "0px",
                    minHeight: "85px",
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={8}
                  >
                    {" "}
                    <Typography>
                      <p style={{ fontSize: "20px", marginLeft: "40px" }}>1</p>
                    </Typography>
                    <p style={{ textAlign: "center" }}>
                      <TextField
                        id="outlined-basic"
                        label="Appraisal Calendar"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant="outlined"
                        style={{ width: 240 }}
                      />
                    </p>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Start Date"
                        value={startDate}
                        inputFormat="dd/mm/yyyy"
                        views={["day", "month", "year"]}
                        onChange={(newValue: any) => {
                          setStartDate(newValue);
                        }}
                        renderInput={(params: any) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="End Date"
                        value={endDate}
                        inputFormat="dd/mm/yyyy"
                        views={["day", "month", "year"]}
                        onChange={(newValue: any) => {
                          setEndDate(newValue);
                        }}
                        renderInput={(params: any) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Stack>
                </AccordionSummary>

                <AccordionDetails>
                  <Scrollbar
                    style={{ width: "auto", height: "calc(100vh - 560px)" }}
                  >
                    <TableContainer>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <input
                                name="allSelect"
                                type="checkbox"
                                style={{ height: "18px", width: "18px" }}
                              />
                            </TableCell>
                            <TableCell
                              sx={{ color: "#004C75", fontSize: "14px" }}
                              align="left"
                            >
                              #
                            </TableCell>
                            <TableCell
                              sx={{ color: "#004C75", fontSize: "14px" }}
                              align="left"
                            >
                              Calendar Name
                            </TableCell>
                            <TableCell
                              sx={{ color: "#004C75", fontSize: "14px" }}
                              align="left"
                            >
                              Start Date
                            </TableCell>
                            <TableCell
                              sx={{ color: "#004C75", fontSize: "14px" }}
                              align="left"
                            >
                              End Date
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell width="1%" component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell width="4%" align="left">
                                {row.number}
                              </TableCell>
                              <TableCell width="28%" align="left">
                                {row.description}
                              </TableCell>
                              <TableCell width="30%" align="left">
                                {row.startdate}
                              </TableCell>
                              <TableCell align="left">{row.enddate}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Scrollbar>
                </AccordionDetails>
              </Accordion>
            </div>
            <div>
              <Tooltip title="Remove">
                <IconButton
                  style={{
                    position: "absolute",
                    transform: "translate(-50%, -50%)",
                    top: "285px",
                    left: "91%",
                  }}
                >
                  <img src={Deleteredicon} alt="" />
                </IconButton>
              </Tooltip>
            </div>

            <Stack
              alignItems="center"
              direction="row"
              justifyContent="center"
              spacing={2}
            >
              <Link to={`${CALENDER_VIEWPAGE}`}>
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
                  onClick={() =>
                    onSubmit(
                      name,
                      startDate,
                      endDate,
                      startDateAppraiser,
                      endDateAppraiser,
                      startDateReviewer,
                      endDateReviewer,
                      startDateNormalizer,
                      endDateNormalizer,
                      startDateF2FMeeting,
                      endDateF2FMeeting,
                      startDateEmployeeAcknowledgement,
                      endDateEmployeeAcknowledgement
                    )
                  }
                >
                  Save
                </Button>
              </Link>
              <Link to={MASTER_NAV}>
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
                >
                  Cancel
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Grid>
      </Container>
    </>
  );
};

export default Calendar;
