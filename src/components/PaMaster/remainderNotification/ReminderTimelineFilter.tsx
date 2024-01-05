import React, { useEffect } from "react";
import { useState, useRef, useMemo } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { InputLabel, Stack, styled } from "@mui/material";
import {
  useGetCalenderQuery,
  useGetEmployeeByFilterQuery,
} from "../../../service";
import { useGetAppraisalCalenderQuery } from "../../../service/appraisalCalender/AppraisalCalender";
import { useLoggedInUser } from "../../../hooks/useLoggedInUser";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@mui/styles";
import { ListItemIcon } from "@mui/material";
import {
  useGetPACalendarQuery,
  useGetActiveCalenderQuery,
} from "../../../service/calender/Calender";

const useStyles = makeStyles((theme: any) => ({
  formControl: {
    // margin: theme?.spacing(1),
    width: 140,

    fontSize: "14px",
    color: "#333333",
    fontFamily: "Arial",
  },
  indeterminateColor: {
    color: "#f50057",
  },
  selectAllText: {
    fontWeight: 500,
    fontSize: "13px !important",
    fontFamily: "Arial",
    color: "#333333",

    // ['@media (max-width:768px)']: {
    //   color:"red !important",
    // }
  },
  selectedAll: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
    },
    fontSize: "12px !important",
    color: "#333333",
    fontFamily: "Arial",
  },
}));

const Timeline = styled("div")({
  fontSize: "20px",
  color: "#333333",
  // padding: "20px",
  // marginLeft: "20px",
  // paddingTop: "15px",

  fontFamily: "Arial",
});
const LinkStyling = styled("div")({
  fontSize: "12px",
  paddingTop: "25px",
  color: "#3e8cb5",
  padding: "20px",
  fontFamily: "Arial",
});

function ReminderTimelineFilter(props: any) {
  const { calendarName, setCalendarName, handleChangeCalendarName, calNames } =
    props;

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
  // const { data: calanderData, isLoading } = useGetCalenderQuery("");
  // const [calNames, setCalNames] = useState<any>([]);
  // console.log(calanderData, "calanderData");
  // console.log(calNames, "calNames");
  // useEffect(() => {
  //   const calData = calanderData?.data?.filter((i: any) => {
  //     return i?.status !== "completed";
  //   });
  //   setCalNames(calData);
  // }, [calanderData]);

  // loading calendar query
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <div>
        <div
        style={{marginBottom:"20px",marginTop:"5px"}}
        // direction="row"
        // justifyContent="space-between"
        // // height="50px"
        // // paddingBottom="30px"
        // alignItems="center"
        >
          {/* <Timeline>Timeline - {calendarName} </Timeline> */}
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Calendar Name</InputLabel>
            <Select
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "14px",
                  textTransform: "none",
                  fontFamily: "Arial",
                  color: "#333333",
                },
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={calendarName}
              label="calendar Name"
              onChange={handleChangeCalendarName}
              MenuProps={MenuProps}
            >
              {calNames.map((calName: any, index: any) => (
                <MenuItem
                  sx={{
                    height: "30px",
                    fontSize: "14px",
                    fontFamily: "Arial",
                    color: "#333333",
                  }}
                  key={index}
                  value={calName.name}
                >
                  {calName.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </>
  );
}

export default ReminderTimelineFilter;
