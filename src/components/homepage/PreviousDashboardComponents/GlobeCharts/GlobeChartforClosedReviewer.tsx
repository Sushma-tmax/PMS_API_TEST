import * as React from "react";
import Grid from "@mui/material/Grid";
import { Container, Box, IconButton,Breadcrumbs } from "@mui/material";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
// import { useGetEmployeeByFilterQuery, useGetReviewerEmployeeByFilterQuery } from "../../service";
import { useGetEmployeeByFilterQuery,useGetReviewerEmployeeByFilterQuery } from "../../../../service";
// import Timelinerevview from "../../components/reviewer/Dashboard/Timelinerevview";
// import FilteredExpandtable from "./FilteredExpandtable";
import FilteredExpandtable from "../../MyTeamDashboardComponents/GlobeChartChildExpandtable";
import NineboxandTopPerformance from "../../MyTeamDashboardComponents/NineboxandTopPerformance";
// import { useLoggedInUser } from "../../hooks/useLoggedInUser";
import { useLoggedInUser } from "../../../../hooks/useLoggedInUser";
import { useState, useRef, useEffect } from "react";
import FilteredExpandtableClosed from "./GlobeChartforchildClosed";
import { useGetPreviousAppraisalEmployeeByFilterQuery } from "../../../../service/employee/previousAppraisal";

export default function FilteredTablemainofClosedReviewer(props: any) {
  const location: any = useLocation();
  const tabLocation = location?.state?.from;
//   console.log(tabLocation, "tabLocation");
//   console.log(tabLocation == "AveragePerformers", "tabLocation");
const CalendarName =location?.state?.name?.valueOfActiveCalender
  console.log(CalendarName,"CalendarName")
const rangeLow =location?.state?.range?.checklengthinRangesL
const rangeGood =location?.state?.range?.checklengthinRangesG
const rangeHigh =location?.state?.range?.checklengthinRangesH
const rangeAverage =location?.state?.range?.checklengthinRangesA

const statuscompleted =location?.state?.status?.checkAppraisalStatusCompleted
const statusinmediation =location?.state?.status?.checkAppraisalStatusInmediation
const statusinrenormalizetion =location?.state?.status?.checkAppraisalStatusRenormalization
console.log(statuscompleted,rangeGood ,rangeHigh,rangeAverage,"tabLocation");
const [headersToDisplayWhenInMediation, setheadersToDisplayWhenInMediation] = React.useState<any>(false);
  const [headersToDisplayWhenRenormalization, setheadersToDisplayWhenRenormalization] = React.useState<any>(false);
  const [headersToDisplayWhenCompleted, setheadersToDisplayWhenCompleted] = React.useState<any>(false);
  const [titleDisplay, setTitleDisplay] = React.useState<any>("Employee Rejection");

  useEffect(() => {
    if(tabLocation === "Completed"){
     setheadersToDisplayWhenCompleted(true)
    }else if(tabLocation === "In Re-normalization"){
     setheadersToDisplayWhenRenormalization(true)
    }else if(tabLocation === "In-Mediation" ){
     setheadersToDisplayWhenInMediation(true)
    }
    else{
      setTitleDisplay("Ratings Distribution")
    }
    }, [tabLocation])
  const { data: user } = useLoggedInUser();
  const navigate = useNavigate();
 
  console.log(location?.state?.Detail?.appCalId, "location")
  const [appCalId, setappCalId] = React.useState<any>(`636cb1a7960b1548b80ff785`);
  //const SELECT_FOR_DASHBOARD = `employee_code,legal_full_name,position_long_description,grade,section,sub_section,appraisal.appraiser_rating,reviewer.reviewer_rating,normalizer.normalizer_rating,appraisal.status,appraisal.appraiser_status,reviewer.reviewer_status,normalizer.normalizer_status,reviewer.rejection_count,appraisal.objective_description,reviewerIsDisabled,pa_status,employee.employee_rating`
  const SELECT_FOR_DASHBOARD = `employee_code,legal_full_name,position_long_description,grade,
  division,appraiser_name,reviewer_name,normalizer_name,appraisal.potential,manager_code,manager_name,manager_position,work_location
  section,sub_section,appraisal.appraiser_rating,reviewer.reviewer_rating,
  normalizer.normalizer_rating,appraisal.status,overall_rating,first_name,
  appraisal.appraiser_status,reviewer.reviewer_status,normalizer.normalizer_status,reviewer.rejection_count,
  appraisal.objective_description,reviewerIsDisabled,pa_status,employee.employee_rating`

 let navigationFrom = "PreviousDashboard";
  React.useEffect(() => {
    if (location?.state?.Detail?.appCalId !== undefined) {
      setappCalId(location?.state?.Detail?.appCalId)
    }

  }, [user])
  console.log(appCalId,"appCalId")
//   //Appraiser
//   const { data: employeeData } = useGetEmployeeByFilterQuery(
//     `?manager_code=${user?.employee_code}&calendar=${appCalId}&limit=800&select=${SELECT_FOR_DASHBOARD}`
//   );
//   const { data: data2 } = useGetEmployeeByFilterQuery(`?select=appraisal.status,employee.employee_agree,section,sub_section,employee.employee_status&manager_code=${user?.employee_code}&calendar=${appCalId}&limit=800`)
//   //Appraiser
  //reviewer
  const { data: userData } = useGetPreviousAppraisalEmployeeByFilterQuery(`?select=employee_code&employee_code=${user?.appraiser}`)
  const { data: employeeData } = useGetPreviousAppraisalEmployeeByFilterQuery(
    `?reviewer_code=${user?.employee_code}&calendar=${location?.state?.Detail?.appCalId}&limit=800&select=${SELECT_FOR_DASHBOARD}`
);
const { data: data2 } = useGetPreviousAppraisalEmployeeByFilterQuery(`?select=appraisal.status,sub_section,first_name,
section,employee_code,overall_rating,legal_full_name,position_long_description,grade,appraisal.appraiser_rating,normalizer.normalizer_rating,employee.employee_rating,employee.employee_agree,talent_category,employee.employee_rejection,employee.employee_status&reviewer_code=${user?.employee_code}&calendar=${location?.state?.Detail?.appCalId}&limit=800`)
   
  //reviewer
  //Normalizer
  //Normalizer
  const [users, setUsers] = useState<any>([]);
  const [hideEmployeeRating, sethideEmployeeRating] = React.useState<any>(false);
  console.log(employeeData,"employeeData")
  const checklengthinRange = (min: number, max: number) => {
    return (
      (employeeData?.data?.filter((item: any) => {
      
        return (
          item?.overall_rating >= min &&
          item?.overall_rating <= max
          && item?.appraisal?.status == "completed"
        );
      }))
    
    );
  };
  console.log(checklengthinRange(2.5, 2.99),"employeeDatas")
  const checkAppraisalStatusInProgress = (status: string) => {
    return data2?.data?.filter((item: any) => {
      // return item?.employee?.employee_status == "employee-rejected" && item?.appraisal.status == status ;
      return item?.employee?.employee_agree == "true" && item?.appraisal?.status === status;
    });
  };
  const checkAppraisalStatusCompleted = (status: string) => {
    return data2?.data?.filter((item: any) => {
      return item?.appraisal?.status === status &&
        (
          // item?.employee?.employee_status === 'employee-rejected'
          // || 
          item?.employee?.employee_rejection === "true");
    });
  };
  const checkAppraisalinmediationStatus = (status: string) => {
    return data2?.data?.filter((item: any) => {
      // return  item?.appraisal?.status === status;
      return item?.employee?.employee_agree == "false" && item?.appraisal?.status === status;

    });
  };
  
  useEffect(() => {
   
   if(tabLocation == "High Performers"){
    setUsers(rangeHigh)
    // console.log(checklengthinRange(4, 5),"checklengthinRange")
    // setUsers(checklengthinRange(4, 5))
   }else if(tabLocation == "Good Performers"){
    setUsers(rangeGood)
    // console.log(checklengthinRange(3, 3.99),"checklengthinRange")
    // setUsers(checklengthinRange(3, 3.99))
   }else if(tabLocation == "Average Performers"){
    setUsers(rangeAverage)
    // console.log(checklengthinRange(2.5, 2.99),"checklengthinRange")
    // setUsers(checklengthinRange(2.5, 2.99))
   }else if(tabLocation == "Low Performers"){
    setUsers(rangeLow)
    // console.log(checklengthinRange(1,2.49),"checklengthinRange")
    // setUsers(checklengthinRange(1, 2.49))
   }
     
  }, [employeeData]);
  useEffect(() => {
   
    if(tabLocation === "In Re-normalization"){
      setUsers(statusinrenormalizetion)
    //  setUsers(checkAppraisalStatusInProgress("rejected"));
     sethideEmployeeRating(true);
    }else if(tabLocation === "Completed"){
      setUsers(statuscompleted)
      //  setUsers(checkAppraisalStatusCompleted("completed"))
     sethideEmployeeRating(true);
    }else if(tabLocation === "In-Mediation"){
      setUsers(statusinmediation)
      //  setUsers(checkAppraisalinmediationStatus("rejected"))
     sethideEmployeeRating(true);
    }
      
   }, [data2]);
//pagecount
  // useEffect(() => {
  //   settablecount(() => {
  //     if (tabValue === 0) {
  //       return users?.length
  //       // settablecount(users?.length);
  //     } else {
  //       let temp = users?.filter((j: any) => {
  //         if (tabValue === 1) {
  //           return getPAStatus(j)?.includes("Pending with Appraiser");
  //         } else if (tabValue === 2) {
  //           return j?.appraisal?.status === "not-started";
  //         } else if (tabValue === 3) {
  //           // return getPAStatus(j)
  //           return j?.appraisal?.status === "in-progress" || j?.appraisal?.status === "normalized";
  //         } else if (tabValue === 4) {
  //           return j?.appraisal?.status === "rejected";
  //         } else if (tabValue === 5) {

  //           return j?.appraisal?.status === "completed";
  //         }
  //       });
  //       return temp?.length;
  //     }
  //   });
  // }, [users, tabValue]);
  return (
    <div
    style={{
      background: "#F1F1F1",
      height: "auto",
    }}
  >
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={0}
          minHeight="50px"
          marginLeft="25px"
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              style={{
                fontSize: "18px",
                color: "#3e8cb5",
                fontFamily: "Arial",
              }}
              color="inherit"
              to={"/ClosedcalendarDashboardReviewer"}
              state ={{
                oldappCalId : {appCalId}
              }}
            >
              Previous PA
            </Link>
            <Link
            style={{
              fontSize: "18px",
              color: "#3e8cb5",
              fontFamily: "Arial",
            }}
            color="inherit"
            to={"/ClosedcalendarDashboardReviewer"}
            state ={{
              oldappCalId : {appCalId}
            }}
          >
             {titleDisplay}
          </Link>
            <Typography
              style={{
                fontSize: "18px",
                color: "#333333",
                fontFamily: "Arial",
              }}
              color="text.primary"
            >
             {tabLocation}
            </Typography>
          </Breadcrumbs>
        </Stack>
        {/* <div
          style={{
            fontSize: "20px",
            color: "#333333",
            padding: "20px",
            fontFamily: "arial",
            backgroundColor: "white",
            marginLeft: "25px",
            marginRight: "25px"

          }}>
          Timeline
        </div>
      <div >
        <Timelinerevview />
      </div> */}
      <div >
      
      <FilteredExpandtableClosed
      CalendarName={CalendarName}
      EmployeeData = {users}
      hideEmployeeRating={hideEmployeeRating}
      headersToDisplayWhenInMediation={headersToDisplayWhenInMediation}
      headersToDisplayWhenRenormalization={headersToDisplayWhenRenormalization}
      headersToDisplayWhenCompleted={headersToDisplayWhenCompleted}

      />
       {/* <FilteredExpandtable
      navigationFrom = {navigationFrom}
      EmployeeData = {users}
      hideEmployeeRating={hideEmployeeRating}
      headersToDisplayWhenInMediation={headersToDisplayWhenInMediation}
      headersToDisplayWhenRenormalization={headersToDisplayWhenRenormalization}
      headersToDisplayWhenCompleted={headersToDisplayWhenCompleted}

      /> */}
      </div>
      {/* <div style={{marginTop:"25px"}}>
      <NineboxandTopPerformance/>
      </div> */}
    </div>
  );
}
