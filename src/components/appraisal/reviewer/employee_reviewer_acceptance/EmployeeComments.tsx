import React from 'react'
import {
    Typography,
    TextField,
    styled,
} from "@mui/material";
import { useParams } from 'react-router-dom';
import { useGetEmployeeAppraisalQuery } from '../../../../service';


const Tf11 = styled("div")({
    "& .MuiInputBase-input": {
        color: "#333333",
        fontSize: "14px",
        fontFamily: "arial",
        fontWeight: "400",
        textTransform: "none",
        // padding: "4px",
        textAlign: "left"
    },
});

const EmployeeComments = () => {

    const { employee_id } = useParams();
    const { data: employeeData, refetch: fetchCancel, isLoading } = useGetEmployeeAppraisalQuery(employee_id);

//  to convert date dd/mm/yyyy format to mm/dd/yyyy
const date = new  Date(employeeData?.data?.employee?.one_to_one_meeting?.slice(0,10));
const One_To_One_Meeting_Date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    return (
        <>

           {employeeData?.data?.employee?.comments !== "" && 
          employeeData?.data?.employee?.comments !== undefined && (
        <>
         <Typography
                style={{
                    fontSize: "16px",
                    color: "#717171",
                    paddingTop: "20px",
                    paddingBottom: "10px",
                    fontFamily: "Arial"
                }}
            >
                <b>Employee Comments</b>
            </Typography>
            <Tf11>
                <TextField
                    fullWidth
                    InputProps={{ readOnly: true, }}
                    multiline
                    inputProps={{ maxLength: 500 }}
                    size="small"
                    value={employeeData?.data?.employee?.comments}
                />
            </Tf11>
        </>
           )}
       

            {(employeeData?.data?.employee?.one_to_one_meeting !== "" &&
               employeeData?.data?.employee?.one_to_one_meeting !== null &&
               employeeData?.data?.employee?.one_to_one_meeting !== undefined) && (  
       <>
         <Typography
             style={{
                 fontSize: "16px",
                 color: "#717171",
                 paddingTop: "20px",
                 paddingBottom: "10px",
                 fontFamily: "Arial"
             }}
         >
             <b>One-to-One Meeting Date</b>
         </Typography>
         <Tf11>
             <TextField
                 fullWidth
                 InputProps={{ readOnly: true, }}
                 multiline
                 inputProps={{ maxLength: 500 }}
                 size="small"
                 value={One_To_One_Meeting_Date}
             />
         </Tf11>
       </>
       )}
     </>
    )
}

export default EmployeeComments