import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import {
    Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useGetEmployeeAppraisalQuery,} from '../../../../service';
import { useParams } from 'react-router-dom';
import _ from "lodash";


const EmployeeSpecificArea = () => {
    const { employee_id } = useParams();
    const { data: employeeData, refetch: fetchCancel, isLoading } =  useGetEmployeeAppraisalQuery(employee_id);
    const [specificAction1, setspecificAction1] = useState<any>(false);
    const [filterData2, setFilterData2] = useState([]);
    const [employeeAreaofImprovement, setEmployeeAreaofImprovment] =  useState<any>([]);


    useEffect(() => {
        if (employeeData?.data?.employee?.area_of_improvement) {
    
          if (employeeData?.data?.employee?.area_of_improvement[0] == '' || employeeData?.data?.employee?.area_of_improvement[0] == undefined) {
            setspecificAction1(false);
          } else {
            setspecificAction1(true);
          }
          console.log(employeeData?.data?.employee?.area_of_improvement, "areaofimprovement")
        }
      }, [employeeData])

      const groupNAmeHandler2 = (name: any) => {
        if (name) {
          setFilterData2(name);
        }
      };

      useEffect(() => {
        if (employeeData && employeeData.data) {
          const employeeAreaOfImprovement =
            employeeData?.data?.employee?.area_of_improvement;
          const group = _.groupBy(employeeAreaOfImprovement, "value");
          const groupName = groupNAmeHandler2(Object.entries(group));
        }
      }, [employeeData, employeeAreaofImprovement]);

    return (
        <>
            {specificAction1 && (
                <>
                    <Typography
                        style={{
                            paddingTop: "20px",
                            color: "#717171",
                            fontSize: "16px",
                            fontFamily: "Arial",
                        }}
                    >
                        <b> Areas for Improvement (Employee)</b>
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
                                    Specific Areas
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
                                    Specific Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {filterData2 &&
                                filterData2.map((i: any, index: any) => {
                                    console.log(i, "123");
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
                                                    align="left"
                                                    width="140px"
                                                    style={{
                                                        fontSize: "14px",
                                                        color: "#333333",
                                                        fontFamily: "Arial",
                                                        wordBreak: "break-word",
                                                    }}
                                                >
                                                    {i[0]}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    width="450px"
                                                    style={{
                                                        fontSize: "14px",
                                                        color: "#333333",
                                                        fontFamily: "Arial",
                                                        wordBreak: "break-word",
                                                    }}
                                                >
                                                    {/* <p>{employeeData?.data?.appraisal?.area_of_improvement[0]?.specific_actions[0]?.value}</p>
              <p>{employeeData?.data?.appraisal?.area_of_improvement[0]?.specific_actions[1]?.value}</p>
              <p>{employeeData?.data?.appraisal?.area_of_improvement[0]?.specific_actions[2]?.value}</p> */}
                                                    {filterData2 &&
                                                        filterData2.map((i: any, ix: any) => {
                                                            return i[1].map((j: any, jx: any) => {
                                                                return j.specific_actions.map(
                                                                    (k: any, ix1: any) => {
                                                                        if (index === ix && k.value)
                                                                            return (
                                                                                <p>
                                                                                    {k.value}
                                                                                    <br />
                                                                                </p>
                                                                            );
                                                                    }
                                                                );
                                                            });
                                                        })}
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

export default EmployeeSpecificArea