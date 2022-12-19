import React, { Suspense } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
// import Timelinereview from "./Timelinerevview";
// import PerformanceRatingreview from "../../reviewer/Dashboard/performanceratingchart/performanceratingreview";
// import Teamreview from "../../reviewer/Dashboard/teamtablereview/teamreview";
// import Curveandgrid from "./charts/curveandgrid";
import Snackbar from "@mui/material/Snackbar";
import { useState, createContext, useContext, useEffect } from "react";
import AppraiserDashboardContext from "./AppraiserDashboardContext";
import {

  useGetAppraisalCalenderQuery,
  useGetCalenderQuery,

} from "../../../service";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, useLocation, useParams } from "react-router-dom";

const Curveandgrid = React.lazy(() => import("./charts/curveandgrid"));
const Timelinereview = React.lazy(() => import("./Timelinerevview"));
const PerformanceRatingreview = React.lazy(
  () =>
    import(
      "../../reviewer/Dashboard/performanceratingchart/performanceratingreview"
    )
);
const Teamreview = React.lazy(
  () => import("../../reviewer/Dashboard/teamtablereview/teamreview")
);

const Ninebox = React.lazy(
  () => import("../../reviewer/Dashboard/teamtablereview/ninebox")
);
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

function Dashboardcopy() {
  const [statusSort, setstatusSort] = useState<any>("");
  const { data: calendarData } = useGetCalenderQuery("");



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
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Snackbar
        // open={open}
        autoHideDuration={6000}
        // onClose={handleClose}
        message="Note archived"
        // action={action}
      />
      <div
        style={{
          background: "#F1F1F1",
          height: "auto",
        }}
      >
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
              sx={{ borderBottom: 1, borderColor: "divider",marginRight:"30px" }}
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
                label="PA Dashboard"
                {...a11yProps(1)}
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
                {...a11yProps(0)}
              />
            </Tabs>
          </div>
        </Box>
        {/* <TabPanel value={value} index={0}>
          <AppraiserDashboardContext>
            <div>
              <Timelinereview />
            </div>
            <div>
              <PerformanceRatingreview setstatusSort={setstatusSort} />
            </div>

            {/* <div style={{ marginTop: "25px" }}>
              <Teamreview statusSort={statusSort} />
            </div> */}

            {/* <Curveandgrid />
          </AppraiserDashboardContext>
        </TabPanel> */} 

        <TabPanel value={value} index={1}>
          <AppraiserDashboardContext>
            <div>
              <Teamreview statusSort={statusSort} />
            </div>

            <div style={{ paddingTop: "25px" }}>
          
              <Ninebox />
            </div>
          </AppraiserDashboardContext>
        </TabPanel>
      </div>
    </Suspense>
  );
}

export default Dashboardcopy;
