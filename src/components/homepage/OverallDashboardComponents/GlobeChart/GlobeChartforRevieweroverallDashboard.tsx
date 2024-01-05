import * as React from "react";
import Grid from "@mui/material/Grid";
import { Container, Box, IconButton,Breadcrumbs } from "@mui/material";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { 
    useGetEmployeeByFilterQuery,
    useGetReviewerEmployeeByFilterQuery ,
    useGetlineManagerEmployeeQuery,
    useGetlineManagerPlusOneEmployeeQuery
} from "../../../../service";
import Timelinerevview from "../../../reviewer/Dashboard/Timelinerevview";
import FilteredExpandtable from "../../MyTeamDashboardComponents/GlobeChartChildExpandtable";
import NineboxandTopPerformance from "../../MyTeamDashboardComponents/NineboxandTopPerformance";
import { useLoggedInUser } from "../../../../hooks/useLoggedInUser";
import { useState, useRef, useEffect, useContext  } from "react";
import AppraiserDashboardContext from '../../../reviewer/Dashboard/AppraiserDashboardContext';
import { useDashboardContext } from "../../../reviewer/Dashboard/AppraiserDashboardContext";
import FilteredExpandTableofOverallDashboard from "./GlobeChartChildforOverallDashboard";

// function useProvidedAppraisalContext() {
  
//   return {
     
//   }

// }

export default function FilteredtablemainofRevieweroverall(props: any) {
  const {
    FinalData,selectedRatingRange,setRatingsExpandActive,setselectedRatingRange
     } = props;
  const location: any = useLocation();
  const tabLocation = location?.state?.from;
   console.log(location, "tabLocation");
  // console.log(tabLocation == "AveragePerformers", "tabLocation");

  //added to fix the no data issue(27/9/2023)
const rangeLow =location?.state?.range?.checklengthinRangesL
const rangeGood =location?.state?.range?.checklengthinRangesG
const rangeHigh =location?.state?.range?.checklengthinRangesH
const rangeAverage =location?.state?.range?.checklengthinRangesA
const statuscompleted =location?.state?.status?.checkAppraisalStatusCompleted
const statusinmediation =location?.state?.status?.checkAppraisalStatusInmediation
const statusinrenormalizetion =location?.state?.status?.checkAppraisalStatusRenormalization


  const { data: user } = useLoggedInUser();
  const navigate = useNavigate();
 
  console.log(FinalData, "FinalData")
  const [appCalId, setappCalId] = React.useState<any>(`636cb1a7960b1548b80ff785`);
  // const SELECT_FOR_DASHBOARD = `employee_code,legal_full_name,position_long_description,grade,
  // section,sub_section,appraisal.appraiser_rating,reviewer.reviewer_rating,normalizer.normalizer_rating,
  // appraisal.status,appraisal.appraiser_status,reviewer.reviewer_status,normalizer.normalizer_status,
  // reviewer.rejection_count,appraisal.objective_description,reviewerIsDisabled,pa_status,employee.employee_rating`

  // const { FilteredEmployeeData, setFilteredEmployeeData } = useDashboardContext();
 
  // const context = useContext(AppraiserDashboardContext);
  // const {  FilteredEmployeeData, setFilteredEmployeeData  } = context;
   // console.log(FilteredEmployeeData,"FilteredEmployeeData")

  const SELECT_FOR_DASHBOARD = `employee_code,legal_full_name,position_long_description,grade,
  division,appraiser_name,reviewer_name,normalizer_name,appraisal.potential,manager_code,manager_name,manager_position,work_location
  section,sub_section,appraisal.appraiser_rating,reviewer.reviewer_rating,
  normalizer.normalizer_rating,appraisal.status,overall_rating,first_name,
  appraisal.appraiser_status,reviewer.reviewer_status,normalizer.normalizer_status,reviewer.rejection_count,
  appraisal.objective_description,reviewerIsDisabled,pa_status,employee.employee_rating`

  // let navigationFrom = "Appraiser";
  React.useEffect(() => {
    if (user?.calendar?._id !== undefined) {
      setappCalId(user?.calendar?._id)
    }

  }, [user])
  //Appraiser
  const { data: employeeData } = useGetEmployeeByFilterQuery(
    `?manager_code=${user?.employee_code}&calendar=${appCalId}&limit=800&select=${SELECT_FOR_DASHBOARD}`
  );
  const { data: data2 } = useGetEmployeeByFilterQuery(`?select=appraisal.status,employee.employee_agree,section,sub_section,first_name,employee.employee_status&manager_code=${user?.employee_code}&calendar=${appCalId}&limit=800`)
  //Appraiser
  //Query for lineManager Employee 
  const { data:lineManagerEmployee  } = useGetlineManagerEmployeeQuery(user?.employee_code);
  const { data:lineManagerPlusOneEmployee  } = useGetlineManagerPlusOneEmployeeQuery(user?.employee_code);
  //reviewer
//   const { data: userData } = useGetEmployeeByFilterQuery(`?select=employee_code&employee_code=${user?.appraiser}`)
//   const { data: employeeDataOfReviewer } = useGetEmployeeByFilterQuery(
//     `?manager_code=${user?.appraiser}&calendar=${appCalId}&limit=800&select=${SELECT_FOR_DASHBOARD}`
// );
// const { data: data2OfReviewer } = useGetEmployeeByFilterQuery(`?select=appraisal.status,sub_section,
// section,employee.employee_agree,employee.employee_status&manager_code=${userData?.data[0]?.employee_code}&calendar=${appCalId}&limit=800`)
   
  //reviewer
  //Normalizer
  //Normalizer
  const [users, setUsers] = useState<any>([]);
  const [hideEmployeeRating, sethideEmployeeRating] = React.useState<any>(false);
  console.log(users,"employeeData")
  const checklengthinRange = (min: number, max: number) => {
    return (
      (FinalData?.filter((item: any) => {
      
        return (
          item?.normalizer?.normalizer_rating >= min &&
          item?.normalizer?.normalizer_rating <= max
          && item?.appraisal?.status == "completed"
        );
      }))
    
    );
  };
  // console.log(checklengthinRange(2.5, 2.99),"employeeDatas")
  const checkAppraisalStatusInProgress = (status: string) => {
    return FinalData?.filter((item: any) => {
      // return item?.employee?.employee_status == "employee-rejected" && item?.appraisal.status == status ;
      return item?.employee?.employee_agree == true && item?.appraisal?.status === status;
    });
  };
  const checkAppraisalStatusCompleted = (status: string) => {
    return FinalData?.filter((item: any) => {
      return item?.appraisal?.status === status &&
        (
          // item?.employee?.employee_status === 'employee-rejected'
          // || 
          item?.employee?.employee_rejection === true);
    });
  };
  const checkAppraisalinmediationStatus = (status: string) => {
    return FinalData?.filter((item: any) => {
      // return  item?.appraisal?.status === status;
      return item?.employee?.employee_agree == false && item?.appraisal?.status === status;

    });
  };
  const [titleDisplay, setTitleDisplay] = React.useState<any>("Employee Rejection");
const [headersToDisplay, setheadersToDisplay] = React.useState<any>(false);
const [headersToDisplayWhenCompleted, setheadersToDisplayWhenCompleted] = React.useState<any>(false);
const [headersToDisplayWhenInMediation, setheadersToDisplayWhenInMediation] = React.useState<any>(false);
const [headersToDisplayWhenRenormalization, setheadersToDisplayWhenRenormalization] = React.useState<any>(false);

// useEffect(() => {
// if(tabLocation === "Completed"){
//   setheadersToDisplayWhenCompleted(true)
// }else if(tabLocation === "In Re-normalization" ||tabLocation === "In Mediation" ){
//  setheadersToDisplay(true)
// }else{
//   setTitleDisplay("Rating Distribution")
// }
// }, [tabLocation])
//according to my team dashboard
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
  // console.log(checkAppraisalinmediationStatus,"inmediation1")
  useEffect(() => {
   
    if(tabLocation == "High Performers"){
     // console.log("High","employeeDatas")
     // setUsers(checklengthinRange(4, 5))
     setUsers(rangeHigh)
    }else if(tabLocation == "Good Performers"){
     // console.log("Good","employeeDatas")
     // setUsers(checklengthinRange(3, 3.99))
     setUsers(rangeGood)
    }else if(tabLocation == "Average Performers"){
     // console.log("Average","employeeDatas")
     setUsers(rangeAverage)
     // setUsers(checklengthinRange(2.5, 2.99))
    }else if(tabLocation == "Low Performers"){
     // console.log("Low","employeeDatas")
     // setUsers(checklengthinRange(1, 2.49))
     setUsers(rangeLow)
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
     }else if(tabLocation === "In Mediation"){
       setUsers(statusinmediation)
       // setUsers(checkAppraisalinmediationStatus("rejected"))
      sethideEmployeeRating(true);
     }
    
    }, [data2]);
  // useEffect(() => {
   
  //  if(selectedRatingRange == "High Performers"){
  //   console.log("High","employeeDatas")
  //   setUsers(checklengthinRange(4, 5))
  //  }else if(selectedRatingRange == "Good Performers"){
  //   console.log("Good","employeeDatas")
  //   setUsers(checklengthinRange(3, 3.99))
  //  }else if(selectedRatingRange == "Average Performers"){
  //   console.log("Average","employeeDatas")
  //   setUsers(checklengthinRange(2.5, 2.99))
  //  }else if(selectedRatingRange == "Low Performers"){
  //   console.log("Low","employeeDatas")
  //   setUsers(checklengthinRange(1, 2.49))
  //  }
     
  // }, [FinalData,selectedRatingRange]);
  // useEffect(() => {
   
  //   if(selectedRatingRange === "In-Renormalization"){
     
  //    setUsers(checkAppraisalStatusInProgress("rejected"));
  //    sethideEmployeeRating(true);
  //   }else if(selectedRatingRange === "Completed"){
  //    setUsers(checkAppraisalStatusCompleted("completed"))
  //    sethideEmployeeRating(true);
  //   }else if(selectedRatingRange === "In-Mediation"){
  //    setUsers(checkAppraisalinmediationStatus("rejected"))
  //    sethideEmployeeRating(true);
  //   }
      
  //  }, [FinalData,selectedRatingRange]);
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

  const handleOnclickBack = () =>{
    setselectedRatingRange("")
    setRatingsExpandActive(false)
  }
 const handleBack = () =>{
  navigate("/reviewer") 
  setRatingsExpandActive(false);
   
  }
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
              to={"/normalizer"}
            >
             Overall Dashboard
            </Link> */}
             <Typography 
           style={{
            fontSize: "18px",
            color: "#3e8cb5",
            fontFamily: "Arial",
            cursor:"pointer"
          }}
          color="inherit"
          onClick={()=>handleBack()}
          >
           Overall Dashboard
           </Typography>
           <Typography
            style={{
              fontSize: "18px",
              color: "#3e8cb5",
              fontFamily: "Arial",
              cursor:"pointer"
            }}
            color="text.primary"
            onClick={()=>handleBack()}
          >
            {titleDisplay}
          </Typography>
            {/* <Typography
              style={{
                fontSize: "18px",
                color: "#333333",
                fontFamily: "Arial",
                cursor:"pointer"
              }}
              color="text.primary"
              onClick={handleOnclickBack}
            >
            Overall Dashboard
            </Typography> */}
            <Typography
              style={{
                fontSize: "18px",
                color: "#333333",
                fontFamily: "Arial",
              }}
              color="text.primary"
            
            >
             {/* {selectedRatingRange} */}
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
      <AppraiserDashboardContext>
      {/* <FilteredExpandTableofOverallDashboard
      EmployeeData = {users}
      hideEmployeeRating={hideEmployeeRating}
      selectedRatingRange={selectedRatingRange}
      headersToDisplayWhenInMediation={headersToDisplayWhenInMediation}
      headersToDisplayWhenRenormalization={headersToDisplayWhenRenormalization}
      headersToDisplayWhenCompleted={headersToDisplayWhenCompleted}
      /> */}
      <FilteredExpandtable
      EmployeeData = {users}
      hideEmployeeRating={hideEmployeeRating}
      headersToDisplayWhenInMediation={headersToDisplayWhenInMediation}
      headersToDisplayWhenRenormalization={headersToDisplayWhenRenormalization}
      headersToDisplayWhenCompleted={headersToDisplayWhenCompleted}
      />
       </AppraiserDashboardContext>
      </div>
      {/* <div style={{marginTop:"25px"}}>
      <NineboxandTopPerformance/>
      </div> */}
    </div>
   
  );
}
