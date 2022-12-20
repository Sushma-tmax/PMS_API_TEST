import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
     useGetEmployeeByFilterQuery,
} from "./../../../service";

const percentage = 60;

const arr = ['One', "two ", 'three']



function CircuarProgressbar() {

    //const { data: data2 } = useGetEmployeeByFilterQuery(`?manager_code=${user?.employee_code}&select=appraisal.status,normalizer.normalizer_status`)
    const { data: data2 } = useGetEmployeeByFilterQuery(
        `?select=appraisal.status&limit=800`
    )

    const [users, setUsers] = useState<any>([]);
    const [completed, setcompleted] = React.useState<any>(0);
    const [inprogress, setinprogress] = React.useState<any>(0);
    useEffect(() => {
        // let temp = employeeData.data.filter((data: any) => data.manager_code == "1038")
        setUsers(data2?.data);

    }, [data2]);
    // useEffect(() => {
    //   let temp = users?.filter((data: any) => {
    //     return (data.appraisal.status == "completed" && data.normalizer.normalizer_status == "re-normalized")

    //   })
    //   if (temp && temp?.length)
    //     setcompleted(temp?.length)
    //   let temp2 = users?.filter((data: any) => data.appraisal.status == "rejected")
    //   setinprogress(temp2?.length)
    // }, [data2]);

    const checkAppraisalStatus = (status: string) => {
        return data2?.data?.filter((item: any) => {
            return item?.appraisal?.status === status;
        }).length;
    };
    useEffect(() => {
        setcompleted(checkAppraisalStatus("completed"))
        setinprogress(checkAppraisalStatus("in-progress"))
    }, [data2]);
    return (
        <div style={{ width: "65%", height: 30, }}>
            <CircularProgressbar
                strokeWidth={20}
                maxValue={data2?.data?.length}
                value={completed}
                // text={`${percentage}%`}
                text={`${completed}`}
                styles={buildStyles({
                    textColor: "#000",
                    pathColor: "#00b050",
                    //trailColor: "#808080",
                    trailColor: completed !== 0 ? "#F6C609" : "#808080"

                })}
            />
        </div>
    );
}
export default CircuarProgressbar;
