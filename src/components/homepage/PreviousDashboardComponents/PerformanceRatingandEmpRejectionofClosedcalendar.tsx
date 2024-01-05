import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Statusbar from "../../reviewer/Dashboard/performanceratingchart/statusbar";
import Container from "@mui/material/Container";
//import OverallStatus from "./overallstatus";
import { Stack, styled } from "@mui/material";
import { useGetEmployeeQuery, useGetEmployeeByFilterQuery } from "../../../service";
import { useLoggedInUser } from "../../../hooks/useLoggedInUser";
import StatusBar from "../StatusBar";
import EmployeeRejection from "../MyTeamDashboardComponents/EmployeeRejection";
import { useState, useEffect } from 'react';
import EmployeeRejectionofOverallDashboard from "../OverallDashboardComponents/EmployeeRejectionofOverallDashboard";
import EmployeeRejectionofclosedcalendarDashboard from "./EmployeeRejectionofClosedcalendarDashboard";

const Dropdown = styled("div")({
  fontSize: "14px",
  fontColor: "#333333",
  fontFamily: "Arial",
});

function PerformanceRatingandEmpRejectionofClosedcalendar(props: any) {
  const { data: user } = useLoggedInUser();
  const { setstatusSort, completedCount, valueOfActiveCalender,inprogressCount, inMediaton, range1, range2, range3, range4,
    StatusValues, TotalEmp, CompletedEmp, setValue, handleOnClickCard, navigationFrom, setselectedRatingRange, setRatingsExpandActive, appCalId
    , checklengthinRanges, checkAppraisalStatusC, checkAppraisalStatusIR, checkAppraisalStatusIM,navigationRole } = props;
  console.log(completedCount, inMediaton, inprogressCount,checkAppraisalStatusIM("rejected"),checkAppraisalStatusC("completed"),checkAppraisalStatusIR("rejected"), "userinAppraiserDash")
  const SELECT_FOR_DASHBOARD = `employee_code,overall_rating,legal_full_name,position_long_description,first_name,grade,appraisal.appraiser_rating,reviewer.reviewer_rating,normalizer.normalizer_rating,appraisal.status,appraisal.appraiser_status,reviewer.reviewer_status,normalizer.normalizer_status,reviewer.rejection_count,appraisal.objective_description,reviewerIsDisabled`
  const [linkofAppraiser, setlinkofAppraiser] = React.useState<string>('');
  console.log(navigationFrom, "navigationFrom")
  useEffect(() => {
    if (navigationFrom === "Appraiser") {
      setlinkofAppraiser("/FilteredTablemainofClosedAppraiser")
    } else if (navigationFrom === "Reviewer") {
      setlinkofAppraiser("/FilteredTablemainofClosedReviewer")
    } else if (navigationFrom === "Normalizer") {
      setlinkofAppraiser("/ratingTableforCharts")
    }
  }, [navigationFrom])



  return (
    <>
      <div style={{ position: "relative" }}>
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "#fff",
            marginLeft: "25px",
            marginRight: "25px",
          }}
        >


          <div style={{ marginTop: "30px", paddingBottom: "30px", }} >

            <EmployeeRejectionofclosedcalendarDashboard
            navigationRole={navigationRole}
              checkAppraisalStatusCompleted={checkAppraisalStatusC("completed")}
              checkAppraisalStatusInmediation={checkAppraisalStatusIM("completed")}
              checkAppraisalStatusRenormalization={checkAppraisalStatusIR("completed")}
              checklengthinRangesL={checklengthinRanges(1, 2.49)}
              checklengthinRangesA={checklengthinRanges(2.5, 2.99)}
              checklengthinRangesG={checklengthinRanges(3, 3.99)}
              checklengthinRangesH={checklengthinRanges(4, 5)}
              appCalId={appCalId}
              completedCount={completedCount}
              inprogressCount={inprogressCount}
              inMediaton={inMediaton}
              range1={range1}
              range2={range2}
              range3={range3}
              range4={range4}
              TotalEmp={TotalEmp}
              CompletedEmp={CompletedEmp}
              linkofAppraiser={linkofAppraiser}
              valueOfActiveCalender={valueOfActiveCalender}
              setselectedRatingRange={setselectedRatingRange}
              setRatingsExpandActive={setRatingsExpandActive}
            />
          </div>
          {/* <Statusbar />  */}
          {/* <OverallStatus setstatusSort={setstatusSort} /> */}
        </Box>
      </div>
    </>
  );
}

export default PerformanceRatingandEmpRejectionofClosedcalendar;
