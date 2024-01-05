import React from 'react'
import {
    Typography,
    IconButton,
    Popover,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useGetEmployeeAppraisalQuery, useGetObjectiveTitleQuery } from '../../../../service';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Infoicon from "../../../../assets/Images/Infoicon.svg";
import { useState } from 'react';


const EmployeeTrainingRecommendation = () => {
    const { employee_id } = useParams();
    const [training1, setTraining1] = useState<any>([]);
    const [popoverIndex, setPopoverIndex] = useState<any>("");
    const [anchorEl1, setAnchorEl1] = useState<HTMLButtonElement | null>(null);
    const openInfo1 = Boolean(anchorEl1);
    const id1 = openInfo1 ? "simple-popover" : undefined;
    const { data: employeeData, refetch: fetchCancel, isLoading } =  useGetEmployeeAppraisalQuery(employee_id);
    const { data: objectiveTitleData, isLoading: isTitleLoading } =  useGetObjectiveTitleQuery("");

    const handleClickInfo1 = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl1(event.currentTarget);
    };

    const handleCloseInfo1 = () => {
        setAnchorEl1(null);
    };

    const findTrainingName = (id: any) => {
        if (employeeData) {
            return employeeData?.data?.appraisal_template?.training_recommendation.find((i: any) =>
                i.name._id == id);
        }
    }

    console.log(training1,'training1')

    useEffect(() => {
        if (employeeData) {
            setTraining1(() => {
                return employeeData?.data?.employee?.training_recommendation?.map(
                    (i: any) => {
                        console.log(i, "Training1");
                        return {
                            ...i,
                            name: findTrainingName(i.name),
                            justification: i.justification,
                            trainingName: i.training_name,
                            // objective_title: findObjectiveTitleById(i.name.objective_title),
                            // objective_type: findObjectiveTypeById(i.name.objective_type),
                        };
                    }
                );
            });
        }
    }, [employeeData]);

    return (
        <>
           {training1.length !== 0 && training1.length !== undefined && (
             <>
             <Typography
                 style={{
                     paddingTop: "20px",
                     color: "#717171",
                     fontSize: "16px",
                     fontFamily: "Arial",
                 }}
             >
                 <b> Training Recommendations (Employee)</b>
             </Typography>
             <Table size="small" style={{ marginTop: "10px" }}>
                 <TableHead>
                     <TableRow
                         sx={{
                             "& td, & th": {
                                 border: "1px solid #e0e0e0",
                                 bgcolor: "#eaeced",
                             },
                         }}
                     >
                         <TableCell
                             align="center"
                             style={{
                                 border: "1px solid #e0e0e0",
                                 fontFamily: "Arial",
                                 color: "#3E8CB5",
                                 fontSize: "14px",
                                 fontWeight: "600",
                             }}
                         >
                             Training Category
                         </TableCell>
                         <TableCell
                             align="center"
                             style={{
                                 border: "1px solid #e0e0e0",
                                 fontFamily: "Arial",
                                 color: "#3E8CB5",
                                 fontSize: "14px",
                                 fontWeight: "600",
                             }}
                         >
                             Training Name
                         </TableCell>
                         <TableCell
                             align="center"
                             style={{
                                 border: "1px solid #e0e0e0",
                                 fontFamily: "Arial",
                                 color: "#3E8CB5",
                                 fontSize: "14px",
                                 fontWeight: "600",
                             }}
                         >
                             Justification
                         </TableCell>
                     </TableRow>
                 </TableHead>
                 <TableBody>
                     {employeeData &&
                         objectiveTitleData &&
                         training1.map((j: any, index: any) => {
                             return (
                                 <>
                                     <TableRow
                                         sx={{
                                             "& td, & th": {
                                                 border: "1px solid #e0e0e0",
                                             },
                                         }}
                                     >
                                         <TableCell
                                             width="160px"
                                             align="left"
                                             style={{
                                                 fontSize: "14px",
                                                 color: "#333333",
                                                 fontFamily: "Arial",
                                                 wordBreak: "break-word"
                                             }}
                                         > <IconButton
                                         // aria-describedby={id2}
                                         onClick={(e: any) => {
                                             handleClickInfo1(e)
                                             setPopoverIndex(index);
                                         }}

                                     // style={{marginRight:"5px"}}
                                     >
                                         <img width="12px" src={Infoicon} alt="icon" />
                                     </IconButton>
                                             {j?.name?.name?.title}
                                            
                                             <Popover
                                                 id={id1}
                                                 open={(popoverIndex === index) && openInfo1}
                                                 anchorEl={anchorEl1}
                                                 onClose={handleCloseInfo1}
                                                 anchorOrigin={{
                                                     vertical: "bottom",
                                                     horizontal: "left",
                                                 }}
                                                 transformOrigin={{
                                                     vertical: "top",
                                                     horizontal: "left",
                                                 }}
                                                 PaperProps={{
                                                     style: {
                                                         backgroundColor: "FEFCF8",
                                                         boxShadow: "none",
                                                         maxWidth: "400px",
                                                         borderRadius: "5px",
                                                     },
                                                 }}
                                                 sx={{
                                                     // width: "60%",
                                                     "& .MuiPopover-paper": {
                                                         border: "1px solid #3e8cb5",
                                                         backgroundColor: "#ffffff",
                                                         // width:"30%"
                                                     },
                                                 }}
                                             >
                                                 <Typography
                                                     style={{
                                                         fontSize: "12px",
                                                         fontFamily: "arial",
                                                         padding: "5px",
                                                     }}
                                                 >


                                                     {j?.name?.name?.definition}
                                                 </Typography>
                                             </Popover>
                                         </TableCell>
                                         <TableCell
                                             width="200px"
                                             align="left"
                                             style={{
                                                 fontSize: "14px",
                                                 color: "#333333",
                                                 fontFamily: "Arial",
                                                 wordBreak: "break-word"
                                             }}
                                         >
                                             {j.training_name}
                                         </TableCell>
                                         <TableCell
                                             width="300px"
                                             align="left"
                                             style={{
                                                 fontSize: "14px",
                                                 color: "#333333",
                                                 fontFamily: "Arial",
                                                 wordBreak: "break-word"
                                             }}
                                         >
                                             {j.justification}
                                         </TableCell>
                                     </TableRow>
                                 </>
                             );
                         })}
                 </TableBody>
             </Table>
         </>
           )}
        </>
    )
}

export default EmployeeTrainingRecommendation