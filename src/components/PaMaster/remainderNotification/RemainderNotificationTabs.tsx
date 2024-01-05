import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { Container, Switch, TableHead, TextField } from "@mui/material";
import { Button, styled } from "@mui/material";
import { Grid } from "@mui/material";
import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { makeStyles } from "@mui/styles";
import { Scrollbar } from "react-scrollbars-custom";
const useStyles = makeStyles({
  box: {
    
    // width: "350px",
    ["@media (max-width:768px)"]: {
      minHeight: "100px",
      overflow: "hidden",
      height: "200px !important",
      // width: "350px",
    },
  },
});
const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
});
export default function RemainderNotificationTabs(props: any) {
  const { tabValue, handleChange,reminderActiveStatus,handleReminderActiveStatus,activecalendardata } = props;
  const classes = useStyles();

  return (
    <>
     
        <Box
        sx={{
          bgcolor:"#fbfbfb",
          borderRadius:"10px",
          paddingTop:"5px",
           height: "370px",
        }}
          className={classes.box}
          
        >
            <div 
            style={{ 
              display: "flex", 
            alignItems: "center",
            justifyContent: "space-between",
            padding:"10px 15px" }}>
            <Typography
              style={{
                color: "#3E8CB5",
                fontSize: "16px",
                fontFamily: "Arial",
               
              }}
            >
              Reminder
            </Typography>

            <Switch
              size="small"
              checked={reminderActiveStatus}
              onChange={handleReminderActiveStatus}
              disabled={!(activecalendardata?.data?.length > 0)}
            />
          </div>
          {/* <Scroll>
            <Scrollbar style={{ height: "calc(100vh - 410px)" }}> */}
              <Tabs
                orientation="vertical"
                value={tabValue}
                onChange={handleChange}
                variant="scrollable"
                aria-label="Vertical tabs example"
                style={{ color: "#676666" }}
                sx={{ borderColor: "divider", textTransform: "capitalize" }}
                TabIndicatorProps={{
                  style: {
                    left: 0,
                    borderColor: "divider",
                    alignItems: "start",
                  },
                }}
              >
                <Tab
                  sx={{
                    fontSize: "15px",
                    color: "#333333",
                    fontFamily: "Arial",
                    textTransform: "capitalize",
                    alignItems: "start",
                    // paddingLeft: "5px",
                  }}
                  label="Appraiser"
                />

                <Tab
                  sx={{
                    fontSize: "15px",
                    color: "#333333",
                    fontFamily: "Arial",
                    textTransform: "capitalize",
                    alignItems: "start",
                    // paddingLeft: "5px",
                  }}
                  label="Reviewer"
                />

                <Tab
                  sx={{
                    fontSize: "15px",
                    color: "#333333",
                    fontFamily: "Arial",
                    textTransform: "capitalize",
                    alignItems: "start",
                    whiteSpace: "nowrap",
                      // paddingLeft: "5px",
                  }}
                  label="Employee"
                />

                {/* <Tab
                  sx={{
                    fontSize: "15px",
                    color: "#333333",
                    fontFamily: "Arial",
                    textTransform: "capitalize",
                    alignItems: "start",
                    whiteSpace: "nowrap",
                    paddingLeft: "5px",
                  }}
                  label="F2F Meeting & Employee Acceptance"
                />

                <Tab
                  sx={{
                    fontSize: "15px",
                    color: "#333333",
                    fontFamily: "Arial",
                    textTransform: "capitalize",
                    alignItems: "start",
                    whiteSpace: "nowrap",
                    paddingLeft: "5px",
                  }}
                  label="Mediation & Renormalization "
                /> */}
              </Tabs>
            {/* </Scrollbar>
          </Scroll> */}
        </Box>
    </>
  );
}
