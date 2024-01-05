import * as React from "react";
import { useState, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid } from "@mui/material";
import { Stack, Tab, Tabs, Box, Typography } from "@mui/material";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { TextField } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import {
  useAcceptReviewerMutation,
  useGetEmployeeByStatusQuery,
  useGetEmployeeQuery,
} from "../../service";
import { useEffect } from "react";
import { CREATE_APPRAISAL } from "../../constants/routes/Routing";
import UpDown from "../../assets/Images/UpDown.svg";
import Opennew from "../../assets/Images/Opennew.svg";
import Application from "../../assets/Images/Application.svg";
import Searchlens from "../../assets/Images/Searchlens.svg";
import Eye from "../../assets/Images/Eye.svg";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Checkbox from '@mui/material/Checkbox';


const Mytable = styled("div")({
  background: "#FFFFFF",
  marginLeft: "20px",
  marginRight: "20px",
});
const Tabstyles = styled("div")({
  marginLeft: "20px",
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

//@ts-ignore
const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <>
      <TableRow {...otherProps}>
        <TableCell padding="checkbox">
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {children}
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell padding="checkbox" />
          {expandComponent}
        </TableRow>
      )}
    </>
  );
};

const checkboxHandler = (event: any) => {
  console.log(event.target.value)
}


const MyTeamreviewer = (props: any) => {
  const { startAppraisal } = props;
  const [acceptReviewer] = useAcceptReviewerMutation()
  const [tabValue, setTabValue] = React.useState<any>(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log("handle change run");
    console.log(newValue, "index check");
    setTabValue(newValue);
  };

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [users, setUsers] = useState<any>([]);
  const [filter, setFilter] = React.useState("");
  const [employee, setEmployee] = React.useState([]);
  const [enteredName, setenteredName] = useState("");
  console.log(users, "users");

  // const {data: filterData,refetch } = useGetEmployeeByStatusQuery(filter);
  const { data: employeeData, refetch } = useGetEmployeeQuery("all");
  console.log(employeeData, "hi");
  useEffect(() => {
    console.log("useeffect run");
    if (employeeData) {
      setUsers(employeeData.data);
    }
  }, [employeeData]);


  const checkboxHandler = (checkbox: any) => {
    if (checkbox) {
      const res = checkbox.filter((i: any) => {
        return i.reviewerIsChecked === true;
      });
      return res;
    }
  };


  const checkboxIdHandler = (res: any) => {
    if (res) {
      const check = res.map((i: any) => {
        return i._id
      })
      console.log(check, 'check')
      return check;
    }
  };
  const handleOnCheck = (e: any) => {

    const { name, checked } = e.target;
    console.log(name, checked, "checked");
    const tempUser = users.map((j: any) => {
      console.log(j.reviewerIsChecked, 'jjjjjjjjjjj')
      return j._id === name
        ? { ...j, reviewerIsChecked: checked }
        : j;
    });
    setUsers(tempUser);
    console.log(tempUser, "temp");

  };


  // const filterEmployee = (filterBy: any) => {
  //     return employeeData.filter((i: any) => {
  //         i.appraisal.status === filterBy
  //     })
  // }

  return (
    <Mytable>
      <Heading>My Team</Heading>
      <Tabstyles>


        <Tabs
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

          <Stack
            spacing={2}
            direction="row"
            paddingLeft="340px"
            paddingBottom="14px"
          >
            <Button
              style={{
                textTransform: "none",
                backgroundColor: "#3C8BB5",
                fontSize: "16px",
                fontFamily: "regular",
                padding: "6px 30px",
                borderRadius: "7px",
                color: "#fff",
              }}
              onClick={() => {
                acceptReviewer({ id: checkboxIdHandler(checkboxHandler(users)) });
              }}
              variant="contained"
            >
              Approve All
            </Button>
            <Button
              style={{
                textTransform: "none",
                backgroundColor: "#3C8BB5",
                fontSize: "16px",
                fontFamily: "regular",
                padding: "6px 30px",
                borderRadius: "7px",
                color: "#fff",
              }}
              variant="contained"
            >
              Reject
            </Button>
            <Button
              style={{
                textTransform: "none",

                fontSize: "16px",
                fontFamily: "regular",
                padding: "6px 30px",
                borderRadius: "7px",
                color: "#3C8BB5",
              }}

              variant="outlined">Cancel</Button>
          </Stack>
        </Tabs>

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
                        <TableCell padding="checkbox" />
                        <TableCell align="left">Employee</TableCell>
                        <TableCell align="left" width="300px">
                          Position
                        </TableCell>
                        <TableCell align="center" width="280px">
                          Grade
                        </TableCell>
                        <TableCell align="left">Status</TableCell>
                        <TableCell align="center">View PA</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users &&
                        users
                          .filter((j: any) => {
                            if (index === 0) {
                              return j;
                            } else if (index === 1) {
                              return j.appraisal.status
                                .toLocaleLowerCase()
                                .includes("completed".toLocaleLowerCase());
                            } else if (index === 2) {
                              return j.appraisal.status
                                .toLocaleLowerCase()
                                .includes("In Progress".toLocaleLowerCase());
                            } else if (index === 3) {
                              return j.appraisal.status
                                .toLocaleLowerCase()
                                .includes("Not Started".toLocaleLowerCase());
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
                              j.name
                                .toLocaleLowerCase()
                                .includes(enteredName.toLocaleLowerCase()) ||
                              j.position
                                .toLocaleLowerCase()
                                .includes(enteredName.toLocaleLowerCase()) ||
                              j.grade
                                .toLocaleLowerCase()
                                .includes(enteredName.toLocaleLowerCase()) ||
                              j.appraisal.status
                                .toLocaleLowerCase()
                                .includes(enteredName.toLocaleLowerCase())
                            ) {
                              return employee;
                            }
                          })
                          .map((j: any) => {
                            console.log(j.appraisal.status, "index");
                            // if ( tabValue === 1){
                            //      return j
                            // }
                            return (
                              <ExpandableTableRow
                                key={j.name}
                                expandComponent={<TableCell colSpan={5}>


                                  <TableBody>
                                    {users &&
                                      users
                                        .map((j: any) => {
                                          console.log(j.appraisal.status, "index");

                                          return (

                                            <TableRow key={j.name}
                                              sx={{ border: 0 }}>
                                              {/* <Link to={`${CREATE_APPRAISAL}/employee/${j._id}`}>
                                                            <TableCell component="th" scope="row">{j.name}</TableCell>
                                                        </Link> */}
                                              <TableCell
                                                padding="checkbox">
                                                {/* <Checkbox
                                                  color="default"
                                                  // checked={isItemSelected}
                                                  // inputProps={{
                                                  //   'aria-labelledby': labelId,
                                                  // }}
                                                /> */}

                                                <input
                                                  // onChange={checkboxHandler}
                                                  name={j._id}
                                                  //checked={j?.isChecked || false}
                                                  //checked={j.reviewerIsChecked === true ? true: false}
                                                  checked={j.reviewerIsChecked}
                                                  onChange={handleOnCheck}
                                                  type="checkbox"
                                                  style={{
                                                    height: "18px",
                                                    width: "18px",
                                                    borderColor: "#D5D5D5",
                                                  }}
                                                // value={[j._id, j.name]}
                                                />
                                              </TableCell>
                                              <TableCell component="th" scope="row" sx={{ width: '340px' }}>
                                                <Link
                                                  to={`${CREATE_APPRAISAL}/employee/${j._id}`}
                                                // onClick={() => startAppraisal(j._id)}
                                                >
                                                  <Stack direction="row">
                                                    <Avatar>H</Avatar>
                                                    <Names> {j.name}</Names>
                                                  </Stack>
                                                </Link>
                                              </TableCell>
                                              <TableCell sx={{ width: '432px' }} align="left">{j.position}</TableCell>
                                              <TableCell sx={{ width: '150px' }} align="left">{j.grade}</TableCell>
                                              <TableCell sx={{ width: '150px' }} align="left">
                                                {j.appraisal.status ? (
                                                  <p>{j.appraisal.status}</p>
                                                ) : (
                                                  <p>Not Started </p>
                                                )}
                                              </TableCell>
                                              <TableCell sx={{ width: '82px' }} align="center">
                                                <img src={Eye} alt="icon" />
                                              </TableCell>

                                            </TableRow>
                                          );
                                        })}
                                  </TableBody>


                                </TableCell>}
                              >




                                <TableCell component="th" scope="row">
                                  <Link
                                    to={`${CREATE_APPRAISAL}/employee/${j._id}`}
                                  // onClick={() => startAppraisal(j._id)}
                                  >
                                    <Stack direction="row">
                                      <Avatar>H</Avatar>
                                      <Names> {j.name}</Names>
                                    </Stack>
                                  </Link>
                                </TableCell>
                                <TableCell align="left">{j.position}</TableCell>
                                <TableCell align="center">{j.grade}</TableCell>
                                <TableCell align="left">
                                  {j.appraisal.status ? (
                                    <p>{j.appraisal.status}</p>
                                  ) : (
                                    <p>Not Started </p>
                                  )}
                                </TableCell>
                                <TableCell align="center">
                                  <IconButton>
                                  <img src={Eye} alt="icon" />
                                  </IconButton>
                                </TableCell>
                              </ExpandableTableRow>
                            );
                          })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
            </TableHeadings>
          );
        })}
    </Mytable>
  );
};
export default MyTeamreviewer;
