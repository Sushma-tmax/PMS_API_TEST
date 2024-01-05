import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, createContext, useContext, useEffect } from "react";
import { useGetCalenderQuery, useGetEmployeeQuery } from "../../service";
import Container from "@mui/material/Container";
// import Timelinereview from '../reviewer/Dashboard/Timelinerevview'
// import PerformanceRatingreview from "../reviewerMain/performanceratingchart/performanceratingreview";
// import Curveandgrid from "../reviewerMain/charts/curveandgrid";
// import ReviewerDashboardContext from "./ReviewerDashboardContext";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useLoggedInUser } from "../../hooks/useLoggedInUser";
import { Link, useLocation, useParams } from "react-router-dom";
import NineBoxcard from "../homepage/UI/NineBoxCard";


const Timelinereview = React.lazy(
  () => import("../reviewer/Dashboard/Timelinerevview")
);
const PerformanceRatingreview = React.lazy(
  () => import("../reviewerMain/performanceratingchart/performanceratingreview")
);
const Curveandgrid = React.lazy(
  () => import("../reviewerMain/charts/curveandgrid")
);
const ReviewerDashboardContext = React.lazy(
  () => import("./ReviewerDashboardContext")
);
const Teamreview = React.lazy(
  () => import("../homepage/MyTeamDashboardComponents/MyTeamTable/Reviewer/TeamTableReviewermain")
);
const Ninebox = React.lazy(
  () => import("../reviewerMain/teamtablereview/ninebox")
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

function ReviewerMain() {
  const { data: calendarData } = useGetCalenderQuery("");
  const [statusSort, setstatusSort] = useState<any>("");
  const [value, setValue] = React.useState<any>(0);
  const [users, setUsers] = useState<any>([]);
  const [myAppraisals, setMyAppraisals] = useState<any>([]);
  const [empData,setEmpData] = useState<any>([])
  const { data: employeeData, refetch } = useGetEmployeeQuery("all");
  const { data: user } = useLoggedInUser();
  const location: any = useLocation();
  var tabLocation = location?.state?.from 
  // console.log(tabLocation,'tabLocation')
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
 useEffect(() => {
 if(tabLocation !== undefined){
  setValue(1);
 }
 }, [tabLocation])
 
// to get the employees for appraisal
  useEffect(() => {
    console.log("useeffect run");
    if (employeeData) {
      setUsers(employeeData.data);
      let appraisals = employeeData.data.filter(
        (emp: any) => emp.manager_code == user?.employee_code
      );
      let reviewer = appraisals.map((i: any) => {
        return employeeData.data.filter((j: any) =>
          j.manager_code == i.employee_code
        )
      }
      ).flat()
      setMyAppraisals(reviewer);

      console.log("myappraisals", "appraisals");
    }
  }, [employeeData]);
  console.log(myAppraisals, "hhhh");

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
          <ReviewerDashboardContext>
            <div>
              <Timelinereview />
            </div>
            <div>
              <PerformanceRatingreview setstatusSort={setstatusSort} empData = {myAppraisals}/>
            </div>
           < NineBoxcard/>
            {/* <div style={{ marginTop: "25px" }}>
            <Teamreview statusSort={statusSort} />
          </div> */}

            {/* <Curveandgrid /> */}

          </ReviewerDashboardContext>
        </TabPanel>
        <TabPanel value={value} index={1}>
        <ReviewerDashboardContext>
          <div>
            <Teamreview statusSort={statusSort} empData = {myAppraisals}/>
          </div>

          <div style={{ paddingTop: "25px" }}>
              <Ninebox />
            </div>
            </ReviewerDashboardContext>
        </TabPanel>
      </Box>
    </>
  );
}

export default ReviewerMain;
