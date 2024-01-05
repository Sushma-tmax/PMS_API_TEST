import * as React from "react";
import Grid from "@mui/material/Grid";
import { Container, Box, IconButton,Breadcrumbs,TextField,InputAdornment } from "@mui/material";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { useGetEmployeeByFilterQuery,useGetReviewerEmployeeByFilterQuery } from "../../../../service";
import { useLoggedInUser } from "../../../../hooks/useLoggedInUser";
import { useState, useRef, useEffect } from "react";
// import Searchicon from "../../assets/Images/Searchicon.svg";
import { useGetNineboxQuery } from "../../../../service/ninebox/ninebox";
import FilteredTableofExpNinebox from "../../MyTeamDashboardComponents/NineBox/FilteredTableofExpNinebox";
import { useGetPreviousAppraisalEmployeeByFilterQuery } from "../../../../service/employee/previousAppraisal";
// import { useGetNineboxQuery } from "../../service/ninebox/ninebox";
import FilteredTableofExpNineboxClosed from "./FilteredTableofExpNineboxClosed";

const Searchfeild = styled("div")({
  // marginLeft: "auto",
  // marginRight: "8px",
  marginTop: "8px",
  "& .MuiOutlinedInput-root": {
    height: "30px",
    width: "100%",
    borderRadius: "25px",
    background: "#F2F6F8",
    // border:'2px solid white'
  },
  "& .MuiInputLabel-root": {
    fontSize: "12px",
    color: "#D5D5D5",
    marginTop: "-10px",
  },
  "& .MuiOutlinedInput-input": {
    fontSize: "12px",
    color: "#333333",
    opacity: "70%",
  },
  "& .MuiTextField-root": {
    minWidth: "100%",
    //   paddingLeft: "10px",
    //   paddingRight: "10px"
  },
});
export default function FilteredTableofAppraiserExpNineBoxClosed(props: any) {
  
  const location: any = useLocation();

  const tabLocation = location?.state?.selectName;
   console.log(location, "tabLocation");
   console.log(location?.state?.selectName, "newone");
  // console.log(location?.state?.indexBasedValue, "indexBasedValue");
  const CalendarName=location?.state?.valueOfActiveCalender
  const { data: user } = useLoggedInUser();
  const navigate = useNavigate();
 
  console.log(user, "idss")
  const [employee, setEmployee] = React.useState<any>(`636cb1a7960b1548b80ff785`);

  const [appCalId, setappCalId] = React.useState<any>(`636cb1a7960b1548b80ff785`);
  const SELECT_FOR_DASHBOARD = `employee_code,legal_full_name,position_long_description,grade,
  division,appraiser_name,reviewer_name,normalizer_name,appraisal.potential,manager_code,manager_name,manager_position,work_location
  section,sub_section,appraisal.appraiser_rating,reviewer.reviewer_rating,first_name,
  normalizer.normalizer_rating,appraisal.status,overall_rating,talent_category, service_reference_date,isSupervisor,email,function,
  appraisal.appraiser_status,reviewer.reviewer_status,normalizer.normalizer_status,reviewer.rejection_count,
  appraisal.objective_description,reviewerIsDisabled,pa_status,employee.employee_rating`

  // let navigationFrom = "Appraiser";
  React.useEffect(() => {
    if (user?.calendar?._id !== undefined) {
      setappCalId(user?.calendar?._id)
    }

  }, [user])
  //Appraiser
  const { data: employeeData } = useGetPreviousAppraisalEmployeeByFilterQuery(
    `?manager_code=${user?.employee_code}&calendar=${appCalId}&limit=800&select=${SELECT_FOR_DASHBOARD}`
  );
  const { data: data2 } = useGetEmployeeByFilterQuery(`?select=appraisal.status,employee.employee_agree,section,first_name,sub_section,employee.employee_status&manager_code=${user?.employee_code}&calendar=${appCalId}&limit=800`)
  //Appraiser
  //console.log(employeeData, "employeeDetails")
  const [users, setUsers] = useState<any>([]);
    const [enteredName, setenteredName] = useState("");

  console.log(users, "employeeDetails")
  const [hideEmployeeRating, sethideEmployeeRating] = React.useState<any>(false);
  
  useEffect(()=>{
  
    setEmployee(location?.state?.indexBasedValue);
   },[location])
   console.log(employee,"employee")
  //getting employee details
  useEffect(() => {
  const employeeDetails = employeeData?.data?.filter((i:any)=>{
    console.log(i?.legal_full_name,"new")
    console.log(i?.legal_full_name == tabLocation)
    return i?.legal_full_name == tabLocation
  })
  setUsers(employeeDetails);

  //console.log(employeeDetails, "employeeDetails")
  }, [employeeData])
  // console.log(employeeData?.data)
   //getting employee details

//   const checklengthinRange = (min: number, max: number) => {
//     return (
//       (employeeData?.data?.filter((item: any) => {
      
//         return (
//           item?.normalizer?.normalizer_rating >= min &&
//           item?.normalizer?.normalizer_rating <= max
//           && item?.appraisal?.status == "completed"
//         );
//       }))
    
//     );
//   };
//   console.log(checklengthinRange(2.5, 2.99),"employeeDatas")

  //Check the name from the location.state and filter
  // the employee data with that name(name is from solid talents)
  //and send to the table
//   useEffect(() => {
   
//    if(tabLocation == "High Performers"){
   
//    }else if(tabLocation == "Good Performers"){
   
//    }else if(tabLocation == "Average Performers"){
   
//    }else if(tabLocation == "Low Performers"){
   
//    }
     
//   }, [employeeData]);
//   useEffect(() => {
   
//     if(tabLocation === "InProgress"){
     
    
//     }else if(tabLocation === "Completed"){
     
//     }else if(tabLocation === "Inmediation"){
    
//     }
      
//    }, [data2]);
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
            <Typography
              style={{
                fontSize: "18px",
                color: "#3e8cb5",
                cursor:"pointer",
                fontFamily: "Arial",
              }}
              color="inherit"
              
              // to={"/ClosedcalendarDashboardAppraiser"}
              onClick={() => {
                navigate(-1)
              }}
            >
             Previous PA
            </Typography>
            <Typography
              style={{
                fontSize: "18px",
                color: "#333333",
                fontFamily: "Arial",
              }}
              color="text.primary"
            >
              {/* {"9Box Grid"} */}
             { location?.state?.indexBasedTitle == "" || location?.state?.indexBasedTitle ==  undefined ? "9-Box Grid" : location?.state?.indexBasedTitle }
             {/* {tabLocation} */}
            </Typography>
          </Breadcrumbs>
        </Stack>
         {/* <Searchfeild>
        <TextField
          id="outlined-basic"
          autoComplete="off"
          placeholder="Search Here..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={Searchicon} alt="icon" />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setenteredName(e.target.value)}
        />
      </Searchfeild>
         {location?.state?.indexBasedValue?.map((i: any, index: number) => {
          // console.log(i,"iii")
          return(
            <Stack padding="8px" borderBottom="1px solid #d5d5d5" direction="row" spacing={3}>

              <Typography
                style={{
                  fontSize: "16px",
                  fontFamily: "Arial",
                  color: "#333333",
                  opacity: "80%"
                }}
              >
                {index + 1}
              </Typography>
              <Typography
                style={{
                  fontSize: "16px",
                  fontFamily: "Arial",
                  wordBreak: "break-word",
                  color: "#333333",
                  opacity: "80%",
                  cursor:"pointer"
                }}
                // onClick={(e) => {handleNavigationForNineBoxEmployee(i?.legal_full_name)}}
              >
                {i?.legal_full_name}
              </Typography>
            </Stack>
          )
        })
        } */}







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
      <FilteredTableofExpNineboxClosed
      CalendarName={CalendarName}
      EmployeeData = {users}
      hideEmployeeRating={hideEmployeeRating}
      AllEmployee={location?.state?.indexBasedValue}
      />
      </div>


      {/* <div style={{marginTop:"25px"}}>
      <NineboxandTopPerformance/>
      </div> */}
    </div>
  );
}
