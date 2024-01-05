import * as React from "react";
import { Container, Box, IconButton, Breadcrumbs } from "@mui/material";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useGetActiveCalenderQuery, useGetEmployeeByFilterQuery, useGetReviewerEmployeeByFilterQuery } from "../../../../service";
import FilteredExpandtable from "../GlobeChartChildExpandtable";
import { useLoggedInUser } from "../../../../hooks/useLoggedInUser";
import { useState, useRef, useEffect } from "react";

export default function FilteredTable(props: any) {
  const location: any = useLocation();
  const tabLocation = location?.state?.from;
  console.log(location?.state, "tabLocation");
  const rangeLow =location?.state?.range?.checklengthinRangesL
  const rangeGood =location?.state?.range?.checklengthinRangesG
  const rangeHigh =location?.state?.range?.checklengthinRangesH
  const rangeAverage =location?.state?.range?.checklengthinRangesA

  const statuscompleted =location?.state?.status?.checkAppraisalStatusCompleted
  const statusinmediation =location?.state?.status?.checkAppraisalStatusInmediation
  const statusinrenormalizetion =location?.state?.status?.checkAppraisalStatusRenormalization
  console.log(statuscompleted,rangeGood ,rangeHigh,rangeAverage,"tabLocation");
  const {data:activecalendardata , isLoading: isTitleLoading} =useGetActiveCalenderQuery('')

  const { data: user } = useLoggedInUser();
  const navigate = useNavigate();

  console.log(user, "idss")
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


  const SELECT_FOR_DASHBOARD = `employee_code,legal_full_name,position_long_description,grade,appraiser_code,reviewer_code,normalizer_code,
  division,appraiser_name,reviewer_name,normalizer_name,appraisal.potential,manager_code,manager_name,manager_position,work_location,
  section,sub_section,appraisal.appraiser_rating,reviewer.reviewer_rating,
  normalizer.normalizer_rating,appraisal.status,talent_category,overall_rating,
  appraisal.appraiser_status,reviewer.reviewer_status,normalizer.normalizer_status,reviewer.rejection_count,
  ,isSupervisor,service_reference_date,first_name,email,function,appraisal.objective_description,reviewerIsDisabled,pa_status,employee.employee_rating`

  React.useEffect(() => {
    setappCalId(activecalendardata?.data[0]?._id)
  }, [activecalendardata])
  //Appraiser
  const { data: employeeData } = useGetEmployeeByFilterQuery(
    `?appraiser_code=${user?.employee_code}&calendar=${appCalId}&limit=800&select=${SELECT_FOR_DASHBOARD}`
  );
  const { data: data2 } = useGetEmployeeByFilterQuery(`?select=appraisal.status,employee.employee_agree,section,sub_section,first_name,employee_code,legal_full_name,position_long_description,grade,appraisal.appraiser_rating,normalizer.normalizer_rating,employee.employee_rejection,employee.employee_rating,talent_category,appraisal.potential,employee.employee_status,talent_category&appraiser_code=${user?.employee_code}&calendar=${appCalId}&limit=800`)
  const [users, setUsers] = useState<any>([]);
  const [hideEmployeeRating, sethideEmployeeRating] = React.useState<any>(false);
  console.log(users, "employeeData")
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
  console.log(checklengthinRange(2.5, 2.99), "employeeDatas")
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
      return item?.employee?.employee_agree == false &&  item?.appraisal?.status === status;

    });
  };

  useEffect(() => {

    if (tabLocation == "High Performers") {
      setUsers(rangeHigh)
    } else if (tabLocation == "Good Performers") {
      setUsers(rangeGood)
    } else if (tabLocation == "Average Performers") {
      setUsers(rangeAverage)
    } else if (tabLocation == "Low Performers") {
      setUsers(rangeLow)
    }
      // rangeAverage
      // rangeGood
      // rangeHigh
      // rangeLow
  }, [employeeData]);
  useEffect(() => {

    if (tabLocation === "In Re-normalization") {

      setUsers(statusinrenormalizetion)
      sethideEmployeeRating(true);
    } else if (tabLocation === "Completed") {
      setUsers(statuscompleted)
      sethideEmployeeRating(true);
    } else if (tabLocation === "In Mediation") {
      setUsers(statusinmediation)
      sethideEmployeeRating(true);
    }

  }, [data2]);
  //pagecount
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
            to={"/dashboardreview"}
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
            to={"/dashboardreview"}
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
