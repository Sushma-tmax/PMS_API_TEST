import * as React from "react";
import { useState, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Badge, FormControl, Grid, MenuItem, BadgeProps, Menu } from "@mui/material";
import { InputLabel, Stack, Tab, Tabs, Box, Typography } from "@mui/material";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { TextField } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import { useTable, useBlockLayout } from 'react-table'

// import Menu from "@mui/material";
// import {
//   Container,
//   TablePagination,
//   Drawer,
//   Box,
//   Typography,
//   Tooltip,
//   Menu,
// } from "@mui/material";
import {
  useGetEmployeeByFilterQuery,
  useGetEmployeeByManagerCodeQuery,
  useGetEmployeeByStatusQuery,
  useGetEmployeeQuery,
  useGetReviewerEmployeeByFilterQuery
} from "./../../../../service";
import { useEffect } from "react";
import {
  APPRAISAL_NOT_STARTED,
  APPRAISER,
  EMPLOYEE_APPRAISER_SUBMISSION,
  APPRAISER_SUBMISSION,
  CREATE_APPRAISAL,
  EMPLOYEE_DOWNLOAD,
  VIEW_PA,
  VIEW_PAST_PA,
} from "./../../../../constants/routes/Routing";
import UpDown from "../../assets/Images/UpDown.svg";
import Opennew from "../../assets/Images/Opennew.svg";
import Application from "../../assets/Images/Application.svg";
import Searchlens from "../../assets/Images/Searchlens.svg";
import Eye from "../Reviewericons/Eyeicon.svg";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Checkbox from "@mui/material/Checkbox";
import Searchlensreview from "../../Dashboard/Reviewericons/Searchlensreview.svg";
import Expand from "../../Dashboard/Reviewericons/Expand.svg";
import Newexcel from "../../Dashboard/Reviewericons/Newexcel.svg";
import Updown from "../../Dashboard/Reviewericons/Updown.svg";
import Alert from "@mui/material/Alert";
import TablePagination from "@mui/material/TablePagination";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as XLSX from "xlsx";
import { useAppContext } from "../../../../context/AppContext";
import { useLoggedInUser } from "../../../../hooks/useLoggedInUser";
const Mytable = styled("div")({
  background: "#FFFFFF",
  marginLeft: "25px",
  marginRight: "25px",
  position: "relative",
});
const Tabstyles = styled("div")({
  // marginLeft: "20px",
  // // marginTop: "15px",
  // marginRight: "20px",
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
  color: "#3e8cb5",
  fontFamily: "Arial",
  // paddingTop: "25px",
  // marginLeft: "20px",
});
const Searchfeild = styled("div")({
  // position: "absolute",
  // marginLeft: "78%",
  // //marginRight: '8px',
  // marginTop: "10px",
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
    background: "#eaeced",
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

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -17,
    top: 8,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Names = styled("div")({
  // marginLeft: "20px",
  // marginTop: "10px",
  color: "#333333",
  //cursor :"pointer"
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
  console.log(event.target.value);
};
//filter


const MyTeam = (props: any) => {
  const { startAppraisal,employeeData1, SectionFilter, setSectionFilter, 
    subSectionFilter, setSubSectionFilter,valueOfCard } = props;
  const [tabValue, setTabValue] = React.useState<any>(0);
  const { statusSort } = props;
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log("handle change run");
    console.log(newValue, "index check");
    setTabValue(newValue);
  };

  const listInnerRef = useRef<any>();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<number>();
  const [users, setUsers] = useState<any>([]);
  const [filter, setFilter] = React.useState("");
  const [employee, setEmployee] = React.useState([]);
  const [enteredName, setenteredName] = useState("");
  const [approved, setApproved] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tablecount, settablecount] = React.useState<any>(0);
  const [pageNumber, setPageNumber] = useState(0)
  console.log(tablecount, "tablecount");
  const [tablecount1, settablecount1] = React.useState<any>(0);
  // console.log(tablecount1, "tablecount1");
  const navigate = useNavigate();

  //multiselect
  const [positionFilter, setpositionFilter] = React.useState<string[]>([]);
  const [GradeFilter, setGradeFilter] = React.useState<string[]>([]);
  console.log(positionFilter, "positionFilter");
  const handleChangeSelectPosition = (event: SelectChangeEvent<typeof positionFilter>) => {
    const {
      target: { value },
    } = event;
    if (value.includes("None")) { setpositionFilter([]) } else {
      setpositionFilter(

        typeof value === 'string' ? value.split(',') : value,
      );
    }

  };
  const handleChangeSelectGrade = (event: SelectChangeEvent<typeof GradeFilter>) => {
    const {
      target: { value },
    } = event;

    if (value.includes("None")) { setGradeFilter([]) } else {
      setGradeFilter(

        typeof value === 'string' ? value.split(',') : value,
      );
    }
  };
  console.log(valueOfCard, "statussort");
  useEffect(() => {
    if (valueOfCard === "") {
      return setTabValue(0);
    } else if (valueOfCard === "Not-Started") {
      return setTabValue(2);
    } else if (valueOfCard === "In Progress") {
      return setTabValue(3);
    } else if (valueOfCard === "Normalized") {
      return setTabValue(3);
    } else if (valueOfCard === "Rejected") {
      return setTabValue(4);
    } else if (valueOfCard === "Completed") {
      return setTabValue(5);
    }
  }, [valueOfCard]);
  // //sorting
  //headings-sort


  //filter
  const ITEM_HEIGHT = 28;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        maxWidth: 400,

      },
    },
  };
  const MenuPropsGrade = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 70,
      },
    },
  };
  const [empEmployeeCode, setempEmployeeCode] = React.useState("");
  console.log(empEmployeeCode, "position");
  const handleChangeEmployeeCode = (event: SelectChangeEvent) => {
    setempEmployeeCode(event.target.value);
  };
  const [empFullName, setempFullName] = React.useState("");
  console.log(empFullName, "position");
  const handleChangeFullName = (event: SelectChangeEvent) => {
    setempFullName(event.target.value);
  };
  const [employeeCode, setemployeeCode] = React.useState("");
  // console.log(employeeCode, "employeeCode");
  const handleChangeemployeeCode = (event: SelectChangeEvent) => {
    setemployeeCode(event.target.value);
  };
  const [employeeName, setemployeeName] = React.useState("");
  //console.log(employeeName, "position");
  const handleChangeemployeeName = (event: SelectChangeEvent) => {
    setemployeeName(event.target.value);
  };
  const [positions, setPositions] = React.useState("");
  console.log(positions, "position");
  const handleChangeposition = (event: SelectChangeEvent) => {
    setPositions(event.target.value);
  };
  const [empgrades, setempGrades] = React.useState("");
  console.log(empgrades, "position");
  const handleChangegrades = (event: SelectChangeEvent) => {
    setempGrades(event.target.value);
  };
  //filter
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    // setPageNumber(pageNumber + 1)
  };

  //populating filter dropdown
  const [anchorElnew, setAnchorElnew] = React.useState<null | HTMLElement>(
    null
  );
  const opennew = Boolean(anchorElnew);
  const handleClicknew = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnew(event.currentTarget);
  };
  const handleClosenew = (event: React.MouseEvent<HTMLElement>) => {
    // console.log(event?.target.value)
    setAnchorElnew(null);
  };
  const handleTarget = (event: any) => {
    // console.log(event?.target.value)
    setempEmployeeCode(event?.target?.getAttribute("value"))
    // setempEmployeeCode(event?.target?.value?.toString());
    console.log(event?.target.name.toString(), "handleTarget")
    // setAnchorElnew(null);
    handleClosenew(event);
  };
  //Legal Full Name
  const [anchorElnewFullName, setAnchorElnewFullName] = React.useState<null | HTMLElement>(
    null
  );
  const openFullName = Boolean(anchorElnewFullName);
  const handleClickFullName = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewFullName(event.currentTarget);
  };
  const handleCloseFullName = (event: React.MouseEvent<HTMLElement>) => {

    setAnchorElnewFullName(null);
  };
  const handleTargetFullName = (event: any) => {

    setempFullName(event?.target?.getAttribute("value"));


    setAnchorElnewFullName(null);
  };
  //Legal Full Name
  //Position
  const [anchorElnewservicePosition, setAnchorElnewservicePosition] = React.useState<null | HTMLElement>(
    null
  );
  const openservicePosition = Boolean(anchorElnewservicePosition);
  const handleClickservicePosition = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewservicePosition(event.currentTarget);
  };
  const handleCloseservicePosition = (event: React.MouseEvent<HTMLElement>) => {

    setAnchorElnewservicePosition(null);
  };
  const handleTargetservicePosition = (event: any) => {

    setPositions(event?.target?.getAttribute("value"));


    setAnchorElnewservicePosition(null);
  };
  //Position
  const [anchorElnewserviceGrade, setAnchorElnewserviceGrade] = React.useState<null | HTMLElement>(
    null
  );
  const openserviceGrade = Boolean(anchorElnewserviceGrade);
  const handleClickserviceGrade = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewserviceGrade(event.currentTarget);
  };
  const handleCloseserviceGrade = (event: React.MouseEvent<HTMLElement>) => {

    setAnchorElnewserviceGrade(null);
  };
  const handleTargetserviceGrade = (event: any) => {

    setempGrades(event?.target?.getAttribute("value"));


    setAnchorElnewserviceGrade(null);
  };
  //Grade



  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { data: user } = useLoggedInUser();
  // console.log(user, "user");
  // console.log(users, "users");
  // console.log(statusSort, "statussort");
  // const {data: filtenrData,refetch } = useGetEmployeeByStatusQuery(filter);
  // const { data: employeeData, refetch } = useGetEmployeeQuery("all");
  const employee_code = user?.manager_code.toString();


  const PAGE_NUMBER = 5
  const SELECT_FOR_DASHBOARD = `employee_code,overall_rating,legal_full_name,first_name,position_long_description,section,sub_section,grade,appraisal.appraiser_rating,reviewer.reviewer_rating,normalizer.normalizer_rating,appraisal.status,appraisal.appraiser_status,reviewer.reviewer_status,normalizer.normalizer_status,reviewer.rejection_count,appraisal.objective_description,reviewerIsDisabled`
  const { data: employeeData } = useGetEmployeeByFilterQuery(
    `?manager_code=${user?.employee_code}&limit=600&select=${SELECT_FOR_DASHBOARD}`
  );
  // const { data: reviewerData } = useGetReviewerEmployeeByFilterQuery(
  //   '62ac2037c1c19127416ab14c'
  // );
  // console.log(reviewerData,'reviewerData')

  // console.log(employeeData?.pagination?.next?.page,'employeeData')
  useEffect(() => {
    //setUsers(employeeData?.data);
      setUsers(employeeData1)
  }, [employeeData]);




  // console.log(employee, 'nwedata')

  // console.log(data2, 'check')

  // console.log(employeeData, "hi");

  // useEffect(() => {
  //   console.log("useeffect run");
  //   if (employeeData) {
  //     let temp = employeeData?.data?.filter(
  //       (data: any) => data.manager_code == `"${user?.manager_code}"`
  //     );
  //     setUsers(temp);
  //     // console.log(data2, "temp");
  //   }
  // }, [employeeData]);

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
        return i._id;
      });
      console.log(check, "check");
      return check;
    }
  };
  const handleOnCheck = (e: any) => {
    const { name, checked } = e.target;
    console.log(name, checked, "checked");
    const tempUser = users.map((j: any) => {
      console.log(j.reviewerIsChecked, "jjjjjjjjjjj");
      return j._id === name ? { ...j, appraiserIsChecked: checked } : j;
    });
    setUsers(tempUser);
    console.log(tempUser, "temp");
  };

  const hideAlertHandler = () => {
    setTimeout(() => {
      setApproved(false);
    }, 1000);
  };

  const approvedSuccessfully = () => {
    return setApproved(true), hideAlertHandler();
  };

  // const approvePA = (j: any) => {
  //     let id = j._id;
  //     console.log(j);
  //     if (!j.reviewer.reviewer_acceptance)
  //     acceptReviewer(id);
  //   else if (!j.normalizer.normalizer_acceptance)
  //     acceptNormalizer(id);
  // };
  // const rejectPA = (j: any) => {
  //     let id = j._id;
  //     navigate("/reviewerrejection/employee/" + id, {replace: true});
  //     console.log(j);
  // };

  const getStatus = (status: any) => {
    if (status == "in-progress") {
      return "In progress"
    } else if (status == "not-started") {
      return "Not started"
    } else if (status == "normalized") {
      return "Normalized"
    } else if (status == "rejected") {
      return "Rejected "
    } else if (status == "completed") {
      return "Completed "
    }
  }

  const viewPAClickHandler = (j: any) => {
    // if (j.appraisal.appraiser_status == 'reviewer-rejected') {
    //     navigate(`/reviewerrejection/employee/${j._id}`)
    // } else if (j.appraisal.appraiser_status == 'normalizer-rejected') {
    //     navigate(`/appraiser/normalizer-rejection/employee/${j._id}`)
    // } else {
    //     navigate(`/midyearperformanceappraisal/midyear-pa-report/employee/${j._id}`)
    // }
    if (j?.appraisal?.status === "not-started") {
      //navigate(`${VIEW_PA}/employee/${j._id}`);
      window.open(`${APPRAISAL_NOT_STARTED}/employee/${j._id}`, '_blank')

      // window.open(`${VIEW_PA}/employee/${j._id}`,'_blank')
    } else {
      //navigate(`${APPRAISAL_NOT_STARTED}/employee/${j._id}`);
      // window.open(`${APPRAISAL_NOT_STARTED}/employee/${j._id}`,'_blank')
      window.open(`${VIEW_PA}/employee/${j._id}`, '_blank')
    }

  };

  const empNameClickHandler = (j: any) => {
    console.log(j, "empactsat");

    if (j.appraisal.appraiser_status?.includes("employee-rejected")) {
      navigate(`${EMPLOYEE_APPRAISER_SUBMISSION}/employee/${j._id}`);
    } else if (j.appraisal.appraiser_status?.includes("reviewer-rejected")) {
      navigate(`${APPRAISER_SUBMISSION}/employee/${j._id}`);
    } else if (j.appraisal.appraiser_status?.includes("normalizer-rejected")) {
      navigate(`${APPRAISER_SUBMISSION}/employee/${j._id}`);
    } else if (
      j.appraisal.appraiser_status == "draft" ||
      j.appraisal.appraiser_status == "pending"
    ) {
      navigate(`${APPRAISER}/employee/${j._id}`);
    }
  };

  const getPAStatus = (j: any) => {
    if (
      j.appraisal?.objective_description &&
      j.appraisal?.objective_description.length === 0
    )
      return " PA Not Started";
    else if (j?.appraisal?.status == "completed") return "-";
    else if (j?.appraisal?.appraiser_status === "pending")
      return " Pending with Appraiser";
    else if (j?.appraisal?.status === "normalized")
      return " Pending with Employee";
    else if (j?.appraisal?.appraiser_status?.includes("draft")) return " Pending with Appraiser (Draft)";
    else if (
      j?.appraisal?.appraiser_status === "submitted" &&
      (j?.reviewer?.reviewer_status == "pending" ||
        j?.reviewer?.reviewer_status == "draft")
    )
      return " Pending with Reviewer";
    else if (
      j?.appraisal?.appraiser_status === "accepted" &&
      (j?.reviewer?.reviewer_status == "pending" || j?.reviewer?.reviewer_status == "appraiser-accepted" ||
        j?.reviewer?.reviewer_status == "draft")
    )
      return " Pending with Reviewer";
    else if (j?.reviewer?.reviewer_status == "appraiser-rejected" || j?.reviewer?.reviewer_status == "draft") {
      return " Pending with Reviewer";
    } else if (
      // j.appraisal.appraiser_status === "submited" &&
      (j?.reviewer?.reviewer_status == "accepted") &&
      (j?.normalizer?.normalizer_status == "pending" || j?.normalizer?.normalizer_status == "draft")
    )
      return " Pending with HR Normalizer";
    else if (j?.appraisal?.appraiser_status === "reviewer-rejected")
      return " Pending with Appraiser (Reviewer Rejection)";
    else if (j?.appraisal?.appraiser_status === "normalizer-rejected")
      return " Pending with Appraiser (Normalizer Rejection)";
    else if (j?.appraisal?.appraiser_status === "appraiser-rejected-employee")
      return " Pending with Employee";
    else if (j?.appraisal?.appraiser_status === "employee-rejected")
      return " Pending with Appraiser (Employee Rejection)";
    else if (
      j?.reviewer.reviewer_status == "accepted" &&
      j?.normalizer.normalizer_status == "employee-rejected"
    )
      return " Pending with HR Normalizer";
    else if (j?.normalizer?.normalizer_status == "accepted")
      return " Pending with Employee";
    else if (j?.normalizer?.normalizer_status === "draft")
      return " Pending with HR Normalizer";
    else if (
      j?.reviewer?.reviewer_status == "rejected" &&
      j?.reviewer?.rejection_count == 3 &&
      (j?.normalizer?.normalizer_status == "pending" || j?.normalizer?.normalizer_status == "draft")
    )
      return " Pending with HR Normalizer";
    else if (j?.normalizer?.normalizer_status == "employee-rejected")
      return " Pending with HR Normalizer";
    // 5
    else if (j?.appraisal?.appraiser_status === "employee-rejected")
      return " Pending with Appraiser";
    // 2
    else if (
      j?.reviewer?.reviewer_status == "normalizer-rejected" &&
      j?.reviewer?.reviewer_status == "appraiser-rejected"
    )
      return "Pending with Reviewer";
    // 1
    else if (
      j?.appraisal?.appraiser_status == "normalizer-rejected" &&
      j?.appraisal?.appraiser_status == "accepted"
    )
      return "Pending with Reviewer";
    else return "-";
  };

  useEffect(() => {
    settablecount(() => {
      if (tabValue === 0) {
        return users?.length
        // settablecount(users?.length);
      } else {
        let temp = users?.filter((j: any) => {
          if (tabValue === 1) {
            return getPAStatus(j)?.includes("Pending with Appraiser");
          } else if (tabValue === 2) {
            return j?.appraisal?.status === "not-started";
          } else if (tabValue === 3) {
            // return getPAStatus(j)
            return j?.appraisal?.status === "in-progress" || j?.appraisal?.status === "normalized";
          } else if (tabValue === 4) {
            return j?.appraisal?.status === "rejected";
          } else if (tabValue === 5) {

            return j?.appraisal?.status === "completed";
          }
        });
        return temp?.length;
      }
    });
  }, [users, tabValue]);


  // Badge
  const [All, setAll] = React.useState<any>(0);
  useEffect(() => {
    setAll(users?.length);
  }, [users, employeeData]);
  const [completedemp, setcompletedemp] = React.useState<any>(0);
  useEffect(() => {
    let badge = users?.filter((j: any) => {
      return j?.appraisal?.status === "completed";
    });
    // console.log(badge.length, "badge");
    setcompletedemp(badge?.length);
    return badge;
  }, [users, employeeData]);
  const [inProgressemp, setinProgressemp] = React.useState<any>(0);
  useEffect(() => {
    let badge = users?.filter((j: any) => {
      return j?.appraisal?.status === "in-progress" || j?.appraisal?.status === "normalized";
    });
    // console.log(badge.length, "badge");
    setinProgressemp(badge?.length);
    return badge;
  }, [users, employeeData]);
  const [notStartedemp, setnotStartedemp] = React.useState<any>(0);
  useEffect(() => {
    let badge = users?.filter((j: any) => {
      return j?.appraisal?.status === "not-started";
    });
    // console.log(badge.length, "badge");
    setnotStartedemp(badge?.length);
    return badge;
  }, [users, employeeData]);
  const [emprejected, setemprejected] = React.useState<any>(0);
  useEffect(() => {
    let badge = users?.filter((j: any) => {
      return j?.appraisal?.status === "rejected";
    });
    // console.log(badge.length, "badge");
    setemprejected(badge?.length);
    return badge;
  }, [users, employeeData]);

  const [mypendingActions, setmypendingActions] = React.useState<any>(0);
  const [filData, setfilData] = React.useState<any>([]);
  //  Filter icon
  const [icon, setIcon] = React.useState<any>([]);
  const [icon1, setIcon1] = React.useState<any>([]);
  const [icon2, setIcon2] = React.useState<any>([]);
  const [icon3, setIcon3] = React.useState<any>([]);
  useEffect(() => {
    if (empEmployeeCode === "None" || empEmployeeCode === "") {
      setIcon(false);
    } else {
      setIcon(true);
    }
  }, [empEmployeeCode])
  useEffect(() => {
    if (empFullName === "None" || empFullName === "") {
      setIcon1(false);
    } else {
      setIcon1(true);
    }
  }, [empFullName])
  useEffect(() => {
    if (positions === "None" || positions === "") {
      setIcon2(false);
    } else {
      setIcon2(true);
    }
  }, [positions])
  useEffect(() => {
    if (empgrades === "None" || empgrades === "") {
      setIcon3(false);
    } else {
      setIcon3(true);
    }
  }, [empgrades])

  useEffect(() => {
    let badge = users?.filter((j: any) => {
      return getPAStatus(j)?.includes("Pending with Appraiser");
    });
    // console.log(badge.length, "badge");
    setmypendingActions(badge?.length);
    return badge;
  }, [users, employeeData]);
  // Badge

  const handleExport = () => {
    // console.log(users, "excel");
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(filData);

    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };
  const Appraiserdata = users?.map((j: any) => {
    return {
      ECode: j?.employee_code,
      EmployeeName: j?.legal_full_name,
      Position: j?.position_long_description,
      Grade: j?.grade,
      PendingAction: getPAStatus(j),
      AppraiserRating:
        j?.appraisal?.appraiser_rating == 0 ? (
          <p> - </p>
        ) : (
          j?.appraisal?.appraiser_rating
        ),
      ReviewerRating:
        j?.reviewerIsDisabled && j?.reviewer.reviewer_rating != 0 ? (
          j?.reviewer.reviewer_rating
        ) : (
          <p> - </p>
        ),
      NormalizerRating:
        j?.normalizerIsDisabled && j?.normalizer?.normalizer_rating != 0 ? (
          j?.normalizer?.normalizer_rating
        ) : (
          <p> - </p>
        ),

      Status: getStatus(j?.appraisal?.status),
      //  ? (
      //             <p style={{ textTransform: "capitalize" }}>{j?.appraisal?.status}</p>
      //             ) : (
      //             <p>Not Started </p>
      //             )
    };
  });
  console.log(Appraiserdata, "data")

  const [activeTemplate, setactiveTemplate] = useState<any>([]);
  console.log(activeTemplate, "activeTemplate")
  useEffect(() => {
    const mapped = users &&
      users
        ?.filter((j: any, index: any) => {
          if (tabValue === 0) {
            return j;
          } else if (tabValue === 1) {
            return getPAStatus(j)?.includes(" Pending with Appraiser");
          } else if (tabValue === 2) {
            return j?.appraisal?.status
              ?.toLocaleLowerCase()
              ?.includes("not-started"?.toLocaleLowerCase());
          } else if (tabValue === 3) {

            return j?.appraisal?.status?.toLocaleLowerCase()?.includes("in-progress".toLocaleLowerCase()) ||
              j?.appraisal?.status?.toLocaleLowerCase()?.includes("normalized".toLocaleLowerCase())

          } else if (tabValue === 4) {
            return j?.appraisal?.status
              ?.toLocaleLowerCase()
              .includes("rejected"?.toLocaleLowerCase());
          } else if (tabValue === 5) {

            return j?.appraisal?.status
              ?.toLocaleLowerCase()
              ?.includes("completed"?.toLocaleLowerCase());
          }
        })
        ?.filter((j: any) => {
          if (empFullName === "None" || empFullName === "") {
            return j;
          } else {
            return j?.legal_full_name
              ?.toLocaleLowerCase()
              .includes(empFullName?.toLocaleLowerCase());
          }
        })
        ?.filter((j: any) => {
          if (empEmployeeCode === "None" || empEmployeeCode === "") {
            return j;
          } else {
            return j?.employee_code
              .toLocaleLowerCase()
              .includes(empEmployeeCode.toLocaleLowerCase());
          }
        })

        ?.filter((j: any) => {
          if (positions === "None" || positions === "") {
            return j;
          } else {
            return j?.position_long_description
              .toLocaleLowerCase()
              .includes(positions.toLocaleLowerCase());
          }
        })
        ?.filter((j: any) => {
          if (empgrades === "None" || empgrades === "") {
            return j;
          } else {
            return j?.grade
              .toLocaleLowerCase()
              .includes(empgrades.toLocaleLowerCase());
          }
        })
        ?.map((j: any, emp: any, employee: any) => {
          // console.log(emp,"emp")
          // console.log(j,"j")
          console.log(j?.grade, "code")
          return {

            ECode: j.employee_code,
            EmployeeName: j.legal_full_name,

            // emp.manager_code ==  j.employee_code,
            Position: j.position_long_description,
            Grade: j.grade,
            PendingAction: getPAStatus(j),
            AppraiserRating:
              j.appraisal?.appraiser_rating == 0 ? (
                <p> - </p>
              ) : (
                j.appraisal?.appraiser_rating
              ),
            ReviewerRating:
              j.reviewerIsDisabled && j.reviewer.reviewer_rating != 0 ? (
                j.reviewer.reviewer_rating
              ) : (
                <p> - </p>
              ),
            NormalizerRating:
              j.normalizerIsDisabled && j.normalizer.normalizer_rating != 0 ? (
                j.normalizer.normalizer_rating
              ) : (
                <p> - </p>
              ),

            Status: getStatus(j?.appraisal?.status),

          };

        })
    // if (tabValue == 0) {
    setfilData(mapped)
    // }
    console.log(mapped, "mapped")
  }, [users, empEmployeeCode, empFullName, empgrades, positions, enteredName, tabValue])
  useEffect(() => {
    const Dashfilter = users &&
      users
        ?.filter((j: any, index: any) => {
          if (tabValue === 0) {
            return j;
          } else if (tabValue === 1) {
            return getPAStatus(j)?.includes("Appraiser");
          } else if (tabValue === 2) {
            return j?.appraisal?.status
              ?.toLocaleLowerCase()
              ?.includes("not-started"?.toLocaleLowerCase());
          } else if (tabValue === 3) {

            return j?.appraisal?.status?.toLocaleLowerCase()?.includes("in-progress".toLocaleLowerCase()) ||
              j?.appraisal?.status?.toLocaleLowerCase()?.includes("normalized".toLocaleLowerCase())

          } else if (tabValue === 4) {
            return j?.appraisal?.status
              ?.toLocaleLowerCase()
              .includes("rejected"?.toLocaleLowerCase());
          } else if (tabValue === 5) {

            return j?.appraisal?.status
              ?.toLocaleLowerCase()
              ?.includes("completed"?.toLocaleLowerCase());
          }
        })
        ?.filter((item1: any) => {
          if (SectionFilter?.includes("None") || SectionFilter?.length === 0) {
            return item1;
          } else {
            return !!SectionFilter?.find((item2: any) => item1?.section === item2)
          }
        })
        ?.filter((item1: any) => {
          if (subSectionFilter?.includes("None") || subSectionFilter?.length === 0) {
            return item1;
          } else {
            return !!subSectionFilter?.find((item2: any) => item1?.sub_section === item2)
          }
        })
        ?.filter((j: any) => {
          if (positions === "None" || positions === "") {
            return j;
          } else {
            return j?.position_long_description
              ?.toLocaleLowerCase()
              ?.includes(positions?.toLocaleLowerCase());
          }
        })
        .filter((j: any) => {
          if (empgrades === "None" || empgrades === "") {
            return j;
          } else {
            return j?.grade
              ?.toLocaleLowerCase()
              ?.includes(empgrades?.toLocaleLowerCase());
          }
        })
        .filter((j: any) => {
          if (enteredName === "") {
            return j;
          } else if (
            (j?.employee_code !== undefined &&
              j?.employee_code
                ?.toLocaleLowerCase()
                ?.includes(
                  enteredName?.toLocaleLowerCase()
                )) ||
            (j?.legal_full_name !== undefined &&
              j?.legal_full_name
                ?.toLocaleLowerCase()
                ?.includes(
                  enteredName?.toLocaleLowerCase()
                )) ||
            (j.grade !== undefined &&
              j?.grade
                ?.toLocaleLowerCase()
                ?.includes(
                  enteredName?.toLocaleLowerCase()
                )) ||
            (j.position_long_description !== undefined &&
              j?.position_long_description
                ?.toLocaleLowerCase()
                ?.includes(
                  enteredName?.toLocaleLowerCase()
                )) ||
            (j?.appraisal?.status !== undefined &&
              j?.appraisal?.status
                ?.toLocaleLowerCase()
                ?.includes(
                  enteredName?.toLocaleLowerCase()
                )) ||
            (getPAStatus(j) !== undefined &&
              getPAStatus(j)
                ?.toLocaleLowerCase()
                ?.includes(enteredName?.toLocaleLowerCase()))
          ) {
            return j;
          }
        })
    setactiveTemplate(Dashfilter)
    //console.log(activeTemplate, "activeTemplate")
  }, [users, positions, empgrades, tabValue])


  useEffect(() => {
    settablecount1(() => {
      if (tabValue === 0) {
        return Appraiserdata
        // settablecount1(Appraiserdata);
      } else {
        let temp = Appraiserdata?.filter((j: any) => {
          if (tabValue === 1) {

            return j?.PendingAction === "Pending with Appraiser";
          } else if (tabValue === 2) {

            return j?.Status === "Not-started";
          } else if (tabValue === 3) {
            return j?.Status === "In progress" || j?.Status === "Normalized";
          } else if (tabValue === 4) {
            return j?.Status === "Rejected";
          } else if (tabValue === 5) {
            return j?.Status === "Completed";
          }
        });
        return temp;
      }
    });
  }, [users, tabValue]);
  const [show, setShow] = React.useState<any>(0);
  console.log(show, "show");
  useEffect(() => {
    const All = Appraiserdata?.filter((j: any, index: number) => {
      {
        return j;
      }
    });
    // console.log(All,"All")
    let Completed = Appraiserdata?.filter((j: any, index: number) => {
      {
        return j?.status
          ?.toLocaleLowerCase()
          ?.includes("completed"?.toLocaleLowerCase());
      }
    });
    console.log(Completed, "Condition");
    const inProgress = Appraiserdata?.filter((j: any, index: number) => {
      {
        return j?.status
          ?.toLocaleLowerCase()
          ?.includes("in-progress"?.toLocaleLowerCase());
      }
    });
    console.log(inProgress, "inProgress");
    const notStarted = Appraiserdata?.filter((j: any, index: number) => {
      {
        console.log(
          j?.Status?.toLocaleLowerCase()?.includes(
            "not-started"?.toLocaleLowerCase()
          ),
          "position"
        );
        return j?.Status?.toLocaleLowerCase()?.includes(
          "not-started"?.toLocaleLowerCase()
        );
      }
    });
    console.log(notStarted, "notStarted");
    const Rejected = Appraiserdata?.filter((j: any, index: number) => {
      {
        return j?.status
          ?.toLocaleLowerCase()
          ?.includes("rejected"?.toLocaleLowerCase());
      }
    });
    console.log(Rejected, "Rejected");
    // const PaActions =Appraiserdata?.filter((j: any,index:number) => {
    //   {
    //     return getPAStatus(j)?.includes("Pending with HR Normalizer");
    //   }
    // })
    // console.log(PaActions,"PaActions")

    if (tabValue === 0) {
      setShow(All);
    } else if (tabValue === 1) {
      setShow(Completed);
    } else if (tabValue === 2) {
      setShow(inProgress);
    } else if (tabValue === 3) {
      setShow(notStarted);
    } else if (tabValue === 4) {
      setShow(Rejected);
    } else if (tabValue === 5) {
      setShow(Appraiserdata);
    }
  }, [users, tabValue]);

  const onScroll = () => {
    console.log('running scroll')
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setPageNumber(pageNumber + 1);
      }
    }
  };

  console.log(users, employeeData?.data, 'userdata')




  const COLUMNS = [
    {
      Header: 'ID',
      accessor: 'id_number',
    },
    {
      Header: 'First Name',
      accessor: 'firstName',
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Department',
      accessor: 'department',
    },
    {
      Header: 'Date Joined',
      accessor: 'dateJoined',
    },
  ];

    const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable({
    columns: COLUMNS,
    data: employeeData1
  });



  const maxLengthForSearch = 30;
  const handleSearchBar = (e: any) => {
      if (e.target.value.length > maxLengthForSearch) {
        e.target.value = e.target.value.slice(0, maxLengthForSearch);
      }
      setenteredName(e.target.value);
      setPage(0);
    }



  return (
    <Mytable>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        padding="30px"
        paddingBottom="10px"
      >
        <Heading> My Team</Heading>
        {/* <Link to={`${VIEW_PAST_PA}`}>
          <Typography
            sx={{
              // marginTop: "28px",
              // paddingLeft: "19px",
              color: "#52C8F8",
              fontSize: "13px",
              fontFamily: "Arial",
            }}
          >
            <u>View Previous PA</u>
          </Typography>
        </Link> */}
      </Stack>
      {approved && <Alert severity="success">Approved successfully!</Alert>}

      {/* <Tabstyles> */}
        <Stack 
        marginLeft="24px"
        marginRight="24px"
        direction="row" 
        alignItems="center"
         justifyContent="space-between" 
         sx={{ borderBottom: 1, borderColor: "#E3E3E3", }}        
>       
<Tabstyles>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          <Tab
            label={
              <StyledBadge badgeContent={All} color="primary" max={999}>
                All
              </StyledBadge>
            }
          />
          <Tab
            sx={{ width: "200px" }}
            label={

              <StyledBadge
                badgeContent={mypendingActions}
                color="primary"
                max={999}
              >
                My pending actions
              </StyledBadge>
            }
          />
          <Tab
            sx={{ width: "155px" }}
            label={
              <StyledBadge
                badgeContent={notStartedemp}
                color="primary"
                max={999}
              >
                Not started
              </StyledBadge>
            }
          />
          <Tab
            sx={{ width: "142px" }}
            label={

              <StyledBadge
                badgeContent={inProgressemp}
                color="primary"
                max={999}
              >
                In progress
              </StyledBadge>
            }
          />
          <Tab
            sx={{ width: "190px" }}
            label={
              <StyledBadge badgeContent={emprejected} color="primary" max={999}>
                Employees rejection
              </StyledBadge>
            }
          />
          <Tab
            sx={{ width: "125px" }}
            label={
              <StyledBadge
                badgeContent={completedemp}
                color="primary"
                max={999}
              >
                Completed
              </StyledBadge>
            }
          />
        </Tabs>
        </Tabstyles>

        {/* <Tabs
          sx={{ borderBottom: 1, borderColor: "#E3E3E3", width: "100%" }}
          value={tabValue}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          <Tab
            label={
              <Badge badgeContent={All} color="primary" max={999}>
                All
              </Badge>
            }
          />
          <Tab
            label={
              <Badge badgeContent={completedemp} color="primary" max={999}>
                Completed
              </Badge>
            }
          />
          <Tab
            label={
              <Badge badgeContent={inProgressemp} color="primary" max={999}>
                In Progress
              </Badge>
            }
          />
          <Tab
            label={
              <Badge badgeContent={notStartedemp} color="primary" max={999}>
                Not Started
              </Badge>
            }
          />
          <Tab
            label={
              <Badge badgeContent={emprejected} color="primary" max={999}>
                Employee Rejected
              </Badge>
            }
          />
          <Tab
            label={
              <Badge badgeContent={mypendingActions} color="primary" max={999}>
                My Pending Actions
              </Badge>
            }
          />
        </Tabs> */}

        {/* <Searchfeild> */}
          <div>
            <Stack direction="row" alignItems="flex-start" >
          <Searchfeild >
            <TextField
              id="outlined-basic"
              placeholder="Search Here..."
              autoComplete="off"
              inputProps={{ maxLength: 256 }}
              //onChange={(e) => setenteredName(e.target.value)}
              onChange={handleSearchBar}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={Searchlensreview} alt="icon" />
                  </InputAdornment>
                ),
              }}
            />
            </Searchfeild>
            <div>
            <img
              src={Newexcel}
              alt="icon"
              style={{ marginLeft: "15px", marginTop: "5px" }}
              onClick={handleExport}
            />
            </div>
            <Link to="/myteamtableexpandview" >
              <img
                src={Expand}
                alt="icon"
                style={{ marginLeft: "15px", marginTop: "5px" }}
              />
            </Link>
            </Stack>
          </div>
          </Stack>
        {/* </Searchfeild> */}
      {/* </Tabstyles> */}

      {users &&
        users.map((objDesc: any, index: number) => {
          // console.log(index, tabValue, "index");
          // console.log(objDesc, "objDesc");

          return (
            <TableHeadings>
              <TabPanel value={tabValue} index={index}>
                <TableContainer
                // style={{ cursor: "pointer" }}
                >
{/*                  <Table size="small" aria-label="simple table" stickyHeader >*/}
{/*                    <TableHead*/}
{/*                      style={{ height: "30px" }}>*/}
{/*                      <TableRow*/}
{/*                        sx={{*/}
{/*                          "& td, & th": {*/}
{/*                            whiteSpace: "nowrap",*/}
{/*                            bgcolor: "#eaeced",*/}
{/*                            // border: 1,*/}
{/*                            // borderColor: "#e0e0e0",*/}
{/*                          },*/}
{/*                        }}*/}
{/*                      >*/}
{/*                        <TableCell align="center"*/}
{/*                          sx={{*/}
{/*                            fontFamily: "Arial",*/}
{/*                            color: "#3E8CB5",*/}
{/*                            fontSize: "14px",*/}
{/*                            fontWeight: "600",*/}
{/*                            // bgcolor: "#ebf2f4",*/}
{/*                          }}*/}
{/*                          width="6%">*/}
{/*                          <div*/}
{/*                            style={{*/}
{/*                              color: "#3e8cb5",*/}
{/*                              fontSize: "14px",*/}
{/*                              fontWeight: "600",*/}
{/*                              fontFamily: "Arial",*/}
{/*                              border: "none",*/}
{/*                              background: "none",*/}
{/*                            }}*/}
{/*                          >*/}
{/*Ecode*/}
{/*                            /!* <Stack direction="row" alignItems="center" justifyContent="center" >*/}
{/*                              <div*/}
{/*                                aria-controls={opennew ? "fade-menu" : undefined}*/}
{/*                                aria-haspopup="true"*/}
{/*                                aria-expanded={opennew ? "true" : undefined}*/}
{/*                                onClick={handleClicknew}*/}
{/*                              >*/}
{/*                                <Stack direction="row" alignItems="center">*/}
{/*                                  Ecode*/}
{/*                                  <ArrowDropDownOutlinedIcon />*/}
{/*                                </Stack>*/}
{/*                              </div>*/}
{/*                              <Menu*/}
{/*                                MenuListProps={{*/}
{/*                                  "aria-labelledby": "fade-button",*/}

{/*                                }}*/}
{/*                                sx={{*/}
{/*                                  height: "200px",*/}
{/*                                  width: "90px"*/}
{/*                                }}*/}
{/*                                anchorEl={anchorElnew}*/}
{/*                                open={opennew}*/}
{/*                                onClose={handleClosenew}*/}

{/*                              >*/}
{/*                                <MenuItem*/}
{/*                                  style={{*/}
{/*                                    fontSize: "14px",*/}
{/*                                    fontFamily: "Arial",*/}
{/*                                    color: "#333333",*/}
{/*                                    justifyContent: "center"*/}
{/*                                    //paddingLeft: "15px",*/}
{/*                                    //height:"200px"*/}
{/*                                  }}*/}
{/*                                  key="None"*/}
{/*                                  value="None"*/}
{/*                                  onClick={handleTarget}*/}
{/*                                >None*/}
{/*                                </MenuItem>*/}
{/*                                {activeTemplate*/}
{/*                                  ?.slice()*/}
{/*                                  ?.sort(function (a: any, b: any) {*/}
{/*                                    return a?.employee_code - b?.employee_code;*/}
{/*                                  })*/}
{/*                                  .filter((item: any, i: any, ar: any) => ar.indexOf(item) === i)*/}
{/*                                  ?.map((j: any) => (*/}
{/*                                    <MenuItem*/}
{/*                                      style={{*/}
{/*                                        fontSize: "14px",*/}
{/*                                        fontFamily: "Arial",*/}
{/*                                        color: "#333333",*/}
{/*                                        justifyContent: "left",*/}
{/*                                        width: "100px",*/}
{/*                                        paddingLeft: "5px",*/}
{/*                                        //height:"200px"*/}
{/*                                      }}*/}
{/*                                      key={j?.employee_code}*/}
{/*                                      value={j?.employee_code}*/}
{/*                                      onClick={handleTarget}*/}
{/*                                    >*/}
{/*                                      {j?.employee_code}*/}
{/*                                    </MenuItem>*/}
{/*                                  ))}*/}
{/*                              </Menu>*/}
{/*                              {icon && <FilterAltTwoToneIcon />}*/}
{/*                            </Stack> *!/*/}
{/*                          </div>*/}
{/*                        </TableCell>*/}

{/*                        /!* <TableCell align="center" width="20%"> *!/*/}
{/*                        /!* <div*/}
{/*                            style={{*/}
{/*                              color: "#3e8cb5",*/}
{/*                              fontSize: "14px",*/}
{/*                              fontWeight: "600",*/}
{/*                              fontFamily: "Arial",*/}
{/*                              border: "none",*/}
{/*                              background: "none",*/}
{/*                            }}*/}
{/*                          > *!/*/}

{/*                        /!* <FormControl sx={{ m: 0, width: 100, height: "0" }}>*/}
{/*                            <Stack direction="row">*/}
{/*                              <span style={{*/}
{/*                                color: "#3e8cb5",*/}
{/*                                fontSize: "14px",*/}
{/*                                fontFamily: "Arial",*/}
{/*                                fontWeight: "600",*/}
{/*                                border: "none",*/}
{/*                                background: "none",*/}
{/*                                //textAlign: "left",*/}
{/*                                // margin:"-5px"*/}
{/*                              }}> Ecode</span>*/}
{/*                              <Select*/}
{/*                                size="small"*/}
{/*                                sx={{ width: "25px", fontSize: "0rem" }}*/}
{/*                                disableUnderline*/}
{/*                                value={employeeCode}*/}
{/*                                onChange={handleChangeemployeeCode}*/}
{/*                                // input={<OutlinedInput label="Name" />}*/}
{/*                                variant="standard"*/}
{/*                                MenuProps={MenuProps}*/}
{/*                              >*/}
{/*                                <MenuItem*/}
{/*                                  style={{ fontSize: "12px" }}*/}
{/*                                  key="None"*/}
{/*                                  value="None"*/}
{/*                                >*/}
{/*                                  None*/}
{/*                                </MenuItem>*/}

{/*                                {activeTemplate*/}
{/*                                ?.slice()*/}
{/*                                ?.sort(function (a: any, b: any) {*/}
{/*                                  return a?.employee_code - b?.employee_code;*/}
{/*                                })*/}
{/*                                .filter((item: any, i: any, ar: any) => ar.indexOf(item) === i)*/}
{/*                                  ?.map((j: any) => (*/}
{/*                                    <MenuItem*/}
{/*                                      style={{ fontSize: "12px" }}*/}
{/*                                      key={j?.employee_code}*/}
{/*                                      value={j?.employee_code}*/}
{/*                                    >*/}
{/*                                      {j?.employee_code}*/}
{/*                                    </MenuItem>*/}
{/*                                  ))}*/}
{/*                              </Select>*/}
{/*                              {icon && (*/}
{/*                                <FilterAltTwoToneIcon />)}*/}
{/*                            </Stack>*/}
{/*                          </FormControl> *!/*/}
{/*                        <TableCell align="center" width="20%"*/}
{/*                          sx={{*/}
{/*                            fontFamily: "Arial",*/}
{/*                            color: "#3E8CB5",*/}
{/*                            fontSize: "14px",*/}
{/*                            fontWeight: "600",*/}
{/*                          }}*/}
{/*                        >*/}
{/*                          <div*/}
{/*                            style={{*/}
{/*                              color: "#3e8cb5",*/}
{/*                              fontSize: "14px",*/}
{/*                              fontWeight: "600",*/}
{/*                              fontFamily: "Arial",*/}
{/*                              border: "none",*/}
{/*                              background: "none",*/}
{/*                            }}*/}
{/*                          >*/}
{/*                             Employee Name*/}
{/*                            /!* <Stack direction="row" alignItems="center" justifyContent="center" >*/}
{/*                              <div*/}
{/*                                aria-controls={openFullName ? "fade-menu" : undefined}*/}
{/*                                aria-haspopup="true"*/}
{/*                                aria-expanded={openFullName ? "true" : undefined}*/}
{/*                                onClick={handleClickFullName}*/}
{/*                              >*/}
{/*                                <Stack direction="row" alignItems="center">*/}
{/*                                  Employee Name*/}
{/*                                  <ArrowDropDownOutlinedIcon />*/}
{/*                                </Stack>*/}
{/*                              </div>*/}
{/*                              <Menu*/}
{/*                                MenuListProps={{*/}
{/*                                  "aria-labelledby": "fade-button",*/}

{/*                                }}*/}
{/*                                sx={{*/}
{/*                                  height: "200px",*/}
{/*                                  // width:"400px"*/}
{/*                                }}*/}
{/*                                anchorEl={anchorElnewFullName}*/}
{/*                                open={openFullName}*/}
{/*                                onClose={handleCloseFullName}*/}

{/*                              >*/}
{/*                                <MenuItem*/}
{/*                                  style={{*/}
{/*                                    fontSize: "14px",*/}
{/*                                    fontFamily: "Arial",*/}
{/*                                    color: "#333333",*/}
{/*                                    justifyContent: "left"*/}
{/*                                    //paddingLeft: "15px",*/}
{/*                                    //height:"200px"*/}
{/*                                  }}*/}
{/*                                  key="None"*/}
{/*                                  value="None"*/}
{/*                                  //name="None"*/}
{/*                                  onClick={handleTargetFullName}*/}
{/*                                >None*/}
{/*                                </MenuItem>*/}
{/*                                {activeTemplate*/}
{/*                                  ?.slice()*/}
{/*                                  ?.sort(function (a: any, b: any) {*/}
{/*                                    return a?.legal_full_name?.localeCompare(b?.legal_full_name);*/}
{/*                                  })*/}
{/*                                  .filter((item: any, i: any, ar: any) => ar.indexOf(item) === i)*/}
{/*                                  ?.map((name: any) => (*/}
{/*                                    <MenuItem*/}
{/*                                      style={{*/}
{/*                                        fontSize: "14px",*/}
{/*                                        fontFamily: "Arial",*/}
{/*                                        color: "#333333",*/}
{/*                                        justifyContent: "left",*/}
{/*                                        width: "200px",*/}
{/*                                        paddingLeft: "5px",*/}
{/*                                        //height:"200px"*/}
{/*                                      }}*/}
{/*                                      key={name?.legal_full_name}*/}
{/*                                      value={name?.legal_full_name}*/}
{/*                                      onClick={handleTargetFullName}*/}
{/*                                    >*/}
{/*                                      {name?.legal_full_name}*/}
{/*                                    </MenuItem>*/}
{/*                                  ))}*/}

{/*                              </Menu>*/}
{/*                              {icon1 && <FilterAltTwoToneIcon />}*/}
{/*                            </Stack> *!/*/}
{/*                            /!* <div*/}
{/*                            style={{*/}
{/*                              color: "#3e8cb5",*/}
{/*                              fontSize: "14px",*/}
{/*                              fontWeight: "600",*/}
{/*                              fontFamily: "Arial",*/}
{/*                              border: "none",*/}
{/*                              background: "none",*/}
{/*                            }}*/}
{/*                          >*/}
{/*                            <FormControl sx={{ m: 0, width: 100, height: "0" }}>*/}
{/*                              <Stack direction="row">*/}
{/*                                <span> Employee Name</span>*/}
{/*                                <Select*/}
{/*                                  size="small"*/}
{/*                                  sx={{ width: "25px", fontSize: "0rem" }}*/}
{/*                                  disableUnderline*/}
{/*                                  value={employeeName}*/}
{/*                                  onChange={handleChangeemployeeName}*/}
{/*                                  // input={<OutlinedInput label="Name" />}*/}
{/*                                  variant="standard"*/}
{/*                                  MenuProps={MenuProps}*/}
{/*                                >*/}
{/*                                  <MenuItem*/}
{/*                                    style={{ fontSize: "12px" }}*/}
{/*                                    key="None"*/}
{/*                                    value="None"*/}
{/*                                  >*/}
{/*                                    None*/}
{/*                                  </MenuItem>*/}

{/*                                  {activeTemplate*/}
{/*                                     ?.slice()*/}
{/*                                     ?.sort(function (a: any, b: any) {*/}
{/*                                       return a?.legal_full_name?.localeCompare(b?.legal_full_name);*/}
{/*                                     })*/}
{/*                                     .filter((item: any, i: any, ar: any) => ar.indexOf(item) === i)*/}
{/*                                    ?.map((name: any) => (*/}
{/*                                      <MenuItem*/}
{/*                                        style={{ fontSize: "12px" }}*/}
{/*                                        key={name?.legal_full_name}*/}
{/*                                        value={name?.legal_full_name}*/}
{/*                                      >*/}
{/*                                        {name?.legal_full_name}*/}
{/*                                      </MenuItem>*/}
{/*                                    ))}*/}
{/*                                </Select>*/}
{/*                                {icon1 && (*/}
{/*                                  <FilterAltTwoToneIcon />)}*/}
{/*                              </Stack>*/}
{/*                            </FormControl>*/}
{/*                          </div> *!/*/}
{/*                          </div>*/}
{/*                        </TableCell>*/}
{/*                        <TableCell align="center" width="15%"*/}
{/*                          sx={{*/}
{/*                            fontFamily: "Arial",*/}
{/*                            color: "#3E8CB5",*/}
{/*                            fontSize: "14px",*/}
{/*                            fontWeight: "600",*/}
{/*                          }}*/}
{/*                        >*/}
{/*                          <div*/}
{/*                            style={{*/}
{/*                              color: "#3e8cb5",*/}
{/*                              fontSize: "14px",*/}
{/*                              fontWeight: "600",*/}
{/*                              fontFamily: "Arial",*/}
{/*                              border: "none",*/}
{/*                              background: "none",*/}
{/*                              // margin:"-5px"*/}
{/*                            }}*/}
{/*                          >*/}
{/*                             */}
{/*                            <FormControl sx={{ m: 0, width: 100, height: "0" }}>*/}
{/*                              <Stack direction="row">*/}
{/*                                <span> Position</span>*/}
{/*                                <Select*/}
{/*                                  size="small"*/}
{/*                                  sx={{ width: "25px", fontSize: "0rem" }}*/}
{/*                                  disableUnderline*/}
{/*                                  // value={positions}*/}
{/*                                  // onChange={handleChangeposition}*/}
{/*                                  // input={<OutlinedInput label="Name" />}*/}
{/*                                  variant="standard"*/}
{/*                                  MenuProps={MenuProps}*/}
{/*                                  multiple*/}
{/*                                  value={positionFilter}*/}
{/*                                  onChange={handleChangeSelectPosition}*/}
{/*                                  //input={<OutlinedInput label="Position" />}*/}
{/*                                  renderValue={(selected) => selected.join(', ')}*/}
{/*                                >*/}
{/*                                  <MenuItem*/}
{/*                                    // style={{ fontSize: "12px" }}*/}
{/*                                    key={0}*/}
{/*                                    value="None"*/}
{/*                                    sx={{*/}
{/*                                      padding: "0px",*/}
{/*                                      fontSize: "12px",*/}
{/*                                      paddingLeft: "38px"*/}
{/*                                    }}*/}
{/*                                  >*/}
{/*                                    /!* <Checkbox checked={positionFilter.indexOf("None") > -1} /> *!/*/}
{/*                                    <ListItemText*/}
{/*                                      primaryTypographyProps={{ fontSize: '0.9rem' }}*/}
{/*                                      primary="None" />*/}
{/*                                  </MenuItem>*/}

{/*                                  {activeTemplate*/}
{/*                                    ?.slice()*/}
{/*                                    ?.sort(function (a: any, b: any) { return a.position_long_description.localeCompare(b.position_long_description); })*/}
{/*                                    ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data.position_long_description }).indexOf(item.position_long_description) === index)*/}
{/*                                    ?.map((name: any, index: any) => (*/}
{/*                                      <MenuItem*/}
{/*                                        sx={{*/}
{/*                                          padding: "0px",*/}
{/*                                          fontSize: "12px"*/}
{/*                                        }}*/}
{/*                                        // style={{ fontSize: "12px" }}*/}
{/*                                        key={name?.position_long_description}*/}
{/*                                        value={name?.position_long_description}*/}
{/*                                      >*/}
{/*                                        <Checkbox*/}
{/*                                          size="small"*/}
{/*                                          checked={positionFilter.indexOf(name?.position_long_description) > -1} />*/}
{/*                                        <ListItemText*/}
{/*                                          primaryTypographyProps={{ fontSize: '0.9rem' }}*/}
{/*                                          primary={name?.position_long_description} />*/}
{/*                                      </MenuItem>*/}
{/*                                    )*/}
{/*                                    )}*/}
{/*                                </Select>*/}
{/*                                {icon2 && (*/}
{/*                                  <FilterAltTwoToneIcon />)}*/}
{/*                              </Stack>*/}
{/*                            </FormControl>*/}
{/*                            /!* <Stack direction="row" alignItems="center" >*/}
{/*                        <div*/}
{/*                          aria-controls={openservicePosition  ? "fade-menu" : undefined}*/}
{/*                          aria-haspopup="true"*/}
{/*                          aria-expanded={openservicePosition  ? "true" : undefined}*/}
{/*                          onClick={handleClickservicePosition}*/}
{/*                        >*/}
{/*                          <Stack direction="row" alignItems="center">*/}
{/*                          Position*/}
{/*                            <ArrowDropDownOutlinedIcon />*/}
{/*                          </Stack>*/}
{/*                        </div>*/}
{/*                        <Menu*/}
{/*                          MenuListProps={{*/}
{/*                            "aria-labelledby": "fade-button",*/}

{/*                          }}*/}
{/*                          sx={{*/}
{/*                            height:"200px",*/}
{/*                            width:"300px"*/}
{/*                          }}*/}
{/*                          anchorEl={anchorElnewservicePosition}*/}
{/*                          open={openservicePosition }*/}
{/*                          onClose={handleCloseservicePosition}*/}
{/*                          */}
{/*                        >*/}
{/*                           <MenuItem */}
{/*                          style={{*/}
{/*                            fontSize: "14px",*/}
{/*                            fontFamily: "Arial",*/}
{/*                            color: "#333333",*/}
{/*                            justifyContent:"left",*/}
{/*                            width:"100px",*/}
{/*                            paddingLeft: "5px",*/}
{/*                            //height:"200px"*/}
{/*                          }}*/}
{/*                          key="None"*/}
{/*                          value="None"*/}
{/*                           onClick={handleTargetservicePosition}*/}
{/*                           >None*/}
{/*                           </MenuItem>*/}
{/*                           {activeTemplate*/}
{/*                                  ?.slice()*/}
{/*                                  ?.sort(function (a:any, b:any) {return a.position_long_description.localeCompare(b.position_long_description);})*/}
{/*                                  ?.filter((item:any,index:any,array:any) => array.map((data:any)=>{return data.position_long_description}).indexOf(item.position_long_description) === index)*/}
{/*                                    ?.map((name: any) => (*/}
{/*                                      <MenuItem*/}
{/*                                      style={{*/}
{/*                                        fontSize: "14px",*/}
{/*                                        fontFamily: "Arial",*/}
{/*                                        color: "#333333",*/}
{/*                                        justifyContent:"left",*/}
{/*                                        width:"160px",*/}
{/*                                        paddingLeft: "5px",*/}
{/*                                        //height:"200px"*/}
{/*                                      }}*/}
{/*                                        key={name?.position_long_description}*/}
{/*                                        value={name?.position_long_description}*/}
{/*                                        onClick={handleTargetservicePosition}*/}
{/*                                      >*/}
{/*                                        {name?.position_long_description}*/}
{/*                                      </MenuItem>*/}
{/*                                    )*/}
{/*                                    )}*/}
{/*                          */}
{/*                        </Menu>*/}
{/*                        {icon2 && <FilterAltTwoToneIcon />}*/}
{/*                        </Stack> *!/*/}
{/*                            /!* <FormControl sx={{ m: 0, width: 100, height: "0" }}>*/}
{/*                              <Stack direction="row">*/}
{/*                                <span> Position</span>*/}
{/*                                <Select*/}
{/*                                  size="small"*/}
{/*                                  sx={{ width: "25px", fontSize: "0rem" }}*/}
{/*                                  disableUnderline*/}
{/*                                  value={positions}*/}
{/*                                  onChange={handleChangeposition}*/}
{/*                                  // input={<OutlinedInput label="Name" />}*/}
{/*                                  variant="standard"*/}
{/*                                  MenuProps={MenuProps}*/}
{/*                                >*/}
{/*                                  <MenuItem*/}
{/*                                    style={{ fontSize: "12px" }}*/}
{/*                                    key="None"*/}
{/*                                    value="None"*/}
{/*                                  >*/}
{/*                                    None*/}
{/*                                  </MenuItem>*/}

{/*                                  {activeTemplate*/}
{/*                                  ?.slice()*/}
{/*                                  ?.sort(function (a:any, b:any) {return a.position_long_description.localeCompare(b.position_long_description);})*/}
{/*                                  ?.filter((item:any,index:any,array:any) => array.map((data:any)=>{return data.position_long_description}).indexOf(item.position_long_description) === index)*/}
{/*                                    ?.map((name: any) => (*/}
{/*                                      <MenuItem*/}
{/*                                        style={{ fontSize: "12px" }}*/}
{/*                                        key={name?.position_long_description}*/}
{/*                                        value={name?.position_long_description}*/}
{/*                                      >*/}
{/*                                        {name?.position_long_description}*/}
{/*                                      </MenuItem>*/}
{/*                                    )*/}
{/*                                    )}*/}
{/*                                </Select>*/}
{/*                                {icon2 && (*/}
{/*                                  <FilterAltTwoToneIcon />)}*/}
{/*                              </Stack>*/}
{/*                            </FormControl> *!/*/}
{/*                          </div>*/}
{/*                        </TableCell>*/}
{/*                        */}
{/*                        <TableCell align="center" width="5%">*/}
{/*                          <div*/}
{/*                            style={{*/}
{/*                              color: "#3e8cb5",*/}
{/*                              fontSize: "14px",*/}
{/*                              fontWeight: "600",*/}
{/*                              fontFamily: "Arial",*/}
{/*                              border: "none",*/}
{/*                              background: "none",*/}
{/*                              // margin:"-5px"*/}
{/*                            }}*/}
{/*                          >*/}
{/*                            <FormControl sx={{ m: 0, width: 80, height: "0" }}>*/}
{/*                              <Stack direction="row">*/}
{/*                                <span>Grade</span>*/}
{/*                                <Select*/}
{/*                                  size="small"*/}
{/*                                  sx={{ width: "25px", fontSize: "0rem" }}*/}
{/*                                  disableUnderline*/}
{/*                                  // value={positions}*/}
{/*                                  // onChange={handleChangeposition}*/}
{/*                                  // input={<OutlinedInput label="Name" />}*/}
{/*                                  variant="standard"*/}
{/*                                  MenuProps={MenuProps}*/}
{/*                                  multiple*/}
{/*                                  value={GradeFilter}*/}
{/*                                  onChange={handleChangeSelectGrade}*/}
{/*                                  //input={<OutlinedInput label="Position" />}*/}
{/*                                  renderValue={(selected) => selected.join(', ')}*/}
{/*                                >*/}
{/*                                  <MenuItem*/}
{/*                                    // style={{ fontSize: "12px" }}*/}
{/*                                    key={0}*/}
{/*                                    value="None"*/}
{/*                                    sx={{*/}
{/*                                      padding: "0px",*/}
{/*                                      fontSize: "12px",*/}
{/*                                      paddingLeft: "38px"*/}
{/*                                    }}*/}
{/*                                  >*/}
{/*                                    /!* <Checkbox checked={positionFilter.indexOf("None") > -1} /> *!/*/}
{/*                                    <ListItemText*/}
{/*                                      primaryTypographyProps={{ fontSize: '0.9rem' }}*/}
{/*                                      primary="None" />*/}
{/*                                  </MenuItem>*/}

{/*                                  {activeTemplate*/}
{/*                                    ?.slice()*/}
{/*                                    ?.sort(function (a: any, b: any) { return a.grade.localeCompare(b.grade); })*/}
{/*                                    ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data.grade }).indexOf(item.grade) === index)*/}
{/*                                    ?.map((name: any, index: any) => (*/}
{/*                                      <MenuItem*/}
{/*                                        sx={{*/}
{/*                                          padding: "0px",*/}
{/*                                          fontSize: "12px"*/}
{/*                                        }}*/}
{/*                                        // style={{ fontSize: "12px" }}*/}
{/*                                        key={name?.grade}*/}
{/*                                        value={name?.grade}*/}
{/*                                      >*/}
{/*                                        <Checkbox */}
{/*                                        size="small"*/}
{/*                                        checked={GradeFilter.indexOf(name?.grade) > -1} />*/}
{/*                                        <ListItemText */}
{/*                                          primaryTypographyProps={{ fontSize: '0.9rem' }}*/}
{/*                                          primary={name?.grade} />*/}
{/*                                      </MenuItem>*/}
{/*                                    )*/}
{/*                                    )}*/}
{/*                                </Select>*/}
{/*                                {icon3 && (*/}
{/*                                  <FilterAltTwoToneIcon />)}*/}
{/*                              </Stack>*/}
{/*                            </FormControl>*/}
{/*                            /!* <Stack direction="row" alignItems="center" >*/}
{/*                        <div*/}
{/*                          aria-controls={openserviceGrade ? "fade-menu" : undefined}*/}
{/*                          aria-haspopup="true"*/}
{/*                          aria-expanded={openserviceGrade ? "true" : undefined}*/}
{/*                          onClick={handleClickserviceGrade}*/}
{/*                        >*/}
{/*                          <Stack direction="row" alignItems="center">*/}
{/*                           Grade*/}
{/*                            <ArrowDropDownOutlinedIcon />*/}
{/*                          </Stack>*/}
{/*                        </div>*/}
{/*                        <Menu*/}
{/*                          MenuListProps={{*/}
{/*                            "aria-labelledby": "fade-button",*/}

{/*                          }}*/}
{/*                          sx={{*/}
{/*                            height:"200px",*/}
{/*                            width:"90px"*/}
{/*                          }}*/}
{/*                          anchorEl={anchorElnewserviceGrade}*/}
{/*                          open={openserviceGrade}*/}
{/*                          onClose={handleCloseserviceGrade}*/}
{/*                          */}
{/*                        >*/}
{/*                           <MenuItem */}
{/*                          style={{*/}
{/*                            fontSize: "14px",*/}
{/*                            fontFamily: "Arial",*/}
{/*                            color: "#333333",*/}
{/*                            justifyContent:"left"*/}
{/*                            //paddingLeft: "15px",*/}
{/*                            //height:"200px"*/}
{/*                          }}*/}
{/*                          key="None"*/}
{/*                          value="None"*/}
{/*                           onClick={handleTargetserviceGrade}*/}
{/*                           >None*/}
{/*                           </MenuItem>*/}
{/*                         */}
{/*                           {activeTemplate*/}
{/*                               ?.slice()?.sort(function (a:any, b:any) {   */}
{/*                                return a.grade - b.grade;   */}
{/*                              })?.filter((item:any,index:any,array:any) => array?.map((data:any)=>{return data.grade}).indexOf(item.grade) === index)                                  */}
{/*                                 ?.map((j: any) => (*/}
{/*                                      <MenuItem*/}
{/*                                      style={{*/}
{/*                                        fontSize: "14px",*/}
{/*                                        fontFamily: "Arial",*/}
{/*                                        color: "#333333",*/}
{/*                                        justifyContent:"left",*/}
{/*                                        width:"90px",*/}
{/*                                        paddingLeft: "5px",*/}
{/*                                        //height:"200px"*/}
{/*                                      }}*/}
{/*                                        key={j?.grade}*/}
{/*                                        value={j?.grade}*/}
{/*                                        onClick={handleTargetserviceGrade}*/}

{/*                                      >*/}
{/*                                        {j?.grade}*/}
{/*                                      </MenuItem>*/}
{/*                                    )*/}
{/*                                    )}*/}
{/*                        </Menu>*/}
{/*                        {icon3 && <FilterAltTwoToneIcon />}*/}
{/*                        </Stack> *!/*/}
{/*                            /!* <FormControl sx={{ m: 0, width: 80, height: "0" }}>*/}
{/*                              <Stack direction="row">*/}
{/*                                <span> Grade</span>*/}
{/*                                <Select*/}
{/*                                  size="small"*/}
{/*                                  sx={{ width: "25px", fontSize: "0rem" }}*/}
{/*                                  disableUnderline*/}
{/*                                  value={empgrades}*/}
{/*                                  // value={personName}*/}
{/*                                  // onChange={handleChanges}*/}
{/*                                  onChange={handleChangegrades}*/}
{/*                                  // input={<OutlinedInput label="Name" />}*/}
{/*                                  variant="standard"*/}
{/*                                  MenuProps={MenuProps}*/}
{/*                                >*/}
{/*                                  <MenuItem*/}
{/*                                    style={{ fontSize: "12px" }}*/}
{/*                                    key="None"*/}
{/*                                    value="None"*/}
{/*                                  >*/}
{/*                                    None*/}
{/*                                  </MenuItem>*/}

{/*                                  {activeTemplate*/}
{/*                               ?.slice()?.sort(function (a:any, b:any) {   */}
{/*                                return a.grade - b.grade;   */}
{/*                              })?.filter((item:any,index:any,array:any) => array?.map((data:any)=>{return data.grade}).indexOf(item.grade) === index)                                  */}
{/*                                 ?.map((j: any) => (*/}
{/*                                      <MenuItem*/}
{/*                                        style={{ fontSize: "12px" }}*/}
{/*                                        key={j?.grade}*/}
{/*                                        value={j?.grade}*/}
{/*                                      >*/}
{/*                                        {j?.grade}*/}
{/*                                      </MenuItem>*/}
{/*                                    )*/}
{/*                                    )}*/}
{/*                                </Select>*/}
{/*                                {icon3 && (*/}
{/*                                  <FilterAltTwoToneIcon />)}*/}
{/*                              </Stack>*/}
{/*                            </FormControl> *!/*/}
{/*                          </div>*/}
{/*                        </TableCell>*/}
{/*                        <TableCell align="center" width="15%">*/}
{/*                          <div*/}
{/*                            style={{*/}
{/*                              color: "#3e8cb5",*/}
{/*                              fontSize: "14px",*/}
{/*                              fontWeight: "600",*/}
{/*                              fontFamily: "Arial",*/}
{/*                              border: "none",*/}
{/*                              background: "none",*/}
{/*                              // margin:"-5px"*/}
{/*                            }}*/}
{/*                          >*/}
{/*                            Pending Action*/}
{/*                          </div>*/}
{/*                        </TableCell>*/}
{/*                        <TableCell*/}
{/*                          align="center"*/}
{/*                          width="7%"*/}
{/*                          text-align="-webkit-center"*/}
{/*                        >*/}
{/*                          <div*/}
{/*                            style={{*/}
{/*                              color: "#3e8cb5",*/}
{/*                              fontSize: "14px",*/}
{/*                              fontWeight: "600",*/}
{/*                              fontFamily: "Arial",*/}
{/*                              border: "none",*/}
{/*                              background: "none",*/}
{/*                              // maxWidth: "100px",*/}
{/*                              wordWrap: "break-word",*/}
{/*                              // margin:"-5px"*/}
{/*                              // whiteSpace: "pre-line",*/}
{/*                            }}*/}
{/*                          >*/}
{/*                            Appraiser <br></br> Rating*/}
{/*                          </div>*/}
{/*                        </TableCell>*/}
{/*                        <TableCell*/}
{/*                          align="center"*/}
{/*                          width="7%"*/}
{/*                          text-align="-webkit-center"*/}
{/*                        >*/}
{/*                          <div*/}
{/*                            style={{*/}
{/*                              color: "#3e8cb5",*/}
{/*                              fontSize: "14px",*/}
{/*                              fontWeight: "600",*/}
{/*                              fontFamily: "Arial",*/}
{/*                              border: "none",*/}
{/*                              background: "none",*/}
{/*                              // maxWidth: "100px",*/}
{/*                              wordWrap: "break-word",*/}
{/*                              // margin:"-5px"*/}
{/*                              // whiteSpace: "pre-line",*/}
{/*                            }}*/}
{/*                          >*/}
{/*                            Reviewer <br></br> Rating*/}
{/*                          </div>*/}
{/*                        </TableCell>*/}
{/*                        <TableCell*/}
{/*                          align="center"*/}
{/*                          width="7%"*/}
{/*                          text-align="-webkit-center"*/}
{/*                        >*/}
{/*                          <div*/}
{/*                            style={{*/}
{/*                              color: "#3e8cb5",*/}
{/*                              fontSize: "14px",*/}
{/*                              fontWeight: "600",*/}
{/*                              fontFamily: "Arial",*/}
{/*                              border: "none",*/}
{/*                              background: "none",*/}
{/*                              // maxWidth: "100px",*/}
{/*                              wordWrap: "break-word",*/}
{/*                              // margin:"-5px"*/}
{/*                              // whiteSpace: "pre-line",*/}
{/*                            }}*/}
{/*                          >*/}
{/*                            Normalizer<br></br> Rating*/}
{/*                          </div>*/}
{/*                        </TableCell>*/}
{/*                        <TableCell align="center" width="6%">*/}
{/*                          <div*/}
{/*                            style={{*/}
{/*                              color: "#3e8cb5",*/}
{/*                              fontSize: "14px",*/}
{/*                              fontWeight: "600",*/}
{/*                              fontFamily: "Arial",*/}
{/*                              border: "none",*/}
{/*                              background: "none",*/}
{/*                              // margin:"-5px"*/}
{/*                            }}*/}
{/*                          >*/}
{/*                            Status*/}
{/*                          </div>*/}
{/*                        </TableCell>*/}
{/*                        /!*<TableCell align="left" width="5%">*!/*/}
{/*                        /!*    Action*!/*/}
{/*                        /!*</TableCell>*!/*/}
{/*                        <TableCell*/}
{/*                          width="6%"*/}
{/*                          style={{*/}
{/*                            color: "#3e8cb5",*/}
{/*                            fontSize: "14px",*/}
{/*                            fontWeight: "600",*/}
{/*                            fontFamily: "Arial",*/}
{/*                            textAlign: "center",*/}
{/*                            //maxWidth:"100px"*/}
{/*                          }}*/}
{/*                        // align="left"*/}
{/*                        // width="6%"*/}
{/*                        >*/}
{/*                          View PA*/}
{/*                        </TableCell>*/}
{/*                      </TableRow>*/}
{/*                    </TableHead>*/}


{/*                    <TableBody*/}
{/*                      ref={listInnerRef}*/}
{/*                      onScroll={onScroll}*/}
{/*                    >*/}
{/*                      {activeTemplate*/}
{/*                        ?.filter((j: any) => {*/}
{/*                          if (tabValue === 0) {*/}
{/*                            return j;*/}
{/*                          } else if (tabValue === 1) {*/}
{/*                            return getPAStatus(j)?.includes("Appraiser");*/}
{/*                          } else if (tabValue === 2) {*/}
{/*                            return j?.appraisal?.status*/}
{/*                              ?.toLocaleLowerCase()*/}
{/*                              ?.includes("not-started"?.toLocaleLowerCase());*/}
{/*                          } else if (tabValue === 3) {*/}

{/*                            return j?.appraisal?.status?.toLocaleLowerCase()?.includes("in-progress".toLocaleLowerCase()) ||*/}
{/*                              j?.appraisal?.status?.toLocaleLowerCase()?.includes("normalized".toLocaleLowerCase())*/}

{/*                          } else if (tabValue === 4) {*/}
{/*                            return j?.appraisal?.status*/}
{/*                              ?.toLocaleLowerCase()*/}
{/*                              .includes("rejected"?.toLocaleLowerCase());*/}
{/*                          } else if (tabValue === 5) {*/}

{/*                            return j?.appraisal?.status*/}
{/*                              ?.toLocaleLowerCase()*/}
{/*                              ?.includes("completed"?.toLocaleLowerCase());*/}
{/*                          }*/}
{/*                        })*/}
{/*                        ?.filter((j: any) => {*/}
{/*                          if (empFullName === "None" || empFullName === "") {*/}
{/*                            return j;*/}
{/*                          } else {*/}
{/*                            return j?.legal_full_name*/}
{/*                              ?.toLocaleLowerCase() === empFullName?.toLocaleLowerCase();*/}
{/*                            //?.includes(empFullName?.toLocaleLowerCase());*/}
{/*                          }*/}
{/*                        })*/}
{/*                        .filter((j: any) => {*/}
{/*                          if (empEmployeeCode === "None" || empEmployeeCode === "") {*/}
{/*                            return j;*/}
{/*                          } else {*/}
{/*                            return j?.employee_code*/}
{/*                              .toLocaleLowerCase() === empEmployeeCode?.toLocaleLowerCase();*/}
{/*                            // .includes(employeeCode.toLocaleLowerCase());*/}
{/*                          }*/}
{/*                        })*/}
{/*                        ?.filter((j: any) => {*/}
{/*                          if (positions === "None" || positions === "") {*/}
{/*                            return j;*/}
{/*                          } else {*/}
{/*                            return j?.position_long_description*/}
{/*                              ?.toLocaleLowerCase()*/}
{/*                              ?.includes(positions?.toLocaleLowerCase());*/}
{/*                          }*/}
{/*                        })*/}
{/*                        .filter((item1: any) => {*/}
{/*                          if (positionFilter.includes("None") || positionFilter.length === 0) {*/}
{/*                            return item1;*/}
{/*                          } else {*/}
{/*                            return !!positionFilter?.find((item2: any) => item1?.position_long_description === item2)*/}
{/*                          }*/}
{/*                        })*/}
{/*                        .filter((item1: any) => {*/}
{/*                          if (GradeFilter.includes("None") || GradeFilter.length === 0) {*/}
{/*                            return item1;*/}
{/*                          } else {*/}
{/*                            return !!GradeFilter?.find((item2: any) => item1?.grade === item2)*/}
{/*                          }*/}
{/*                        })*/}
{/*                        .filter((j: any) => {*/}
{/*                          if (empgrades === "None" || empgrades === "") {*/}
{/*                            return j;*/}
{/*                          } else {*/}
{/*                            return j?.grade*/}
{/*                              ?.toLocaleLowerCase() === empgrades?.toLocaleLowerCase();*/}
{/*                            // ?.includes(empgrades?.toLocaleLowerCase());*/}
{/*                          }*/}
{/*                        })*/}
{/*                        .filter((j: any) => {*/}
{/*                          if (enteredName === "") {*/}
{/*                            return j;*/}
{/*                          } else if (*/}
{/*                            (j?.employee_code !== undefined &&*/}
{/*                              j?.employee_code*/}
{/*                                ?.toLocaleLowerCase()*/}
{/*                                ?.includes(*/}
{/*                                  enteredName?.toLocaleLowerCase()*/}
{/*                                )) ||*/}
{/*                            (j?.legal_full_name !== undefined &&*/}
{/*                              j?.legal_full_name*/}
{/*                                ?.toLocaleLowerCase()*/}
{/*                                ?.includes(*/}
{/*                                  enteredName?.toLocaleLowerCase()*/}
{/*                                )) ||*/}
{/*                            (j.grade !== undefined &&*/}
{/*                              j?.grade*/}
{/*                                ?.toLocaleLowerCase()*/}
{/*                                ?.includes(*/}
{/*                                  enteredName?.toLocaleLowerCase()*/}
{/*                                )) ||*/}
{/*                            (j.position_long_description !== undefined &&*/}
{/*                              j?.position_long_description*/}
{/*                                ?.toLocaleLowerCase()*/}
{/*                                ?.includes(*/}
{/*                                  enteredName?.toLocaleLowerCase()*/}
{/*                                )) ||*/}
{/*                            (j?.appraisal?.status !== undefined &&*/}
{/*                              j?.appraisal?.status*/}
{/*                                ?.toLocaleLowerCase()*/}
{/*                                ?.includes(*/}
{/*                                  enteredName?.toLocaleLowerCase()*/}
{/*                                )) ||*/}
{/*                            (getPAStatus(j) !== undefined &&*/}
{/*                              getPAStatus(j)*/}
{/*                                ?.toLocaleLowerCase()*/}
{/*                                ?.includes(enteredName?.toLocaleLowerCase()))*/}
{/*                          ) {*/}
{/*                            return j;*/}
{/*                          }*/}
{/*                        })*/}
{/*                        ?.slice(*/}
{/*                          page * rowsPerPage,*/}
{/*                          page * rowsPerPage + rowsPerPage*/}
{/*                        )*/}
{/*                        // .filter((j:any) => {*/}
{/*                        //     if (statusSort === '') {*/}
{/*                        //         return j;*/}
{/*                        //     } else if (statusSort === "completed") {*/}
{/*                        //         return j?.appraisal?.status*/}
{/*                        //             .toLocaleLowerCase()*/}
{/*                        //             .includes("completed".toLocaleLowerCase());*/}
{/*                        //     } else if (statusSort === "In Progress") {*/}
{/*                        //         return j?.appraisal?.status*/}
{/*                        //             .toLocaleLowerCase()*/}
{/*                        //             .includes("in-progress".toLocaleLowerCase());*/}
{/*                        //     } else if (statusSort === "Not Started") {*/}
{/*                        //         return j?.appraisal?.status*/}
{/*                        //             .toLocaleLowerCase()*/}
{/*                        //             .includes("Not Started".toLocaleLowerCase());*/}
{/*                        //     }*/}
{/*                        // })*/}
{/*                        ?.map((j: any) => {*/}

{/*                          // if ( tabValue === 1){*/}
{/*                          //      return j*/}
{/*                          // }*/}
{/*                          return (*/}
{/*                            // <ExpandableTableRow*/}
{/*                            //     key={j.name}*/}
{/*                            //     expandComponent={<TableCell colSpan={5}>*/}

{/*                            //         <TableBody>*/}
{/*                            //             {users &&*/}
{/*                            //                 users*/}
{/*                            //                     .map((j: any) => {*/}
{/*                            //                         console.log(j?.appraisal?.status, "index");*/}

{/*                            //                         return (*/}

{/*                            //                             <TableRow key={j.name}*/}
{/*                            //                                 sx={{ border: 0 }}>*/}
{/*                            //                                 /!* <Link to={`${CREATE_APPRAISAL}/employee/${j._id}`}>*/}
{/*                            //                                 <TableCell component="th" scope="row">{j.name}</TableCell>*/}
{/*                            //                                              </Link> *!/*/}
{/*                            //                                 <TableCell*/}
{/*                            //                                     padding="checkbox">*/}
{/*                            //                                     /!* <Checkbox*/}
{/*                            //                                          color="default"*/}
{/*                            //                                           // checked={isItemSelected}*/}
{/*                            //                                          // inputProps={{*/}
{/*                            //                                          //   'aria-labelledby': labelId,*/}
{/*                            //                                          // }}*/}
{/*                            //                                          /> *!/*/}

{/*                            //                                     <input*/}
{/*                            //                                         // onChange={checkboxHandler}*/}
{/*                            //                                         name={j._id}*/}
{/*                            //                                         //checked={j?.isChecked || false}*/}
{/*                            //                                         //checked={j.reviewerIsChecked === true ? true: false}*/}
{/*                            //                                         checked={j.reviewerIsChecked}*/}
{/*                            //                                         onChange={handleOnCheck}*/}
{/*                            //                                         type="checkbox"*/}
{/*                            //                                         style={{*/}
{/*                            //                                             height: "18px",*/}
{/*                            //                                             width: "18px",*/}
{/*                            //                                             borderColor: "#D5D5D5",*/}
{/*                            //                                         }}*/}
{/*                            //                                     // value={[j._id, j.name]}*/}
{/*                            //                                     />*/}
{/*                            //                                 </TableCell>*/}
{/*                            //                                 <TableCell component="th" scope="row" sx={{ width: '340px' }}>*/}
{/*                            //                                     <Link*/}
{/*                            //                                         to={`${CREATE_APPRAISAL}/employee/${j._id}`}*/}
{/*                            //                                     // onClick={() => startAppraisal(j._id)}*/}
{/*                            //                                     >*/}
{/*                            //                                         <Stack direction="row">*/}
{/*                            //                                             <Avatar>H</Avatar>*/}
{/*                            //                                             <Names> {j.name}</Names>*/}
{/*                            //                                         </Stack>*/}
{/*                            //                                     </Link>*/}
{/*                            //                                 </TableCell>*/}
{/*                            //                                 <TableCell sx={{ width: '432px' }} align="left">{j.position}</TableCell>*/}
{/*                            //                                 <TableCell sx={{ width: '150px' }} align="left">{j.grade}</TableCell>*/}
{/*                            //                                 <TableCell sx={{ width: '150px' }} align="left">*/}
{/*                            //                                     {j?.appraisal?.status ? (*/}
{/*                            //                                         <p>{j?.appraisal?.status}</p>*/}
{/*                            //                                     ) : (*/}
{/*                            //                                         <p>Not Started </p>*/}
{/*                            //                                     )}*/}
{/*                            //                                 </TableCell>*/}
{/*                            //                                 <TableCell sx={{ width: '82px' }} align="center">*/}
{/*                            //                                     <img src={Eye} alt="icon" />*/}
{/*                            //                                 </TableCell>*/}

{/*                            //                             </TableRow>*/}
{/*                            //                         );*/}
{/*                            //                     })}*/}
{/*                            //         </TableBody>*/}

{/*                            //     </TableCell>}*/}
{/*                            // >*/}

{/*                            <TableRow>*/}
{/*                              <TableCell*/}
{/*                                style={{*/}
{/*                                  fontSize: "14px",*/}
{/*                                  fontFamily: "Arial",*/}
{/*                                  color: "333333",*/}
{/*                                  // paddingRight: "45px"*/}
{/*                                }}*/}
{/*                                align="center"*/}
{/*                              >*/}
{/*                                {j.employee_code}*/}
{/*                              </TableCell>*/}

{/*                              <TableCell*/}
{/*                                align="left"*/}
{/*                                style={{*/}
{/*                                  fontSize: "14px",*/}
{/*                                  fontFamily: "Arial",*/}
{/*                                  color: "333333",*/}
{/*                                }}*/}
{/*                                component="th"*/}
{/*                                scope="row"*/}
{/*                              >*/}
{/*                                <p*/}
{/*                                  // to={`${CREATE_APPRAISAL}/employee/${j._id}`}*/}
{/*                                  onClick={() => empNameClickHandler(j)}*/}
{/*                                // onClick={() => (j.appraisal.appraiser_status == "draft" || j.appraisal.appraiser_status == 'pending') && navigate(`${CREATE_APPRAISAL}/employee/${j._id}`)}*/}
{/*                                >*/}
{/*                                  <Stack*/}
{/*                                    direction="row"*/}
{/*                                    alignItems="center"*/}
{/*                                    spacing={1.5}*/}
{/*                                  >*/}
{/*                                    /!* <Avatar>{j.legal_full_name[0]}</Avatar> *!/*/}

{/*                                    <Names*/}
{/*                                      sx={{*/}
{/*                                        color:*/}
{/*                                          (!getPAStatus(j)?.includes("PA Not Started")) && (*/}
{/*                                            j.appraisal.appraiser_status ==*/}
{/*                                            "draft" ||*/}
{/*                                            j.appraisal.appraiser_status ==*/}
{/*                                            "pending")*/}
{/*                                            ? "#52C8F8"*/}
{/*                                            : getPAStatus(j)?.includes(*/}
{/*                                              "Pending with Appraiser"*/}
{/*                                            ) &&*/}
{/*                                              (j?.appraisal?.status ==*/}
{/*                                                "in-progress" ||*/}
{/*                                                j.appraisal.appraiser_status ==*/}
{/*                                                "employee-rejected")*/}
{/*                                              ? "#52C8F8"*/}
{/*                                              : "#333333",*/}
{/*                                        cursor:*/}
{/*                                          (!getPAStatus(j)?.includes("PA Not Started")) && (*/}
{/*                                            j.appraisal.appraiser_status ==*/}
{/*                                            "draft" ||*/}
{/*                                            j.appraisal.appraiser_status ==*/}
{/*                                            "pending")*/}
{/*                                            ? "pointer" : getPAStatus(j)?.includes(*/}
{/*                                              "Pending with Appraiser"*/}
{/*                                            ) &&*/}
{/*                                              j?.appraisal?.status != "not-started"*/}
{/*                                              ? "pointer"*/}
{/*                                              : "default",*/}
{/*                                      }}*/}
{/*                                      style={{ cursor: "pointer" }}*/}
{/*                                    >*/}
{/*                                      {j.legal_full_name}*/}
{/*                                    </Names>*/}
{/*                                  </Stack>*/}
{/*                                </p>*/}
{/*                              </TableCell>*/}

{/*                              <TableCell align="left">*/}
{/*                                {j.position_long_description}*/}
{/*                              </TableCell>*/}
{/*                              */}
{/*                              <TableCell style={{ textAlign: "center", paddingRight: "30px" }} >{j.grade}</TableCell>*/}
{/*                              <TableCell align="left">*/}
{/*                                {getPAStatus(j)}*/}
{/*                                /!* {getPAStatus(j)} *!/*/}
{/*                              </TableCell>*/}
{/*                              <TableCell*/}
{/*                                align="center"*/}
{/*                                sx={{*/}
{/*                                  color:*/}
{/*                                    j.appraisal.appraiser_status ===*/}
{/*                                      "appraiser-rejected" || j.appraisal.appraiser_status === "appraiser-rejected-employee"*/}
{/*                                      ? "red"*/}
{/*                                      : "#333333",*/}
{/*                                }}*/}
{/*                              >*/}
{/*                                /!* {console.log(j.appraisal.appraiser_status,"appraiserstatus")} *!/*/}
{/*                                {j.appraisal?.appraiser_rating == 0 ? (*/}
{/*                                  <span> - </span>*/}
{/*                                ) : (*/}
{/*                                  j.appraisal?.appraiser_rating*/}
{/*                                )}*/}
{/*                              </TableCell>*/}
{/*                              <TableCell*/}
{/*                                align="center"*/}
{/*                                sx={{*/}
{/*                                  color:*/}
{/*                                    j.reviewer.reviewer_status ===*/}
{/*                                      "rejected"*/}
{/*                                      ? "red"*/}
{/*                                      : "#333333",*/}
{/*                                }}*/}
{/*                              >*/}
{/*                                {*/}
{/*                                  // j.reviewerIsDisabled &&*/}
{/*                                  (j.reviewer.reviewer_rating == 0 || j.reviewer.reviewer_status == "draft") ? (*/}
{/*                                    <span> - </span>*/}
{/*                                  ) : (*/}
{/*                                    j.reviewer.reviewer_rating*/}
{/*                                  )}*/}
{/*                              </TableCell>*/}
{/*                              <TableCell*/}
{/*                                align="center"*/}
{/*                                sx={{*/}
{/*                                  color:*/}
{/*                                    j.normalizer.normalizer_status ===*/}
{/*                                      "rejected"*/}
{/*                                      ? "red"*/}
{/*                                      : "#333333",*/}
{/*                                }}*/}
{/*                              >*/}
{/*                                {(*/}
{/*                                  j?.normalizer?.normalizer_rating == 0 || j.normalizer.normalizer_status == "draft") ? (*/}
{/*                                    <span> - </span>*/}
{/*                                ) : (*/}
{/*                                  j?.normalizer?.normalizer_rating*/}
{/*                                )}*/}
{/*                              </TableCell>*/}
{/*                              <TableCell align="center">*/}
{/*                                {getStatus(j?.appraisal?.status)}*/}
{/*                              </TableCell>*/}
{/*                              /!*<TableCell>*!/*/}
{/*                              /!*    <button onClick={approvePA.bind(this, j)}>*!/*/}
{/*                              /!*        Approve*!/*/}
{/*                              /!*    </button>*!/*/}
{/*                              /!*    <button onClick={rejectPA.bind(this, j)}>*!/*/}
{/*                              /!*        Reject*!/*/}
{/*                              /!*    </button>*!/*/}
{/*                              /!*</TableCell>*!/*/}
{/*                              <TableCell style={{ textAlign: "center" }}>*/}
{/*                                <IconButton*/}
{/*                                  onClick={() => viewPAClickHandler(j)}*/}
{/*                                >*/}

{/*                                  <img src={Eye} alt="icon" />*/}
{/*                                </IconButton>*/}
{/*                              </TableCell>*/}
{/*                            </TableRow>*/}
{/*                            // </ExpandableTableRow>*/}
{/*                          );*/}
{/*                        })}*/}
{/*                    </TableBody>*/}


{/*                  </Table>*/}
                </TableContainer>
                <table {...getTableProps()}>
                  <thead>
                  {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                              {column.render('Header')}
                            </th>
                        ))}
                      </tr>
                  ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => {
                            return (
                                <td {...cell.getCellProps()}>
                                  {cell.render('Cell')}
                                </td>
                            );
                          })}
                        </tr>
                    );
                  })}
                  </tbody>
                </table>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 20, 50]}
                  component="div"
                  // count={users.length}
                  count={tablecount}
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
};
export default MyTeam;