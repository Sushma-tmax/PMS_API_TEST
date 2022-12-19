import React, { useState, useEffect } from 'react'

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Stack, Tab, Tabs, Box, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Link, useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import TablePagination from "@mui/material/TablePagination";
import { useGetEmployeeByFilterQuery, useGetEmployeeQuery } from '../../service';
import { EMPLOYEE_LANDING, MIDYEAR_PERFORMANCE } from '../../constants/routes/Routing';
import _ from 'lodash';
import { useLoggedInUser } from '../../hooks/useLoggedInUser';


const ViewEmployeeListPage = () => {

    const Mytable = styled("div")({
        background: "#FFFFFF",
        marginLeft: "25px",
        marginRight: "25px",
    });
    const Tabstyles = styled("div")({
        marginLeft: "20px",
        marginTop: "45px",
        marginRight: "20px",
        "& .MuiButtonBase-root": {
            color: "#999999",
            textTransform: "none",
            fontWeight: 400,
        },
        "& .Mui-selected": {
            color: "#004C75",
        },
        "&.MuiTabs-indicator": {
            backgroundColor: "#004C75",
        },
        display: "flex",
        // justifyContent: 'space-between'
    });
    const Heading = styled("div")({
        fontSize: "18px",
        color: "#004C75",
        fontWeight: 400,
        paddingTop: "25px",
        marginLeft: "20px",
    });
    const TableContainer = styled("div")({
        //    width : "50%",
        marginTop: "-30px"
    });
    const Searchfeild = styled("div")({
        position: "absolute",
        marginLeft: "76%",
        //marginRight: '8px',
        marginTop: "10px",
        "& .MuiOutlinedInput-root": {
            height: "28px",
            width: "144px",
            borderRadius: "15px",
            background: "#F2F6F8",
            // border:'2px solid white'
        },
        "& .MuiInputLabel-root": {
            fontSize: "13px",
            color: "#306D8F",
            marginTop: "-10px",
        },
        "& .MuiOutlinedInput-input": {
            fontSize: "13px",
            color: "#306D8F",
        },
    });
    const TableHeadings = styled("div")({
        "& .MuiTableRow-head ": {
            background: "#f2f6f8",
        },
        "& .MuiTableCell-head": {
            color: "#004C75",
            padding: "0px",
            height: "30px",
            borderBottom: "2px solid white",
        },
        "& .MuiTableCell-root": {
            padding: "0px",
        },
    });
    const Names = styled("div")({
        marginLeft: "20px",
        marginTop: "10px",
        color: "#333333",
    });

    interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        value: any;
    }
    function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    const [tabValue, setTabValue] = React.useState<any>(0);
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };
    const [enteredName, setenteredName] = useState("");
    const [users, setUsers] = useState<any>([]);
    console.log(users, "gggg")
    // const { data: employeeData, refetch } = useGetEmployeeQuery("all");
    const { data: user } = useLoggedInUser();    
    // const {data: filtenrData,refetch } = useGetEmployeeByStatusQuery(filter);
    // const { data: employeeData, refetch } = useGetEmployeeQuery("all");
    const employee_code = user?.manager_code.toString()
    const { data: employeeData } = useGetEmployeeByFilterQuery(`?manager_code=%22${user?.manager_code}%22`);
    console.log(employeeData, "new")
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const navigate = useNavigate();


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    useEffect(() => {

        if (employeeData) {
            let temp = employeeData.data.filter((data: any) => data.manager_code == "1038")
            setUsers(temp);
            console.log(temp, "temp")
        }
    }, [employeeData]);

    const getPAStatus = (j: any) => {
        if (j.appraisal.objective_description.length === 0)
            return " PA Not Started"
        else if (j.appraisal.status == "completed")
            return " Completed"
        else if (j.appraisal.appraiser_status === "pending")
            return " Pending with Appraiser"
        else if (j.appraisal.appraiser_status === "draft")
            return " Draft"
        else if (j.appraisal.appraiser_status === "submited" &&
            j.reviewer.reviewer_status == "pending")
            return " Pending with Reviewer"
        else if (j.appraisal.appraiser_status === "submited" &&
            j.reviewer.reviewer_status == "accepted" && j.normalizer.normalizer_status == "pending")
            return " Pending with Normalizer"
        else if (j.appraisal.appraiser_status === "reviewer-rejected")
            return " Reviewer Rejected"
        else if (j.appraisal.appraiser_status === "normalizer-rejected")
            return " Normalizer Rejected"
        else if (j.reviewer.reviewer_status == "accepted" && j.normalizer.normalizer_status == "employee-rejected")
            return " Pending with Normalizer"
    }

    const [users1, setUsers1] = useState<any>([]);
    console.log(users1, "users1");

    useEffect(() => {
        console.log("useeffect run");
        if (employeeData) {
            setUsers1(employeeData.data);
            let appraisals = employeeData.data.filter(
                (emp: any) => emp.manager_code == "1145"
            );
            //   setMyAppraisals(appraisals);
            // console.log("myappraisals", appraisals);
        }
    }, [employeeData]);
    console.log(employeeData?.data, "ten")
    console.log(users1, "hhh")


    return (
        <Mytable>
            <Heading>Employees under Appraiser
                <br />
                <br />
                <Stack>
                    {users[0]?.manager_code}-
                    {users[0]?.manager_name}
                </Stack>
            </Heading>
            <Tabstyles>

                {/* <Tabs
                    sx={{ borderBottom: 1, borderColor: "#E3E3E3", width: "100%" }}
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label="basic tabs example"
                >
                    <Tab label="All" />
                    <Tab label="Completed" />
                    <Tab label="In Progress" />
                    <Tab label="Not Started" />
                    <Tab label="Self Rating" />
                    <Tab label="Rejected" />
                </Tabs> */}

                {/* <Searchfeild>
                    <div>
                        <TextField
                            id="outlined-basic"
                            placeholder="Search Here..."
                            onChange={(e) => setenteredName(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {/* <img src={Searchlensreview} alt="icon" /> */}
                {/* </InputAdornment> */}
                {/* ), */}
                {/* }} */}
                {/* /> */}
                {/* </div> */}
                {/* </Searchfeild>  */}
            </Tabstyles>

            {users &&
                users.map((objDesc: any, index: number) => {
                    console.log(index, tabValue, "index");

                    return (
                        <TableHeadings>
                            <TabPanel value={tabValue} index={index}>
                                <TableContainer>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left" width="10%">
                                                    <div
                                                        style={{
                                                            color: "#004C75",
                                                            fontSize: "14px",
                                                            border: "none",
                                                            background: "none",
                                                            fontFamily: "regular",
                                                            // margin:"-5px"
                                                        }}
                                                    >
                                                        <option>Employee Code</option>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="left" width="15%">
                                                    <div
                                                        style={{
                                                            color: "#004C75",
                                                            fontSize: "14px",
                                                            border: "none",
                                                            background: "none",
                                                            fontFamily: "regular",
                                                            // margin:"-5px"
                                                        }}
                                                    >
                                                        <option>Employee Name</option>
                                                    </div>
                                                </TableCell>
                                                {/* <TableCell align="left" width="15%">
                                                    <div
                                                        style={{
                                                            color: "#004C75",
                                                            fontSize: "14px",
                                                            border: "none",
                                                            background: "none",
                                                            fontFamily: "regular",
                                                            // margin:"-5px"
                                                        }}
                                                    >
                                                        <option>Position</option>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="center" width="5%">
                                                    <div
                                                        style={{
                                                            color: "#004C75",
                                                            fontSize: "14px",
                                                            border: "none",
                                                            background: "none",
                                                            fontFamily: "regular",
                                                            // margin:"-5px"
                                                        }}
                                                    >
                                                        <option>Grade</option>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="left" width="15%">
                                                    <div
                                                        style={{
                                                            color: "#004C75",
                                                            fontSize: "14px",
                                                            border: "none",
                                                            background: "none",
                                                            fontFamily: "regular",
                                                            // margin:"-5px"
                                                        }}
                                                    >
                                                        <option>Pending Action</option>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="center" width="12%">
                                                    <div
                                                        style={{
                                                            color: "#004C75",
                                                            fontSize: "14px",
                                                            border: "none",
                                                            background: "none",
                                                            fontFamily: "regular",
                                                            // margin:"-5px"
                                                        }}
                                                    >
                                                        <option>Appraiser Rating</option>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="center" width="12%">
                                                    <div
                                                        style={{
                                                            color: "#004C75",
                                                            fontSize: "14px",
                                                            border: "none",
                                                            background: "none",
                                                            fontFamily: "regular",
                                                            // margin:"-5px"
                                                        }}
                                                    >
                                                        <option>Reviewer Rating</option>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="center" width="13%">
                                                    <div
                                                        style={{
                                                            color: "#004C75",
                                                            fontSize: "14px",
                                                            border: "none",
                                                            background: "none",
                                                            fontFamily: "regular",
                                                            // margin:"-5px"
                                                        }}
                                                    >
                                                        <option>Normalizer Rating</option>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="left" width="7%">
                                                    <div
                                                        style={{
                                                            color: "#004C75",
                                                            fontSize: "14px",
                                                            border: "none",
                                                            background: "none",
                                                            fontFamily: "regular",
                                                            // margin:"-5px"
                                                        }}
                                                    >
                                                        <option>Status</option>
                                                    </div>
                                                </TableCell> */}
                                                {/*<TableCell align="left" width="5%">*/}
                                                {/*    Action*/}
                                                {/*</TableCell>*/}

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {users &&
                                                users.filter((j: any) => {
                                                    if (index === 0) {
                                                        return j;
                                                    } else if (index === 1) {
                                                        return j.appraisal.status
                                                            .toLocaleLowerCase()
                                                            .includes("completed".toLocaleLowerCase());
                                                    } else if (index === 2) {
                                                        return j.appraisal.status
                                                            .toLocaleLowerCase()
                                                            .includes("in-progress".toLocaleLowerCase());
                                                    } else if (index === 3) {
                                                        return j.appraisal.status
                                                            .toLocaleLowerCase()
                                                            .includes("not started".toLocaleLowerCase());
                                                    } else if (index === 4) {
                                                        return j.appraisal.status
                                                            .toLocaleLowerCase()
                                                            .includes("Self Rating".toLocaleLowerCase());
                                                    }
                                                })
                                                    .filter((j: any) => {

                                                        if (enteredName === "") {
                                                            return j;
                                                        } else if (
                                                            (j.legal_full_name !== undefined && j.legal_full_name
                                                                .toLocaleLowerCase()
                                                                .includes(enteredName.toLocaleLowerCase())) ||

                                                            (j.grade !== undefined && j.grade
                                                                .toLocaleLowerCase()
                                                                .includes(enteredName.toLocaleLowerCase())) ||

                                                            (j.position_long_description !== undefined && j.position_long_description
                                                                .toLocaleLowerCase()
                                                                .includes(enteredName.toLocaleLowerCase())) ||


                                                            (j.appraisal.status !== undefined && j.appraisal.status
                                                                .toLocaleLowerCase()
                                                                .includes(enteredName.toLocaleLowerCase()))

                                                        ) {
                                                            return j;
                                                        }
                                                    }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

                                                    .map((j: any) => {
                                                        console.log(j.appraisal.status, "index");

                                                        return (
                                                            <TableRow>
                                                                <TableCell align="left">{j.employee_code}</TableCell>
                                                                <TableCell component="th" scope="row">
                                                                    <div
                                                                        // to={`${CREATE_APPRAISAL}/employee/${j._id}`}

                                                                        onClick={() => navigate(`${EMPLOYEE_LANDING}/employee/${j._id}`)}
                                                                    >
                                                                        <Stack
                                                                            direction="row"
                                                                            alignItems="baseline"
                                                                        >

                                                                            <Names sx={{ color: "#52C8F8" }}>
                                                                                {j.legal_full_name}</Names>
                                                                        </Stack>
                                                                    </div>
                                                                </TableCell>


                                                                {/* <TableCell align="left">{j.position_long_description}</TableCell>
                                                                <TableCell align="center">{j.grade}</TableCell>
                                                                <TableCell align="left">
                                                                    {getPAStatus(j)}
                                                                    {/* {getPAStatus(j)} */}
                                                                {/* </TableCell>  */}
                                                                {/* <TableCell align="center">
                                                                    {j.appraisal.appraiser_rating}
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    {j.reviewerIsDisabled ? (
                                                                        j.reviewer.reviewer_rating
                                                                    ) : (
                                                                        <p> - </p>
                                                                    )}
                                                                </TableCell> */}
                                                                {/* <TableCell align="center">
                                                                    {j.normalizerIsDisabled ? (
                                                                        j.normalizer.normalizer_rating
                                                                    ) : (
                                                                        <p> - </p>
                                                                    )}
                                                                </TableCell> */}
                                                                {/* <TableCell align="left">
                                                                    {j.appraisal.status ? (
                                                                        <p>{j.appraisal.status}</p>
                                                                    ) : (
                                                                        <p>Not Started </p>
                                                                    )}
                                                                </TableCell> */}
                                                                {/*<TableCell>*/}
                                                                {/*    <button onClick={approvePA.bind(this, j)}>*/}
                                                                {/*        Approve*/}
                                                                {/*    </button>*/}
                                                                {/*    <button onClick={rejectPA.bind(this, j)}>*/}
                                                                {/*        Reject*/}
                                                                {/*    </button>*/}
                                                                {/*</TableCell>*/}

                                                            </TableRow>
                                                            // </ExpandableTableRow>
                                                        );
                                                    })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                sx={{
                                    "& .MuiTablePagination-selectLabel": {
                                      fontFamily: "Arial",
                                      fontSize: "14px",
                                      color: "#333333",
                                    },
                                  }}
                                    style={{ display: "block" }}
                                    rowsPerPageOptions={[5, 10, 25, 100]}
                                    component="div"
                                    count={users.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </TabPanel>
                        </TableHeadings>
                    );
                })}
        </Mytable>
    );



}

export default ViewEmployeeListPage