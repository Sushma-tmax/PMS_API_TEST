import * as React from "react";
import Grid from "@mui/material/Grid";
import { Container, Box, IconButton,Breadcrumbs } from "@mui/material";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { useGetActiveCalenderQuery, useGetEmployeeByFilterQuery, useGetReviewerEmployeeByFilterQuery } from "../../../../service";
import Timelinerevview from "../../../reviewer/Dashboard/Timelinerevview";
import FilteredExpandtable from "../GlobeChartChildExpandtable";
import NineboxandTopPerformance from "../NineboxandTopPerformance";
import { useLoggedInUser } from "../../../../hooks/useLoggedInUser";
import { useState, useRef, useEffect } from "react";

export default function FilteredtablemainReviewer(props: any) {
  const location: any = useLocation();
  const tabLocation = location?.state?.from;
const rangeLow =location?.state?.range?.checklengthinRangesL
const rangeGood =location?.state?.range?.checklengthinRangesG
const rangeHigh =location?.state?.range?.checklengthinRangesH
const rangeAverage =location?.state?.range?.checklengthinRangesA



const statuscompleted =location?.state?.status?.checkAppraisalStatusCompleted
const statusinmediation =location?.state?.status?.checkAppraisalStatusInmediation
const statusinrenormalizetion =location?.state?.status?.checkAppraisalStatusRenormalization
console.log(statuscompleted,rangeGood ,rangeHigh,rangeAverage,location?.state,"tabLocation");
  const { data: user } = useLoggedInUser();
  const navigate = useNavigate();
 
  //---------------------for header conditions
  const [titleDisplay, setTitleDisplay] = React.useState<any>("Employee Rejection");
  const [headersToDisplayWhenInMediation, setheadersToDisplayWhenInMediation] = React.useState<any>(false);
  const [headersToDisplayWhenRenormalization, setheadersToDisplayWhenRenormalization] = React.useState<any>(false);
  const [headersToDisplayWhenCompleted, setheadersToDisplayWhenCompleted] = React.useState<any>(false);
  useEffect(() => {
  if(tabLocation === "Completed"){
    setheadersToDisplayWhenCompleted(true)
  }else if(tabLocation === "In Re-normalization"){
    setheadersToDisplayWhenRenormalization(true)
  }else if(tabLocation === "In Mediation"){
    setheadersToDisplayWhenInMediation(true)
  }else{
    setTitleDisplay("Ratings Distribution")
  }
  }, [tabLocation])
  
   //---------------------for header conditions

  const [appCalId, setappCalId] = React.useState<any>(`636cb1a7960b1548b80ff785`);
  const SELECT_FOR_DASHBOARD = `employee_code,legal_full_name,position_long_description,grade,
  division,appraiser_name,reviewer_name,normalizer_name,appraisal.potential,manager_code,manager_name,manager_position,work_location
  section,sub_section,appraisal.appraiser_rating,reviewer.reviewer_rating,
  normalizer.normalizer_rating,appraisal.status,first_name,overall_rating,
  appraisal.appraiser_status,reviewer.reviewer_status,normalizer.normalizer_status,reviewer.rejection_count,
  appraisal.objective_description,reviewerIsDisabled,pa_status,employee.employee_rating`
  const {data:activecalendardata , isLoading: isTitleLoading} =useGetActiveCalenderQuery('')

  React.useEffect(() => {
    setappCalId(activecalendardata?.data[0]?._id)
  }, [activecalendardata])
  const { data: userData } = useGetEmployeeByFilterQuery(`?select=employee_code&employee_code=${user?.appraiser}`)
  const { data: employeeData } = useGetEmployeeByFilterQuery(
    `?reviewer_code=${user?.employee_code}&calendar=${appCalId}&limit=800&select=${SELECT_FOR_DASHBOARD}`
);
const { data: data2 } = useGetEmployeeByFilterQuery(`?select=appraisal.status,sub_section,first_name,
section,employee_code,legal_full_name,position_long_description,grade,appraisal.appraiser_rating,normalizer.normalizer_rating,employee.employee_rating,employee.employee_rejection,employee.employee_agree,talent_category,employee.employee_status,appraisal.potential&reviewer_code=${user?.employee_code}&calendar=${appCalId}&limit=800`)
   
  const [users, setUsers] = useState<any>([]);
  const [hideEmployeeRating, sethideEmployeeRating] = React.useState<any>(false);
  console.log(users,"employeeData")
  const checklengthinRange = (min: number, max: number) => {
    return (
      (employeeData?.data?.filter((item: any) => {
      
        return (
          item?.normalizer?.normalizer_rating >= min &&
          item?.normalizer?.normalizer_rating <= max
          && item?.appraisal?.status == "completed"
        );
      }))
    
    );
  };
  const checkAppraisalStatusInProgress = (status: string) => {
    return data2?.data?.filter((item: any) => {
      return item?.employee?.employee_agree == true && item?.appraisal?.status === status;
    });
  };
  const checkAppraisalStatusCompleted = (status: string) => {
    return data2?.data?.filter((item: any) => {
      return item?.appraisal?.status === status &&
        (
          item?.employee?.employee_rejection === true);
    });
  };
  const checkAppraisalinmediationStatus = (status: string) => {
    return data2?.data?.filter((item: any) => {
      return item?.employee?.employee_agree == false && item?.appraisal?.status === status;

    });
  };
  
  useEffect(() => {
   
   if(tabLocation == "High Performers"){
    setUsers(rangeHigh)
   }else if(tabLocation == "Good Performers"){
    setUsers(rangeGood)
   }else if(tabLocation == "Average Performers"){
    setUsers(rangeAverage)
   }else if(tabLocation == "Low Performers"){
    setUsers(rangeLow)
   }
     
  }, [employeeData]);
  useEffect(() => {
   
    if(tabLocation === "In Re-normalization"){
      setUsers(statusinrenormalizetion)
     sethideEmployeeRating(true);
    }else if(tabLocation === "Completed"){
      setUsers(statuscompleted)
     sethideEmployeeRating(true);
    }else if(tabLocation === "In Mediation"){
      setUsers(statusinmediation)
     sethideEmployeeRating(true);
    }

   }, [data2]);

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
              to={"/Reviewer"}
              state={{
                from: "toMyTeamDashboard",
               }}
            >
              My Team Dashboard
            </Link>
            <Link
              style={{
                fontSize: "18px",
                color: "#3e8cb5",
                fontFamily: "Arial",
              }}
              color="inherit"
              to={"/Reviewer"}
              state={{
                from: "toMyTeamDashboard",
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
      <div >
      <FilteredExpandtable
          EmployeeData={users}
          hideEmployeeRating={hideEmployeeRating}
          headersToDisplayWhenInMediation={headersToDisplayWhenInMediation}
          headersToDisplayWhenRenormalization={headersToDisplayWhenRenormalization}
          headersToDisplayWhenCompleted={headersToDisplayWhenCompleted}
        />
      </div>
    </div>
  );
}
