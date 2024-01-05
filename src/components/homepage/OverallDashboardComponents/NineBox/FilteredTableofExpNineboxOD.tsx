import * as React from "react";
import Grid from "@mui/material/Grid";
import { Container, Box, IconButton,Breadcrumbs,TextField,InputAdornment } from "@mui/material";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { useGetEmployeeByFilterQuery,useGetActiveCalenderQuery, useGetReviewerEmployeeByFilterQuery } from "../../../../service";
import Timelinerevview from "../../../reviewer/Dashboard/Timelinerevview";
import FilteredTableofExpNinebox from "../../MyTeamDashboardComponents/NineBox/FilteredTableofExpNinebox";
import NineboxandTopPerformance from "../../MyTeamDashboardComponents/NineboxandTopPerformance";
import { useLoggedInUser } from "../../../../hooks/useLoggedInUser";
import { useState, useRef, useEffect } from "react";
import Searchicon from "../../../../assets/Images/Searchicon.svg";
import FilteredTableofExpNineboxODChild from "./FilteredTableofExpNineboxODChild";


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
export default function FilteredTableofExpNineboxOD(props: any) {
    const{indexBasedValue,indexBasedTitle,employeeData1,setSolidperformersExpandActive}=props;
  const location: any = useLocation();
console.log(employeeData1,"employeeData1")
  const tabLocation = location?.state?.selectName;
   console.log(location, "tabLocation");
  console.log(location?.state?.indexBasedValue,indexBasedValue, "indexBasedValue");
  const { data: activecalendardata, isLoading: isTitleLoading } = useGetActiveCalenderQuery('')

  const { data: user } = useLoggedInUser();
  const navigate = useNavigate();
 
  console.log(user, "idss")
  const [employee, setEmployee] = React.useState<any>(`636cb1a7960b1548b80ff785`);

  const [appCalId, setappCalId] = React.useState<any>(`636cb1a7960b1548b80ff785`);
  const SELECT_FOR_DASHBOARD = `employee_code,legal_full_name,position_long_description,grade,
  division,appraiser_name,reviewer_name,normalizer_name,appraisal.potential,manager_code,manager_name,manager_position,work_location
  section,sub_section,appraisal.appraiser_rating,reviewer.reviewer_rating,first_name,
  normalizer.normalizer_rating,appraisal.status, service_reference_date,isSupervisor,email,function,
  appraisal.appraiser_status,reviewer.reviewer_status,overall_rating,normalizer.normalizer_status,reviewer.rejection_count,
  appraisal.objective_description,reviewerIsDisabled,pa_status,employee.employee_rating`

  // let navigationFrom = "Appraiser";
  React.useEffect(() => {
    if (activecalendardata?.data[0]?._id !== undefined) {
      setappCalId(activecalendardata?.data[0]?._id)
    }

  }, [activecalendardata])
  //Appraiser
  const { data: employeeData } = useGetEmployeeByFilterQuery(
    `?&calendar=${appCalId}&limit=800&select=${SELECT_FOR_DASHBOARD}`
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
   //console.log(employee,"employee")
  //getting employee details
  useEffect(() => {
  const employeeDetails = employeeData1?.filter((i:any)=>{
    return i?.legal_full_name == indexBasedTitle
  })
  setUsers(employeeDetails);

  //console.log(employeeDetails, "employeeDetails")
  }, [employeeData,indexBasedValue])
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
  const handleBack = () =>{
    setSolidperformersExpandActive(false);
    navigate("/normalizer") 
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
              to={"/reviewer"}
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
                color: "#333333",
                fontFamily: "Arial",
              }}
              color="text.primary"
            >
             {indexBasedTitle  == "" || indexBasedTitle == undefined ?  "9-Box Grid" : indexBasedTitle} 
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
      <FilteredTableofExpNineboxODChild
      EmployeeData = {users}
      hideEmployeeRating={hideEmployeeRating}
      AllEmployee={indexBasedValue}
      />
      </div>


      {/* <div style={{marginTop:"25px"}}>
      <NineboxandTopPerformance/>
      </div> */}
    </div>
  );
}
