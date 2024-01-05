import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  useGetEmployeeByFilterQuery,
  useGetEmployeeQuery,
} from "../../../service";
import { useLoggedInUser } from "../../../hooks/useLoggedInUser";

const percentage = 60;

const arr =  ['One', "two ", 'three']



function CircuarProgressbar() {
  const { data: user } = useLoggedInUser();
  
  const { data: employeeData, refetch } = useGetEmployeeQuery("all");
  const {data: data2} = useGetEmployeeByFilterQuery("?manager_code=\"1038\"")
  console.log(data2,'data2')
  const [users, setUsers] = useState<any>([]);
  const [completed, setcompleted] = React.useState<any>(0);
  const [inprogress, setinprogress] = React.useState<any>(0);
  console.log(users,'rejectedusers')
  useEffect(() => {
    console.log("useeffect run");
    if (employeeData) {
        // let temp = employeeData.data.filter((data: any) => data.manager_code == "1038")
        setUsers(data2?.data);
        console.log(data2, "temp")
    }
}, [employeeData]);
// useEffect(() => {
//   console.log("useeffect run");
//   let temp = users.filter((data: any) => {
//     console.log(data.appraisal.status,'ddddddd')
//   return( data.appraisal.status == "completed" && data.normalizer.normalizer_status == "re-normalized")
 
// })
//   console.log(temp,temp.length,'useeffect temp')
//   if (temp && temp?.length)
//   setcompleted(temp.length)
//   let temp2 = users.filter((data: any) => data.appraisal.status == "rejected" )
//   console.log(temp2,temp2.length,'useeffect temp2')
//   setinprogress(temp2.length)
// }, [employeeData]);
//latest update
const [myAppraisals, setMyAppraisals] = useState<any>([]);
useEffect(() => {
  console.log("useeffect run");
  if (employeeData) {
   
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

    // console.log("myappraisals", "appraisals");
  }
}, [employeeData]);

const checkAppraisalStatus = (status: string) => {
  return myAppraisals?.filter((item: any) => {
    return item?.appraisal?.status === status;
  })?.length;
};
useEffect(() => {
  setcompleted(checkAppraisalStatus("completed"))
  setinprogress(checkAppraisalStatus("in-progress"))
}, [employeeData]);
  return (
    <div  style={{ width: "65%", height: 30, }}>
      <CircularProgressbar
      strokeWidth={20}
      
        value={completed}
        // text={`${percentage}%`}
        // text={`${percentage}`}
        text={`${completed}`}
        styles={buildStyles({
          textColor: "#000",
          pathColor: "#00b050",
          trailColor: completed !== 0 ? "#F6C609" : "#808080"

         
          
        })}
      />
    </div>
  );
}
export default CircuarProgressbar;
