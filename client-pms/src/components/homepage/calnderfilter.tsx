import React from "react";
import { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import Statusbar from "../reviewer/Dashboard/performanceratingchart/statusbar";
import OverallStatus from "../reviewer/Dashboard/performanceratingchart/overallstatus";
import { InputLabel, Stack, styled } from "@mui/material";
import { useGetEmployeeQuery,useGetEmployeeByFilterQuery } from "../../service";
import { useLoggedInUser } from "../../hooks/useLoggedInUser";
import StatusBar from "./StatusBar";

const Dropdown = styled("div")({
  fontSize: "14px",
  fontColor: "#333333",
  fontFamily: "Arial",
});
const Timeline = styled("div")({
  fontSize: "20px",
  color: "#333333",
  padding: "20px",
  // marginLeft: "20px",
  // paddingTop: "15px",

  fontFamily: "Arial",
});
const ITEM_HEIGHT = 28;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      maxWidth: 145,
      fontSize: "14px !important",
      fontFamily: "Arial",
      color: "#333333",
    },
  },
};

function CalendarFilters(props: any) {
  const {SectionFilter, setSectionFilter} = props;
  // const [SectionFilter, setSectionFilter] = React.useState("");
   console.log(SectionFilter, "SectionFilter");
  const handleChangeSection = (event: SelectChangeEvent) => {
    setSectionFilter(event.target.value);
  };
  //multiselect
  // const handleChangeSection = (event: SelectChangeEvent<typeof SectionFilter>) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setSectionFilter(
  //     // On autofill we get a stringified value.
  //     typeof value === 'string' ? value.split(',') : value,
  //   );
  // };
 //multiselect
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
        justifyContent="space-between"
        // height="50px"
        // paddingBottom="30px"
        alignItems="center"
      >
        <Timeline>Timeline</Timeline>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
          paddingRight="15px"
        >
          <div>
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                MenuProps={MenuProps}
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "14px",
                    textTransform: "none",
                    fontFamily: "Arial",
                    color: "#333333",
                    maxHeight: "0px",
                    minHeight: "28px",
                     padding: "6px 12px",
                  },
                  "& .MuiOutlinedInput-root": {
                    maxHeight: "0px",
                    minHeight: "28px",
                  },
                  // '& .MuiOutlinedInput-root': {
                  //   // '& fieldset': {
                  //   //   borderColor: 'none',
                  //   // },
                  //   "& > fieldset": {

                  //   },
                  //   '&:hover fieldset': {
                  //     borderColor: '#cfcfcf',
                  //   },
                  //   '&.Mui-focused fieldset': {
                  //     borderColor: 'cfcfcf',
                  //   },
                  // },
                }}
                defaultValue={10}
              >
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={10}
                >
                  Calendar
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={20}
                >
                  Mid-Year
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={30}
                >
                  2021
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                MenuProps={MenuProps}
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "14px",
                    textTransform: "none",
                    fontFamily: "Arial",
                    color: "#333333",
                    maxHeight: "0px",
                    minHeight: "28px",
                     padding: "6px 12px",
                  },
                  "& .MuiOutlinedInput-root": {
                    maxHeight: "0px",
                    minHeight: "28px",
                  },
                }}
                defaultValue={10}
              >
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={10}
                >
                  Year
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={20}
                >
                  Section
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={30}
                >
                  2021
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel id="demo-simple-select-helper-label">Section</InputLabel>
              <Select
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "14px",
                    textTransform: "none",
                    fontFamily: "Arial",
                    color: "#333333",
                    maxHeight: "0px",
                    minHeight: "28px",
                    padding: "6px 12px",
                  },
                  "& .MuiOutlinedInput-root": {
                    maxHeight: "0px",
                    minHeight: "28px",
                  },
                }}
                MenuProps={MenuProps}
                //defaultValue="Section"
                //multiple
                value={SectionFilter}
                onChange={handleChangeSection}
              >
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value="None"
                >
                  None
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value="Ops UAE - Warehouse"
                >
                  Ops UAE - Warehouse
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value="Ops UAE - Service Centre"
                >
                  Ops UAE - Service Centre
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value="Eng - Application and Design"
                >
                  Eng - Application and Design
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value="Eng Ex-Com"
                >
                  Eng Ex-Com
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value="Ops OS - ExCom"
                >
                  Ops OS - ExCom
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl
              size="small"
              sx={{
                minWidth: 140,
              }}
            >
              <Select
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "14px",
                    textTransform: "none",
                    fontFamily: "Arial",
                    color: "#333333",
                    maxHeight: "0px",
                    minHeight: "28px",
                     padding: "6px 12px",
                  },
                  "& .MuiOutlinedInput-root": {
                    maxHeight: "0px",
                    minHeight: "28px",
                  },
                }}
                MenuProps={MenuProps}
                defaultValue={10}
                // value={SectionFilter}
                // onChange={handleChangeSection}
              >
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={10}
                >
                  Sub-section
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={20}
                >
                  Installation
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={30}
                >
                  Service
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={40}
                >
                  SME's
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={50}
                >
                  CAC
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={60}
                >
                  IT
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={70}
                >
                  Projects
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl
              size="small"
              sx={{
                minWidth: 140,
              }}
            >
              <Select
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "14px",
                    textTransform: "none",
                    fontFamily: "Arial",
                    color: "#333333",
                    maxHeight: "0px",
                    minHeight: "28px",
                     padding: "6px 12px",
                  },
                  "& .MuiOutlinedInput-root": {
                    maxHeight: "0px",
                    minHeight: "28px",
                  },
                }}
                MenuProps={MenuProps}
                defaultValue={10}
              >
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={10}
                >
                  Division
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={20}
                >
                  Corporate Support
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={30}
                >
                  Engineering
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={40}
                >
                  Finance
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={50}
                >
                  Operations OS
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={60}
                >
                  Operations Finance
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={70}
                >
                  Sales
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </Stack>
        {/* <span
          style={{
            color: "#3e8cb5",
            padding:"8px",
            height:"18px",
            border:"1px solid#3e8cb5",
            fontSize:"14px",
            fontFamily:"Arial",
            borderRadius:"8px"
          }}
        >{`${dayjs().format("DD-MMM-YYYY")}`}</span> */}
      </Stack> 
            

       
         
        </Box>
      </div>
    </>
  );
}

export default CalendarFilters;
