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
import FilteredTableofExpNinebox from "./FilteredTableofExpNinebox";

export default function FilteredtablemainNormalizer(props: any) {
  const location: any = useLocation();
  const tabLocation = location?.state?.selectName;
  console.log(location, "tabLocation");
//   console.log(tabLocation == "AveragePerformers", "tabLocation");
const { data: activecalendardata, isLoading: isTitleLoading } = useGetActiveCalenderQuery('')

  const { data: user } = useLoggedInUser();
  const navigate = useNavigate();
 
  console.log(user, "idss")
  const [appCalId, setappCalId] = React.useState<any>(`636cb1a7960b1548b80ff785`);
  const SELECT_FOR_DASHBOARD = `employee_code,legal_full_name,position_long_description,
  grade,section,sub_section,appraisal.appraiser_rating,reviewer.reviewer_rating
  ,normalizer.normalizer_rating,appraisal.status,overall_rating,appraisal.appraiser_status, service_reference_date,isSupervisor,email,function,
  division,appraiser_name,first_name,reviewer_name,normalizer_name,appraisal.potential,manager_code,manager_name,manager_position,work_location
  reviewer.reviewer_status,normalizer.normalizer_status,reviewer.rejection_count,
  appraisal.objective_description,reviewerIsDisabled,pa_status,employee.employee_rating`

  // let navigationFrom = "Appraiser";
  React.useEffect(() => {
    if (activecalendardata?.data[0]?._id !== undefined) {
      setappCalId(activecalendardata?.data[0]?._id)
    }

  }, [activecalendardata])
  
  //Normalizer
  const { data: data2 } = useGetEmployeeByFilterQuery(`?select=appraisal.status,employee.employee_agree,division,first_name,sub_section,section,employee.employee_status&calendar=${appCalId}&limit=800`)
  // const { data: employeeData } = useGetEmployeeByFilterQuery(
  //   `?limit=800&select=${SELECT_FOR_DASHBOARD}`
  // );
   //newly changed
   const { data: employeeData } = useGetEmployeeByFilterQuery(
    `?calendar=${appCalId}&limit=800&select=${SELECT_FOR_DASHBOARD}`
  );
  //Normalizer
  const [users, setUsers] = useState<any>([]);
   //getting employee details
   useEffect(() => {
    const employeeDetails = employeeData?.data?.filter((i:any)=>{
      console.log(tabLocation,"new")
      console.log(i?.legal_full_name == tabLocation,"new1")
      return i?.legal_full_name == tabLocation
    })
    setUsers(employeeDetails)
    //console.log(employeeDetails, "employeeDetails")
    }, [employeeData])
 
  console.log(users,"employeeData")
  
  
  
  
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
            {/* <Link
              style={{
                fontSize: "18px",
                color: "#3e8cb5",
                fontFamily: "Arial",
              }}
              color="inherit"
              to={"/Normalizer"}
            > */}
                   <Link
              style={{
                fontSize: "18px",
                color: "#3e8cb5",
                fontFamily: "Arial",
              }}
              color="inherit"
              to={"/normalizer"}
              state={{
                from: "toMyTeamDashboard",
               }}
            >
              My Team Dashboard
            </Link>
            
            {/* </Link> */}
            <Typography
              style={{
                fontSize: "18px",
                color: "#333333",
                fontFamily: "Arial",
              }}
              color="text.primary"
            >
             { location?.state?.indexBasedTitle == "" || location?.state?.indexBasedTitle ==  undefined ? "9-Box Grid" : location?.state?.indexBasedTitle }

             {/* {tabLocation} */}
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
      <FilteredTableofExpNinebox
      EmployeeData = {users}
      AllEmployee={location.state.indexBasedValue}
     // hideEmployeeRating={hideEmployeeRating}
      />
      </div>
      {/* <div style={{marginTop:"25px"}}>
      <NineboxandTopPerformance/>
      </div> */}
    </div>
  );
}
