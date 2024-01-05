import * as React from "react";
import Grid from "@mui/material/Grid";
import { Container, Box, Stack,Breadcrumbs } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Button, IconButton, Typography } from "@mui/material";
import Newexcel from "../../../../assets/Images/Newexcel.svg";
import Timelinerevview from "../../../reviewer/Dashboard/Timelinerevview";
import OverallDashboardExpandTableChild from "./OverallDashboardExpandTableChild";
import Leftarrow from "../../../../assets/Images/Leftarrow.svg";
import { Link,useNavigate  } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useGetActiveCalenderQuery, useGetEmployeeByFilterQuery } from "../../../../service";

export default function OverallDashboardExpandViewofTable(props: any) {
    const {
        employeeData1,
        setTeamtableExpandActive,
        setSolidperformersExpandActive,
        setNineboxExpand,
        setTopperformersExpandActive,
        setRatingsExpandActive,
        // Role
    } = props;
    const [appCalId, setappCalId] = React.useState<any>(`636cb1a7960b1548b80ff785`);
    const {data:activecalendardata , isLoading: isTitleLoading} =useGetActiveCalenderQuery('')

    React.useEffect(()=>{
      // if(activecalendardata?._id != undefined){
        setappCalId(activecalendardata?.data[0]?._id)
      // }
    },[activecalendardata])
    // console.log(appCalId,"appCalId")
    // activecalendardata?.data[0]

    const { data: employeeData } = useGetEmployeeByFilterQuery(`?select=employee_code,legal_full_name,position_long_description,grade,appraiser_name,section,normalizer_name,reviewer_name,section,sub section,division,manager_position,work_location,
    appraiser_code,reviewer_code,normalizer_code,reviewer.reviewer_rating,normalizer.normalizer_rating,
    appraisal.appraiser_rating,appraisal.potential,manager_code,email,appraisal.status,employee.employee_agree,division,sub_section,section,employee.employee_status&calendar=${appCalId}&limit=800`)
    // console.log(employeeData,"hhhhhhhhhhhhhh")
    const [trigger, settrigger] = React.useState(false);
// console.log(employeeData1,"employeeData1")
const [location, setLocation] = React.useState<any>([]);

const { state }: { state: any } = useLocation();
console.log(state?.tabValue,"location")
const whichRole = state?.Role
const tabValue = state?.tabValue
console.log(whichRole,"whichRole")
  const navigate = useNavigate();
  const [EmployeeData, setEmployeeData] = React.useState<any>([])
  console.log(EmployeeData,"EmployeeData11")
  const getPAStatus = (j: any) => {
    if (
      j?.appraisal?.objective_description &&
      j?.appraisal?.objective_description.length === 0
    )
      return " PA Not Started";
    else if (j?.appraisal?.status == "completed") return "-";
    else if (j?.appraisal?.appraiser_status === "pending")
      return " Pending with Appraiser";
    else if (j?.appraisal?.status === "normalized")
      return " Pending with Employee";
    else if (j?.appraisal?.appraiser_status?.includes("draft")) return " Pending with Appraiser (Draft)";
    else if (
      j?.appraisal?.appraiser_status === "submitted" &&
      (j?.reviewer?.reviewer_status == "pending" ||
        j?.reviewer?.reviewer_status == "draft")
    )
      return " Pending with Reviewer";
    else if (
      j?.appraisal?.appraiser_status === "accepted" &&
      (j?.reviewer?.reviewer_status == "pending" || j?.reviewer?.reviewer_status == "appraiser-accepted" ||
        j?.reviewer?.reviewer_status == "draft")
    )
      return " Pending with Reviewer";
    else if (j?.reviewer?.reviewer_status == "appraiser-rejected" || j?.reviewer?.reviewer_status == "draft") {
      return " Pending with Reviewer";
    } else if (
      // j.appraisal.appraiser_status === "submited" &&
      (j?.reviewer?.reviewer_status == "accepted") &&
      (j?.normalizer?.normalizer_status == "pending" || j?.normalizer?.normalizer_status == "draft")
    )
      return " Pending with HR Normalizer";
    else if (j?.appraisal?.appraiser_status === "reviewer-rejected")
      return " Pending with Appraiser (Reviewer Rejection)";
    else if (j?.appraisal?.appraiser_status === "normalizer-rejected")
      return " Pending with Appraiser (Normalizer Rejection)";
    else if (j?.appraisal?.appraiser_status === "appraiser-rejected-employee")
      return " Pending with Employee";
    else if (j?.appraisal?.appraiser_status === "employee-rejected")
      return " Pending with Appraiser (Employee Rejection)";
    else if (
      j?.reviewer.reviewer_status == "accepted" &&
      j?.normalizer.normalizer_status == "employee-rejected"
    )
      return " Pending with HR Normalizer";
    else if (j?.normalizer?.normalizer_status == "accepted")
      return " Pending with Employee";
    else if (j?.normalizer?.normalizer_status === "draft")
      return " Pending with HR Normalizer";
    else if (
      j?.reviewer?.reviewer_status == "rejected" &&
      j?.reviewer?.rejection_count == 3 &&
      (j?.normalizer?.normalizer_status == "pending" || j?.normalizer?.normalizer_status == "draft")
    )
      return " Pending with HR Normalizer";
    else if (j?.normalizer?.normalizer_status == "employee-rejected")
      return " Pending with HR Normalizer";
    // 5
    else if (j?.appraisal?.appraiser_status === "employee-rejected")
      return " Pending with Appraiser";
    // 2
    else if (
      j?.reviewer?.reviewer_status == "normalizer-rejected" &&
      j?.reviewer?.reviewer_status == "appraiser-rejected"
    )
      return "Pending with Reviewer";
    // 1
    else if (
      j?.appraisal?.appraiser_status == "normalizer-rejected" &&
      j?.appraisal?.appraiser_status == "accepted"
    )
      return "Pending with Reviewer";
    else return "-";
  };
  React.useEffect(()=>{
    let PendingAction =employeeData1?.filter((j: any) => {
      return getPAStatus(j)?.includes("Pending with Appraiser");
    });
    let Notstarted =employeeData1?.filter((j: any) => {
      return j?.appraisal?.status === "not-started";
    });
    let inprogress =employeeData1?.filter((j: any) => {
      return j?.appraisal?.status === "in-progress" || j?.appraisal?.status === "normalized";
    });
    let emprejected = employeeData1?.filter((j: any) => {
      return j?.appraisal?.status === "rejected";
    });
    let completed = employeeData1?.filter((j: any) => {
      return j?.appraisal?.status === "completed";
    });
    if (tabValue === 0) {
      setEmployeeData(employeeData1)
      setLocation("All")
    } else if (tabValue === 1) {
      setEmployeeData(PendingAction)
      setLocation("Pending Action")
    } else if (tabValue === 2) {
      setEmployeeData(Notstarted)
      setLocation("Not started ")
    } else if (tabValue === 3) {
      setEmployeeData(inprogress)
      setLocation("In progress ")
    } else if (tabValue === 4) {
      setEmployeeData(emprejected)
      setLocation("Employee rejection ")
    } else if (tabValue === 5) {
      setEmployeeData(completed)
      setLocation("Completed ")

    }
   
  },[employeeData1,tabValue])

  const handleBack = () =>{
    setTeamtableExpandActive(false);
    setRatingsExpandActive(false);
    setTopperformersExpandActive(false);
    setNineboxExpand(false);
    setSolidperformersExpandActive(false);
    // (state?.Role == "Normalizer")
    // if(state?.Role == "PAADMIN"){
    //   navigate("/PA_Dashboard") 
    // }else if (state?.Role == "Normalizer"){
    navigate(-1) 
  }
    // settrigger(true);
    // setTeamtableExpandActive(false);
    // navigate(-1);
  // }
  // React.useEffect(()=>{
  //   setTeamtableExpandActive(false);
  //   // navigate("/normalizer") 
  // setTeamtableExpandActive(false);
  // setRatingsExpandActive(false);
  //   setTopperformersExpandActive(false);
  //   setNineboxExpand(false);
  //   setSolidperformersExpandActive(false);
  //   navigate("/normalizer") 
  // },[trigger])
  return (
    <>
      <div
        style={{
          background: "#f1f1f1",
          minHeight: "100px",
          overflow: "hidden",
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
              to={"/dashboardreview"}
            >
              My Team Dashboard
              </Link> */}
              {/* <Link
              style={{
                fontSize: "18px",
                color: "#3e8cb5",
                fontFamily: "Arial",
              }}
              color="inherit"
              to={"/dashboardreview"}
              state={{
                from: `${1}`
              }}
            > */}
         {/* <Link to={"/normalizer"}>   */}
            {/* <Typography
        style={{
          fontSize: "18px",
          color: "#3e8cb5",
          fontFamily: "Arial",
          cursor:"pointer"
        }}
      
        onClick={() => navigate(-1) }
      >
     Overall Dashboard
      </Typography> */}
      {whichRole == "Normalizer" && <Link
              style={{
                fontSize: "18px",
                color: "#3e8cb5",
                fontFamily: "Arial",
              }}
              color="inherit"
              to={"/normalizer"}
              state={{
                from: "toOverallDashboard",
               }}
            >
              Overall Dashboard
            </Link>}
      {/* </Link>  */}
             
            {/* </Link> */}
            {whichRole == "Normalizer" && <Link
              style={{
                fontSize: "18px",
                color: "#3e8cb5",
                fontFamily: "Arial",
              }}
              color="inherit"
              to={"/normalizer"}
              state={{
                from: "toOverallDashboard",
               }}
            >
    My Team
      </Link>}
     {whichRole == "PAADMIN" && <Link
              style={{
                fontSize: "18px",
                color: "#3e8cb5",
                fontFamily: "Arial",
              }}
              color="inherit"
              to={"/PA_Dashboard"}
              state={{
                from: "toOverallDashboard",
               }}
            >
              Overall Dashboard
            </Link>}
            {/* {whichRole == "PAADMIN" && <Link
              style={{
                fontSize: "18px",
                color: "#3e8cb5",
                fontFamily: "Arial",
              }}
              color="inherit"
              to={"/PA_Dashboard"}
              state={{
                from: "toOverallDashboard",
               }}
            >
    My Team
      </Link>} */}
      {/* add here */}
      <Typography 
       style={{
        fontSize: "18px",
        color: "#333333",
        fontFamily: "Arial",
      }}
      color="text.primary">
      {location}
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
        <div>
          <OverallDashboardExpandTableChild 
          //employeeData1={employeeData1}
          employeeData1={EmployeeData}
          appCalId={appCalId}
          tabValue={tabValue}
          />
        </div>
      </div>
    </>
  );
}
