import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Timeline1 from "../normalizerMain/Timeline";
import PerformanceRatingreview from "../normalizerMain/performanceratingchart/performanceratingreview";
import Teamreview from "../normalizerMain/teamtablereview/teamreview";
import Timelinereview from '../reviewer/Dashboard/Timelinerevview'
import Curveandgrid from "../normalizerMain/charts/curveandgrid";
import Statusdivision from "../normalizerMain/Statusdivision";
import NormalizerDashboardContext from "./NormalizerDashboardContext";
import { useState, createContext, useContext, useEffect } from "react";
import { useGetCalenderQuery } from "../../service";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Ninebox from "../normalizerMain/teamtablereview/ninebox";
import { Link, useLocation, useParams } from "react-router-dom";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function NormalizerMain() {
  
  const location: any = useLocation();
  const tabLocation = location?.state?.from 
  console.log(tabLocation,'tabLocation')
  const [value, setValue] = React.useState<any>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    if(tabLocation !== undefined){
     setValue(1);
    }
    }, [tabLocation])
  const [statusSort, setstatusSort] = useState<any>('')
  return (
    <>
      <Box style={{ background: "#F1F1F1", height: "auto" }}>
      <Box>
          <div
            style={{
              paddingLeft: "25px",
              paddingBottom: "12px",
              paddingTop: "12px",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                marginRight: "30px",
              }}
            >
              <Tab
               sx={{
                "&.Mui-selected": {
                  color: "#3e8cb5",
                },
                  textTransform: "capitalize",
                  fontSize: "20px",
                  fontFamily: "Arial",
                  // fontWeight: "600",
                  // paddingTop: "0px",
                  // paddingBottom: "0px",
                }}
                label=" My Team Dashboard"
                {...a11yProps(0)}
              />
              <Tab
               sx={{
                "&.Mui-selected": {
                  color: "#3e8cb5",
                },
                  textTransform: "capitalize",
                  fontSize: "20px",
                  fontFamily: "Arial",
                  // fontWeight: "600",
                  // paddingTop: "0px",
                  // paddingBottom: "0px",
                }}
                label="My Actions"
                {...a11yProps(1)}
              />
            </Tabs>
          </div>
        </Box>
        <TabPanel value={value} index={0}>
        <NormalizerDashboardContext>
          <div>
            {/* <Timeline1/> */}
            <Timelinereview/>
          </div>
          <div>
            <PerformanceRatingreview setstatusSort={ setstatusSort} />
          </div>
          <div>
            <Statusdivision /> 
          </div>
          {/* <div style={{ marginTop: "25px" }}>
            <Teamreview statusSort={statusSort} />
          </div> */}

          <Curveandgrid />
        </NormalizerDashboardContext>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <div>
            <Teamreview statusSort={statusSort} />
          </div>
          <div style={{ paddingTop: "25px" }}>
          <Ninebox/>
          </div>
        </TabPanel>
      </Box>
    </>
  );
}

export default NormalizerMain;
