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
  useRejectReviewerAppraisalEmployeeMutation,
} from "./../../../service";
import { useEffect } from "react";
import {
  CREATE_APPRAISAL,
  REVIEWER_PAGE,
} from "./../../../constants/routes/Routing";
import UpDown from "../../assets/Images/UpDown.svg";
import Opennew from "../../assets/Imaages/Opennew.svg";
import Application from "../../assets/Images/Application.svg";
import Closeicon from "../../../assets/Images/Closeicon.svg";
import Eye from "../Reviewericons/Eyeicon.svg";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Checkbox from "@mui/material/Checkbox";
import Expand from "../../reviewerMain/Reviewericons/Expand.svg";
import Newexcel from "../../reviewerMain/Reviewericons/Newexcel.svg";
import Searchlensreview from "../../reviewerMain/Reviewericons/Searchlensreview.svg";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import TablePagination from "@mui/material/TablePagination";
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
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

const userData = [
  { id: 0, reason: "rating", isChecked: false, value: "rating" },
  {
    id: 1,
    reason: "Feedback questionnaire",
    isChecked: false,
    value: "Feedback_questionnaire",
  },
  {
    id: 2,
    reason: "area of improvement",
    isChecked: false,
    value: "area_of_improvement",
  },
  {
    id: 3,
    reason: "Training recommendation(s)",
    isChecked: false,
    value: "training_recommendation(s)",
  },
  {
    id: 4,
    reason: "Other recommendation(s)",
    isChecked: false,
    value: "other_recommendation(s)",
  },
];

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
  console.log(event.target.value);
};

interface Data {
  empty: any;
  position: any;
  pastatus: any;
  status: any;
  grade: any;
  name: any;
  protein: any;
  Appraiser_Rating: any;
  Reviewer_Rating: any;
  Normalizer_Rating: any;
}


function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "empty",
    numeric: false,
    disablePadding: true,
    label: "",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Employee",
  },
  {
    id: "position",
    numeric: false,
    disablePadding: false,
    label: "Position",
  },
  {
    id: "grade",
    numeric: true,
    disablePadding: false,
    label: "Grade",
  },
  {
    id: "pastatus",
    numeric: false,
    disablePadding: false,
    label: "Pending Action",
  },
  {
    id: "Appraiser_Rating",
    numeric: true,
    disablePadding: false,
    label: "Appraiser Rating",
  },
  {
    id: "Reviewer_Rating",
    numeric: true,
    disablePadding: false,
    label: "Reviewer Rating",
  },
  {
    id: "Normalizer_Rating",
    numeric: true,
    disablePadding: false,
    label: "Normalizer Rating",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Overall Status",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "View PA",
  },
];

function EnhancedTableHead(props: any) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ paddingLeft: "30px" }}
          >
            <TableSortLabel
              // active={orderBy === headCell.id}
              active={false}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const MyTeam = (props: any) => {
  const [opendialog, setOpendialog] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { statusSort } = props
  const navigate = useNavigate();

  const handleDialogOpen = () => {
    setOpendialog(true);
  };

  const handleDialogClose = () => {
    setOpendialog(false);
    setIsOpen(false);
  };

  const handleDialogNo = () => {
    setOpendialog(false);
    setIsOpen(true);
  };

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("position");
  const [selected, setSelected] = React.useState<readonly string[]>([]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const { startAppraisal } = props;
  const [acceptReviewer] = useAcceptReviewerMutation();
  const [rejectReviewer] = useRejectReviewerAppraisalEmployeeMutation();
  const [tabValue, setTabValue] = React.useState<any>(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log("handle change run");
    console.log(newValue, "index check");
    setTabValue(newValue);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [checkboxUser, setcheckboxUser] = React.useState<any>([]);
  const [error, setError] = React.useState(false);
  const [zeroselect, setzeroselect] = React.useState(false);
  const [reasonSelection, setreasonSelection] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [users, setUsers] = useState<any>([]);
  const [myAppraisals, setMyAppraisals] = useState<any>([]);
  const [myReviewals, setMyReviewals] = useState<any>([]);
  const [filter, setFilter] = React.useState("");
  const [employee, setEmployee] = React.useState([]);
  const [enteredName, setenteredName] = useState("");
  const [checkedEmployeeid, setcheckedEmployeeid] = React.useState("");
  const [approved, setApproved] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  console.log(users, "users");
  console.log(checkedEmployeeid, "checkedempid");
  // const {data: filterData,refetch } = useGetEmployeeByStatusQuery(filter);
  const { data: employeeData, refetch } = useGetEmployeeQuery("all");
  console.log(employeeData, "hi");
  useEffect(() => {
    console.log("useeffect run");
    if (employeeData) {
      setUsers(employeeData.data);
      let appraisals = employeeData.data.filter((emp: any) => emp.manager_code == "1145")
      setMyAppraisals(appraisals);
      console.log("myappraisals", appraisals)
    }
  }, [employeeData]);


  useEffect(() => {
    if (statusSort === '') {
      return setTabValue(0)
    } else if (statusSort === "completed") {
      return setTabValue(1)
    } else if (statusSort === "In Progress") {
      return setTabValue(2)
    } else if (statusSort === "Not Started") {
      return setTabValue(3)
    }
  }, [statusSort])


  const rejectHandler = () => {
    const rejectfilter = users.filter((i: any) => {
      return i.reviewerIsChecked === true && i.reviewerIsDisabled === false;
    });

    const reviewerValue = rejectfilter.map(
      (j: any) => j.reviewer.reviewer_status
    )[0];

    console.log(rejectfilter, "filter2222");
    console.log(
      reviewerValue === "pending" || reviewerValue === "draft",
      "11111111111"
    );
    if (rejectfilter.length > 1) {
      setError(true);
    } else if (
      (rejectfilter.length === 1 && reviewerValue === "pending") ||
      reviewerValue === "draft"
    ) {
      return (
        setError(false),
        setzeroselect(false),
        handleDialogOpen(),
        setcheckedEmployeeid(() => {
          return rejectfilter.map((j: any) => j._id);
        })
      );
    } else if (rejectfilter.length === 0) {
      setzeroselect(true);
    }
    // else {
    //   //return{ rejectfilter};
    //   handleDialogOpen();
    // }
  };

  const handleSubmit = (e: any) => {
    const checkedfilter = checkboxUser
      .filter((i: any) => {
        console.log(i.isChecked, "hhhhhhhhhhhhhhhhhhhhhhhh");
        return i.isChecked === true || i.isChecked === false;
      })
      .map((j: any) => {
        return {
          value: j.value,
          isChecked: j.isChecked,
        };
      });

    console.log(checkedfilter, "ids");
    if (checkedfilter.filter((k: any) => k.isChecked === true).length === 0) {
      setreasonSelection(true);
    } else if (checkedfilter.length > 0) {
      return (
        setreasonSelection(false),
        handleDialogClose(),
        rejectReviewer({ value: checkedfilter, id: checkedEmployeeid[0] }),
        navigate(`${REVIEWER_PAGE}/employee/${checkedEmployeeid[0]}`)
      );
    }
  };
  // const handleSubmithelper = (e: any) => {
  //     const { name, checked } = e.target;
  //     console.log(checked, 'checkedddd ssubmit')
  //     // if (checked === false) {
  //     //     setreasonSelection(true)
  //     // }else{
  //     //     setreasonSelection(false)
  //     // }
  // }

  useEffect(() => {
    setcheckboxUser(userData);
  }, []);
  console.log(checkboxUser, "ccccccccccccc");
  const handlecheckbox = (e: any) => {
    const { name, checked } = e.target;
    console.log(name, " values");
    if (name === "allselect") {
      let userReason = checkboxUser.map((reasons: any) => {
        return { ...reasons, isChecked: checked };
      });
      setcheckboxUser(userReason);
    } else {
      let userReason = checkboxUser.map((reasons: any) =>
        reasons.reason === name ? { ...reasons, isChecked: checked } : reasons
      );
      setcheckboxUser(userReason);
    }
  };

  const checkboxHandler = (checkbox: any) => {
    if (checkbox) {
      const res = checkbox.filter((i: any) => {
        return i.reviewerIsChecked === true && !i.reviewerIsDisabled;
      });
      return res;
    }
  };

  /*
      Disable checkbox  if employee apraisal was approved and saved
      Filter all the emoloyee who were appraoved
      Create a state and stote the value of appraoved employees
      Then disable checkbox for the employee in the state

      */

  const checkboxIdHandler = (res: any) => {
    if (res) {
      const check = res.map((i: any) => {
        return i._id;
      });
      console.log(check, "check");
      return check;
    }
  };
  const hideAlertHandler = () => {
    setTimeout(() => {
      setApproved(false);
    }, 1000);
  };

  const approvedSuccessfully = () => {
    return (
      setApproved(true), hideAlertHandler()
    )


  };
  const getPAStatus = (j: any) => {
    if (j.appraisal.objective_description.length === 0)
      return " PA Not Started"
    else if (j.appraisal.status == "completed")
      return " -"
    else if (j.appraisal.appraiser_status === "pending")
      return " Pending with Appraiser"
    else if (j.appraisal.appraiser_status === "draft")
      return " Draft"
    else if (j.appraisal.appraiser_status === "submitted" &&
      j.reviewer.reviewer_status == "pending")
      return " Pending with Reviewer"
    else if (j.appraisal.appraiser_status === "submitted" &&
      j.reviewer.reviewer_status == "accepted" && j.normalizer.normalizer_status == "pending")
      return " Pending with Normalizer"
    else if (j.appraisal.appraiser_status === "reviewer-rejected")
      return " Reviewer Rejected"
    else if (j.appraisal.appraiser_status === "normalizer-rejected")
      return " Normalizer Rejected"
    else if (j.reviewer.reviewer_status == "accepted" && j.normalizer.normalizer_status == "employee-rejected")
      return " Pending with Normalizer"
  }

  const bulkApproval = () => {
    console.log(users)
    let myAppraisalsCode = myAppraisals.map((item: any) => item.employee_code)
    let myReviewalusers = users.filter((item: any) => myAppraisalsCode.includes(item.manager_code) && !item.reviewerIsDisabled)
    console.log(myReviewalusers)
    console.log(checkboxIdHandler(myReviewalusers))
    acceptReviewer({ id: checkboxIdHandler(myReviewalusers) });
    approvedSuccessfully();
  }

  const handleOnCheck = (e: any) => {
    const { name, checked } = e.target;
    console.log(name, checked, "checked");
    const tempUser = users.map((j: any) => {
      console.log(j.reviewerIsChecked, "jjjjjjjjjjj");
      return j._id === name ? { ...j, reviewerIsChecked: checked } : j;
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
      {error && (
        <Alert severity="error">
          Multiple employees cannot be rejected - select one employee.
        </Alert>
      )}
      {zeroselect && (
        <Alert severity="error">
          Atleast one employees should be selected - select one employee.
        </Alert>
      )}

      <Heading>My Team</Heading>
      {approved && (
        <Alert severity="success"  >
          Approved successfully.
        </Alert>
      )}
      <Stack
        spacing={2}
        direction="row"
        display="flex"
        justifyContent="end"
      //paddingLeft="340px"

      // paddingBottom="14px"
      // sx={{ position: 'absolute', marginLeft: '64%' }}
      >
        <Button
          style={{
            textTransform: "none",
            fontSize: "15px",
            fontFamily: "Arial",
            borderColor: "#3E8CB5",
            marginRight: "20px",
             borderRadius:"7px"
          }}
          variant="outlined"
          onClick={bulkApproval}
        >
          Bulk Approve
        </Button>
        <Button
          style={{
            textTransform: "none",
            fontSize: "15px",
            fontFamily: "Arial",
            borderColor: "#3E8CB5",
            marginRight: "20px",
             borderRadius:"7px"
          }}
          variant="outlined"
          onClick={() => { return acceptReviewer({ id: checkboxIdHandler(checkboxHandler(users)) }), approvedSuccessfully(); }}
          // onClick={ approvedSuccessfully}
        >
          Approve 
        </Button>
        <Button
         style={{
          textTransform: "none",
          fontSize: "15px",
          fontFamily: "Arial",
          borderColor: "#3E8CB5",
          marginRight: "20px",
           borderRadius:"7px"
        }}
        variant="outlined"
          onClick={rejectHandler}
        >
          Reject 
        </Button>
        {/* <Button
          style={{
            textTransform: "none",

            fontSize: "16px",
            fontFamily: "regular",
            padding: "6px 30px",
            borderRadius: "7px",
            color: "#3C8BB5",
          }}
          variant="outlined"
        >
          Cancel
        </Button> */}
      </Stack>
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
          <Tab label="Rejected" />
        </Tabs>

        <Searchfeild>
          <div>
            <TextField
              id="outlined-basic"
              placeholder="Search Here..."
              onChange={(e) => setenteredName(e.target.value)}
              inputProps={{ maxLength: 256 }}

              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={Searchlensreview} alt="icon" />
                  </InputAdornment>
                ),
              }}
            />
            {/* <img src={UpDown} alt='icon' style={{ marginLeft: '15px', marginTop: '5px' }} /> */}
            <img
              src={Expand}
              alt="icon"
              style={{ marginLeft: "15px", marginTop: "5px" }}
            />
            <img
              src={Newexcel}
              alt="icon"
              style={{ marginLeft: "15px", marginTop: "5px" }}
            />
          </div>
        </Searchfeild>
      </Tabstyles>

      {myAppraisals &&
        myAppraisals.map((objDesc: any, index: number) => {
          console.log(index, tabValue, "index");

          return (
            <TableHeadings>
              <TabPanel value={tabValue} index={index}>
                <TableContainer>
                  <Table sx={{ minWidth: 750 }} size="small" aria-label="simple table">
                    <EnhancedTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      // onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                      {employeeData &&
                        stableSort(
                          (rowsPerPage > 0
                            ? myAppraisals.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : myAppraisals
                          ),
                          getComparator(order, orderBy)
                        ).filter((j: any) => {
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
                              .includes("not-started".toLocaleLowerCase());
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
                          })
                          .map((j: any) => {
                            console.log(j.appraisal.status, "index");
                            // if ( tabValue === 1){
                            //      return j
                            // }
                            { }
                            return (
                              <ExpandableTableRow
                                key={j.name}
                                expandComponent={
                                  <TableCell colSpan={9} size="small">
                                    <TableBody>
                                      {users &&
                                        users.filter((emp: any) => emp.manager_code == j.employee_code)
                                          .map((j: any) => {
                                            return (
                                              <TableRow key={j.name} sx={{ border: 0 }} >
                                                {/* <Link to={`${CREATE_APPRAISAL}/employee/${j._id}`}>
                                                                                               <TableCell component="th" scope="row">{j.name}</TableCell>
                                                                                                </Link> */}
                                                <TableCell padding="checkbox" width="35px">
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
                                                    disabled={
                                                      j.reviewerIsDisabled
                                                    }
                                                  // value={[j._id, j.name]}
                                                  />
                                                </TableCell>
                                                {/* <TableCell component="th" scope="row" sx={{ width: '358px' }}> */}
                                                <TableCell
                                                  component="th"
                                                  scope="row"
                                                  sx={{ width: "20%" }}
                                                >
                                                  {/* <Link
                                                                                                    to={`${CREATE_APPRAISAL}/employee/${j._id}`}
                                                                                                // onClick={() => startAppraisal(j._id)}
                                                                                                > */}
                                                  <Stack
                                                    direction="row"
                                                    alignItems="baseline"
                                                  >
                                                    <Avatar>{j.legal_full_name[0]}</Avatar>
                                                    <Names>
                                                      <p
                                                        onClick={() => j.reviewer.reviewer_status == "draft" || j.reviewer.reviewer_status == "appraiser-rejected" && navigate(`${REVIEWER_PAGE}/employee/${j._id}`)}
                                                      >
                                                        {j.legal_full_name}
                                                      </p>
                                                    </Names>
                                                  </Stack>
                                                  {/* </Link> */}
                                                </TableCell>
                                                {/* <TableCell sx={{ width: '330px' }} align="left">{j.position}</TableCell>
                                                                                            <TableCell sx={{ width: '250px' }} align="center">{j.grade}</TableCell>
                                                                                            <TableCell sx={{ width: '250px' }} align="center">{j.appraisal.appraiser_rating}</TableCell>
                                                                                            <TableCell sx={{ width: '250px' }} align="center">{j.reviewer.reviewer_rating}</TableCell>
                                                                                            <TableCell sx={{ width: '250px' }} align="center">{j.normalizer.normalizer_rating}</TableCell>
                                                                                            <TableCell sx={{ width: '250px' }} align="left">
                                                                                                {j.appraisal.status ? (
                                                                                                    <p>{j.appraisal.status}</p>
                                                                                                ) : (
                                                                                                    <p>Not Started </p>
                                                                                                )}
                                                                                            </TableCell>
                                                                                            <TableCell sx={{ width: '165px' }} align="center">
                                                                                                <img src={Eye} alt="icon" />
                                                                                            </TableCell> */}
                                                <TableCell
                                                  sx={{ width: "15%" }}
                                                  align="left"
                                                >
                                                  {j.position_long_description}
                                                </TableCell>
                                                <TableCell
                                                  sx={{ width: "5%" }}
                                                  align="center"
                                                >
                                                  {j.grade}
                                                </TableCell>
                                                <TableCell align="left" style={{ width: "15%" }}>{getPAStatus(j)}</TableCell>
                                                <TableCell
                                                  sx={{ width: "10%" }}
                                                  align="center"
                                                >
                                                  {j.appraisal?.appraiser_rating == 0 ? <p> - </p> : j.appraisal?.appraiser_rating}
                                                </TableCell>
                                                <TableCell
                                                  sx={{ width: "10%" }}
                                                  align="center"
                                                >
                                                  {j.reviewerIsDisabled && j.reviewer.reviewer_rating != 0 ? (
                                                    j.reviewer.reviewer_rating
                                                  ) : (
                                                    <p> - </p>
                                                  )}
                                                </TableCell>
                                                <TableCell
                                                  sx={{ width: "10%" }}
                                                  align="center"
                                                >
                                                  {j.normalizerIsDisabled && j.normalizer.normalizer_rating != 0 ? (
                                                    j.normalizer.normalizer_rating
                                                  ) : (
                                                    <p> - </p>
                                                  )}{" "}
                                                </TableCell>
                                                <TableCell
                                                  sx={{ width: "90px" }}
                                                  align="left"
                                                >
                                                  {j.appraisal.status ? (
                                                    <p>{j.appraisal.status}</p>
                                                  ) : (
                                                    <p>Not Started </p>
                                                  )}
                                                </TableCell>



                                                <TableCell
                                                  sx={{ width: "90px" }}
                                                  align="center"
                                                > <Link to={`/midyearperformanceappraisal/midyear-pa-report/employee/${j._id}`}>
                                                    <img src={Eye} alt="icon" /> </Link>
                                                </TableCell>

                                                {/* <TableCell  align="left">{j.position}</TableCell>
                                                                                            <TableCell   align="center">{j.grade}</TableCell>
                                                                                            <TableCell   align="center">{j.appraisal.appraiser_rating}</TableCell>
                                                                                            <TableCell   align="center">{j.reviewer.reviewer_rating}</TableCell>
                                                                                            <TableCell  align="center">{j.normalizer.normalizer_rating}</TableCell>
                                                                                            <TableCell   align="left">
                                                                                                {j.appraisal.status ? (
                                                                                                    <p>{j.appraisal.status}</p>
                                                                                                ) : (
                                                                                                    <p>Not Started </p>
                                                                                                )}
                                                                                            </TableCell>
                                                                                            <TableCell align="center" >
                                                                                                <img src={Eye} alt="icon" />
                                                                                            </TableCell> */}
                                              </TableRow>
                                            );
                                          })}
                                    </TableBody>
                                  </TableCell>
                                }
                              >
                                <TableCell style={{ width: "250px" }}  scope="row">
                                  {/* <Link
                                                                        to={`${CREATE_APPRAISAL}/employee/${j._id}`}
                                                                    // onClick={() => startAppraisal(j._id)}
                                                                    > */}
                                  <Stack direction="row">
                                    <Avatar>H</Avatar>
                                    <Names> {j.legal_full_name}</Names>
                                  </Stack>
                                  {/* </Link> */}
                                </TableCell>
                                <TableCell align="left" style={{ width: "15%" }}>{j.position_long_description}</TableCell>

                                <TableCell align="center" style={{ width: "5%" }}>{j.grade}</TableCell>
                                <TableCell align="left" style={{ width: "15%" }}>{getPAStatus(j)}</TableCell>
                                <TableCell align="center">
                                  {j.appraisal?.appraiser_rating == 0 ? <p> - </p> : j.appraisal?.appraiser_rating}
                                </TableCell>
                                <TableCell align="center">
                                  {j.reviewerIsDisabled && j.reviewer.reviewer_rating != 0 ? (
                                    j.reviewer.reviewer_rating
                                  ) : (
                                    <p> - </p>
                                  )}
                                  {/*{j.reviewer.reviewer_rating}*/}
                                </TableCell>
                                <TableCell align="center">
                                  {j.normalizerIsDisabled && j.normalizer.normalizer_rating != 0 ? (
                                    j.normalizer.normalizer_rating
                                  ) : (
                                    <p> - </p>
                                  )}
                                  {/*{j.normalizer.normalizer_rating}*/}
                                </TableCell>
                                <TableCell align="left">
                                  {j.appraisal.status ? (
                                    <p>{j.appraisal.status}</p>
                                  ) : (
                                    <p>Not Started </p>
                                  )}
                                </TableCell>
                                <TableCell align="center">
                                  <Link to={`/midyearperformanceappraisal/midyear-pa-report/employee/${j._id}`}>
                                    <img src={Eye} alt="icon" />
                                  </Link>
                                </TableCell>
                              </ExpandableTableRow>
                            );
                          })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 100]}
                  component="div"
                  count={myAppraisals.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TabPanel>
            </TableHeadings>
          );
        })}
      <Dialog
        style={{
          marginTop: "110px",
          height: "calc(100vh - 250px)",
        }}
        fullWidth
        maxWidth="md"
        open={opendialog}
        // onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          style={{
            fontFamily: "regular",
            backgroundColor: "#EBF1F5",
            color: "#004C75",
            fontSize: "18px",
            padding: "0px 20px",
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
          }}
          id="alert-dialog-title"
        >
          {"Rejection"}
          <p
            style={{
              display: "flex",
              float: "right",
              alignItems: "center",
            }}
          >
            <img
              width={18}
              height={18}
              src={Closeicon}
              onClick={handleDialogClose}
            />
          </p>
        </DialogTitle>
        {reasonSelection && (
          <Alert severity="error">
            Atleast one employees should be selected - select one employee.
          </Alert>
        )}
        <DialogContent style={{ marginTop: "30px" }}>
          <DialogContentText
            style={{
              // marginTop: "100px",
              // marginLeft: "270px",
              fontSize: "14px",
              color: "#333333",
              fontFamily: "regular",
              textAlign: "center",
            }}
            id="alert-dialog-description"
          >
            Please select rejection reason(s)
            <div style={{ textAlign: "center", marginLeft: "37%" }}>
              <Stack sx={{ textAlign: "left", marginTop: "15px" }} spacing={1}>
                <div>
                  <input
                    type="checkbox"
                    name="allselect"
                    onChange={handlecheckbox}
                    checked={
                      checkboxUser.filter(
                        (reasons: any) => reasons?.isChecked !== true
                      ).length < 1
                    }
                  />
                  <label style={{ color: "#1976d2" }}>Select all</label>
                </div>
                {checkboxUser.map((reasons: any) => (
                  <div>
                    <input
                      type="checkbox"
                      name={reasons.reason}
                      checked={reasons?.isChecked || false}
                      onChange={handlecheckbox}
                    />
                    <label>{reasons.reason}</label>
                  </div>
                ))}
              </Stack>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          style={{
            paddingBottom: "15px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            style={{
              width: "92px",
              height: "35px",
              textTransform: "none",
              backgroundColor: "#004D77",
              fontSize: "15px",
              padding: "4px 22px",
              color: "#FFFFFF",
              fontFamily: "regular",
              borderRadius: "5px",
            }}
            onClick={(e) => {
              handleSubmit(e);
            }}
            autoFocus
          >
            Submit
          </Button>
          {/*<Button*/}
          {/*    style={{*/}
          {/*        width: "92px",*/}
          {/*        height: "35px",*/}
          {/*        textTransform: "none",*/}
          {/*        fontSize: "15px",*/}
          {/*        fontFamily: "regular",*/}
          {/*        color: "#1976d2",*/}
          {/*        opacity: "80%",*/}
          {/*        padding: "4px 22px",*/}
          {/*        border: "1px solid #1976d2",*/}
          {/*        borderRadius: "5px",*/}
          {/*    }}*/}
          {/*    onClick={handleDialogNo}*/}
          {/*>*/}
          {/*    Cancel*/}
          {/*</Button>*/}
        </DialogActions>
      </Dialog>
    </Mytable>
  );
};
export default MyTeam;
